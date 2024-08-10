const mongoose = require('mongoose');
const productSchema = mongoose.Schema({

 name :{
    type: 'string',
    require:[true , "product name required"]
 },
 price:{
    type: 'number',
    require: [true , "product price required"]
 },
 brand :{
    type: 'string',
    require: [true , "product brand required"]
 },
 description :{
    type: 'string',
      default: ''
 },
  category: {
    type: String,
    require: [true , "product category required"]
 }
},
{
   timestamps: true,
 });

 module.exports = mongoose.model("Product" , productSchema)