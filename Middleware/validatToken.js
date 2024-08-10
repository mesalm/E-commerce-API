const asyncHandler = require("express-async-handler");
const jwt = require('jsonwebtoken');

const validToken = asyncHandler(async (req, res, next) => {
    let token;
    let authHeader = req.headers.authorization || req.headers.Authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
        token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decode) => {
            if (err) {
                res.status(401);
                throw new Error('User not authenticated');
            }
            req.user = decode.user;
            if (!req.user.isActive) {
                return res.status(403).json({ message: 'Account is inactive' });
            }
            next();
        });
    } else {
        res.status(401).json({mes: "User not authenticated"});
        
    }
});

module.exports = validToken;
