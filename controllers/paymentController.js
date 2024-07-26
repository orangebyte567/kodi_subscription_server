const paypal = require('../config/paypal');
const Subscription = require('../models/Subscription');

exports.createPayment = async (req, res) => {
    const { plan } = req.body;

    const create_payment_json = {
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": "http://localhost:3000/execute-payment",
            "cancel_url": "http://localhost:3000/cancel-payment"
        },
        "transactions": [{
            "item_list": {
                "items": [{
                    "name": "Subscription Plan",
                    "sku": "001",
                    "price": plan.price,
                    "currency": "USD",
                    "quantity": 1
                }]
            },
            "amount": {
                "currency": "USD",
                "total": plan.price
            },
            "description": `Subscription plan: ${plan.name}`
        }]
    };

    paypal.payment.create(create_payment_json, function (error, payment) {
        if (error) {
            res.status(500).json({ error });
        } else {
            res.json(payment);
        }
    });
};

exports.executePayment = async (req, res) => {
    const { paymentId, payerId } = req.body;

    const execute_payment_json = {
        "payer_id": payerId,
        "transactions": [{
            "amount": {
                "currency": "USD",
                "total": "25.00"
            }
        }]
    };

    paypal.payment.execute(paymentId, execute_payment_json, async function (error, payment) {
        if (error) {
            res.status(500).json({ error });
        } else {
            const subscription = new Subscription({
                user: req.user._id,
                type: "Premium",
                startDate: new Date(),
                endDate: new Date(Date.now() + 30*24*60*60*1000), // 30 days from now
                status: "active"
            });

            await subscription.save();

            res.json(payment);
        }
    });
};

exports.cancelPayment = async (req, res) => {
    res.send('Payment cancelled');
};
