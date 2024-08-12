const express = require('express');
const app=express();
const rateLimit = require('express-rate-limit')
app.use(express.json())
const logger = require('morgan');
app.use(logger('dev'))
const helmet = require('helmet');
app.use(helmet());
const dotenv = require('dotenv').config();
const db_connection = require('./config/db_coniction')
const swaggerSetup = require('./swaggerUi ');
swaggerSetup(app);
db_connection()

const limiter = rateLimit({
    windowMs :15*60*1000,
    max : 100,
    message :'Too many requests from this IP , please try again after 15 minutes'
})
app.use(limiter);


app.use("/api/users", require('./routs/userRouts')); 
app.use("/api/products", require('./routs/productRouts'));
app.use("/api/cards", require('./routs/cardRouts')); 
app.use('/api/orders', require('./routs/orderRouts'));


port = process.env.PORT  || 3000 ;
app.listen(port , (err, res) => {
    console.log(`listen on port ${port} `)
})