const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

const updateUserStatus = asyncHandler(async (req, res) => {
    const { userId, isActive } = req.body;
    const user = await User.findById(userId);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    user.isActive = isActive;
    await user.save();
    res.status(200).json({ message: `User status updated to ${isActive ? 'active' : 'inactive'}` });
});

module.exports =  updateUserStatus ;
