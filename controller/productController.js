const asyncHandler =require('express-async-handler')
const Product = require('../moduels/product_module');;


const getProductByCategory = asyncHandler(async(req , res)=>{
    try {
        const {category} = req.query;

        if (!category) {
            return res.status(400).json({ message: 'Category query parameter is required' });
        }
        const products = await Product.find({ category });
        if (products.length === 0) {
            return res.status(404).json({ message: 'No products found in this category' });
        }
        res.status(200).json(products);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
})
const searchProducts = asyncHandler(async(req , res) => {
    try {
        const { minPrice, maxPrice, brand } = req.query;
        let query = {};
        if (minPrice && maxPrice) {
            query.price = { $gte: minPrice, $lte: maxPrice };
        } else if (minPrice) {
            query.price = { $gte: minPrice };
        } else if (maxPrice) {
            query.price = { $lte: maxPrice };
        }
        if (brand) {
            query.brand = brand;
        }
        const products = await Product.find(query);
        res.status(200).json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
})

const get_all_products = asyncHandler(async(req , res)=>{
    try
    {
      const all_products = await Product.find()
      res.status(400).json({all_products });
    }
    catch(err)
    {
      throw new Error(err);
    }  
});

const get_product = asyncHandler(async(req , res)=>{
    try{
         let productId = req.params.id;
         let product = await Product.findById({_id: productId});
         if(!product)return res.status(404).json({message: 'Product not found'});
             res.status(200).json({product});
         }catch(err){
             throw new Error(err)
         } 
});

const create_product = asyncHandler(async(req , res)=>{
    try
    {
       const {name ,price , brand , description ,category} = req.body;
       if(!name || !price || !brand || !category){
            return res.status(400).json({ message: " name and price and brand and category are require" });
        }
       const proudct = await Product.create({
          name,
          price,
          brand,
          description,
          category,
       })
        res.status(400).json({ message: "created successfully" , proudct});
    }
    catch(err)
    {
        throw new Error(err);
    }
});

const update_product = asyncHandler(async(req , res)=>{
    try{
         const {name, price ,brand ,description} = req.body;
         if(!name || !price || !brand || !description){
            return res.status(400).json({message: 'invalid data'})
         } 
         const product_id = req.params.id;0
         const product = await Product.findById({_id:product_id})
         if(!product) return res.status(404).json({message: 'Product not found'});
         const updateFields={};
          if (name) updateFields.name = name;
          if (price) updateFields.price = price;
          if (brand) updateFields.brand = brand;
          if (description) updateFields.description = description;
        const update = await Product.updateOne(
            { _id: req.params.id }, 
            { $set: updateFields }
        );
         res.status(400).json({ message:"data updated ", updateFields});
    }catch(e){
        throw new Error(e);
    };   
});

const delete_product = asyncHandler(async(req , res)=>{
    try
    {
       const product_id = req.params.id ;
       await Product.findByIdAndDelete({ _id :product_id})
       res.status(400).json({ message: "product has been deleted" });
    }
    catch (err)
    {
        throw new Error(err);
    }
});



module.exports ={
    get_all_products,
    get_product,
    create_product,
    update_product,
    getProductByCategory,
    searchProducts,
    delete_product,
    
   
};