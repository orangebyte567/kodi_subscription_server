const Subscription = require('../models/Subscription');

exports.createSubscription = async (req, res) => {
    const { type, endDate } = req.body;

    const subscription = await Subscription.create({
        user: req.user._id,
        type,
        endDate
    });

    if (subscription) {
        res.status(201).json(subscription);
    } else {
        res.status(400).json({ message: 'Invalid subscription data' });
    }
};

exports.getSubscription = async (req, res) => {
    // const subscription = await Subscription.findById(req.params.id).populate('user');
    const subscription = await Subscription.findOne({ user: req.user._id, status: 'active' }).populate('user');

    if (subscription) {
        res.json(subscription);
    } else {
        // res.status(404).json({ message: 'Subscription not found' });
        res.json(null);
    }
};

exports.cancelSubscription = async (req, res) => {
    const subscription = await Subscription.findOne({ user: req.user._id, status: 'active' });

    if (subscription) {
        subscription.status = 'cancelled';
        await subscription.save();
        res.json({ message: 'Subscription cancelled' });
    } else {
        res.status(404).json({ message: 'Active subscription not found' });
    }
};
