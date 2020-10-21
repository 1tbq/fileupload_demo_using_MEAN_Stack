const express = require('express');
const Product = require('./product');
const productRouter = express.Router();



productRouter.post('',(req,res,next)=>{
const url = req.protocol + '://' +req.get("host");
let product = new Product();
product.title = req.body.title;
product.image = url+"images"+ req.file.filename;
product.save();
res.json({
    success:true,
    message:"successfully added the product"
});
})

module.exports = productRouter;