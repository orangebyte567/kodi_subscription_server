const User = require('../models/User');
const Subscription = require('../models/Subscription');

exports.getAllUsers = async (req, res) => {
    const users = await User.find().populate('subscription');
    const nonAdminUsers = users.filter(user => !user.isAdmin);
    res.json(nonAdminUsers);
};

exports.getUserDetails = async (req, res) => {
    const user = await User.findById(req.params.id).populate('subscription');
    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
};

exports.getReports = async (req, res) => {
    const subscriptions = await Subscription.find();
    const activeSubscriptions = subscriptions.filter(sub => sub.status === 'active').length;
    const cancelledSubscriptions = subscriptions.filter(sub => sub.status === 'cancelled').length;
    const expiredSubscriptions = subscriptions.filter(sub => sub.status === 'expired').length;

    res.json({
        activeSubscriptions,
        cancelledSubscriptions,
        expiredSubscriptions
    });
};
