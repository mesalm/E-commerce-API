
const User = require('../moduels/user_moduel')
const asyncHandler =require('express-async-handler')
const  bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const env =require('dotenv').config()
const nodemailer = require('nodemailer');
const crypto = require('crypto');

const Register_user = async (req, res) => {
    try {
        const { username, email, password, phoneNumber } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({ message: 'All user data is required: username, email, and password' });
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already registered' });
        }
        const new_user = await User.create({
            username,
            email,
            password, 
            phoneNumber
        });
        res.status(201).json(new_user);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Error registering user' });
    }
};


const login_user = asyncHandler(async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'Please enter email and password' });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        console.log(isMatch)
        if (!isMatch) {
            return res.status(401).json({ message: 'password is not correct' });
        }
        const accessToken = jwt.sign(
            {
                user: {
                    username: user.username,
                    email: user.email,
                    id: user._id
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '15m' }
        );
        res.status(200).json({ accessToken });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


const update_userData = async (req, res) => {
    try {
        const { username, email } = req.body;
        if (!email && !username) {
            return res.status(400).json({ message: "Please provide data to update" });
        }
        const updateFields = {};
        if (username) updateFields.username = username;
        if (email) updateFields.email = email;
        const update = await User.updateOne(
            { _id: req.params.id }, 
            { $set: updateFields }
        );
        if (update.nModified === 0) {
            return res.status(404).json({ message: "User not found or no changes made" });
        }
        res.status(200).json({ message: "User updated successfully" });
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}

 const forget_password =   async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'No user found with that email' });
        }
        const token = crypto.randomBytes(20).toString('hex');
        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000; 
        await user.save();
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASSWORD,
            },
        });
        const mailOptions = {
            to: user.email,
            from: 'mahamdabomesalm987@gmail.com',
            subject: 'Password Reset',
            text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n` +
                `Please click on the following link, or paste this into your browser to complete the process:\n\n` +
                `http://${req.headers.host}/reset-password/${token}\n\n` +
                `If you did not request this, please ignore this email and your password will remain unchanged.\n`,
        };

        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'An email has been sent to your email address with further instructions.' });
    } catch (error) {
        res.status(500).json({ message: 'Error in sending email', error: error.message });
    }
}

const reset_password = async (req, res) => {
    try {
        const { token } = req.params;
        const { password } = req.body;

        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() },
        });

        if (!user) {
            return res.status(400).json({ message: 'Password reset token is invalid or has expired.' });
        }
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();
        res.status(200).json({ message: 'Password has been reset successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'Error in resetting password', error: error.message });
    }
}

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


module.exports ={
    Register_user,
    login_user,
   update_userData,
   forget_password,
   reset_password,
   updateUserStatus
};


