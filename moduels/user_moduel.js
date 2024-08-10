const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, 'please enter a username']
    },
    email: {
        type: String,
        required: [true, 'please enter an email'],
        unique: [true, 'email is already in use'],
        validate: [validator.isEmail, 'Invalid email']
    },
    password: {
        type: String,
        required: [true, 'please enter a password']
    },
    phoneNumber: {
        type: String,
        validate: {
            validator: function(v) {
                return validator.isMobilePhone(v, 'any', { strictMode: true });
            },
            message: props => `${props.value} is not a valid phone number!`
        }
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
         default: 'user'
    },
    active:{
        type: Boolean,
        default: true,
    },
    cart: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        },
        quantity: {
            type: Number,
            default: 1
        }
    }],
    wishlist: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        }
    }],
    resetPasswordToken: String,
    resetPasswordExpires: Date,
}, {
    timestamps: true,
});

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (err) {
        next(err);
    }
});


module.exports = mongoose.model("User", userSchema);
