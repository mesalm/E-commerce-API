const asyncHandler = require('express-async-handler');
const User = require('../moduels/user_moduel');
const Product = require('../moduels/product_module');



const viewCard =asyncHandler(async(req , res)=>{
    try{
        const userId = req.user.id;
        const user = await User.findById(userId);
        if (!user || !user.cart) { 
            return res.status(404).json({ message: 'User or cart not found' });
       }
        const cart = user.cart
        res.status(200).json({cart});
    }catch(err)
    {
        throw new Error(err)
    }
})
const updateCart = asyncHandler(async (req, res) => {
    try {
        const userId = req.user.id;
        const { productId, quantity } = req.body;
        if (!quantity || !productId) {
            return res.status(400).json({ message: "Product ID and quantity are required" });
        }
        const user = await User.findOne({ _id: userId });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const productIndex = user.cart.findIndex(item => item.productId.toString() === productId);
        if (productIndex === -1) {
            return res.status(404).json({ message: "Product not found in cart" });
        }
        user.cart[productIndex].quantity = quantity;
        await user.save();
        res.status(200).json({ message: "Cart updated successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
});

const addToCart = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const { productId, quantity } = req.body;
    const user = await User.findById(userId);
    const product = await Product.findById(productId);
    if (!user || !product) {
        return res.status(404).json({ message: 'User or Product not found' });
    }
    const cartItem = user.cart.find(item => item.productId.toString() === productId);
    if (cartItem) {
        cartItem.quantity += quantity;
    } else {
        user.cart.push({ productId, quantity });
    }
    await user.save();
    res.status(200).json({ message: 'Product added to cart', cart: user.cart });
});

const removeFromCart = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const { productId } = req.body;
    const user = await User.findById(userId);
    user.cart = user.cart.filter(item => item.productId.toString() !== productId);
    await user.save();
    res.status(200).json({ message: 'Product removed from cart', cart: user.cart });
});

const addToWishlist = asyncHandler(async (req, res) => {
    const userId = req.user.id; 
    const { productId } = req.body;
    const user = await User.findById(userId);
    const product = await Product.findById(productId);
    if (!user || !product) {
        return res.status(404).json({ message: 'User or Product not found' });
    }
    if (!user.wishlist.some(item => item.productId.toString() === productId)) {
        user.wishlist.push({ productId });
    }
    await user.save();
    res.status(200).json({ message: 'Product added to wishlist', wishlist: user.wishlist });
});

const removeFromWishlist = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const { productId } = req.body;
    const user = await User.findById(userId);
    user.wishlist = user.wishlist.filter(item => item.productId.toString() !== productId);
    await user.save();
    res.status(200).json({ message: 'Product removed from wishlist', wishlist: user.wishlist });
});

module.exports = {
    addToCart,
    removeFromCart,
    addToWishlist,
    removeFromWishlist,
    viewCard,
    updateCart
};
