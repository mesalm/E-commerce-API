const express = require('express');
const app=express();
app.use(express.json())
const logger = require('morgan');
app.use(logger('dev'))
const dotenv = require('dotenv').config();
const db_connection = require('./config/db_coniction')
const swaggerSetup = require('./swaggerUi ');
swaggerSetup(app);
db_connection()


app.use("/api/users", require('./routs/userRouts')); 
app.use("/api/products", require('./routs/productRouts'));
app.use("/api/cards", require('./routs/cardRouts')); 
app.use('/api/orders', require('./routs/orderRouts'));


port = process.env.PORT  || 3000 ;
app.listen(port , (err, res) => {
    console.log(`listen on port ${port} `)
})