const Product = require('../models/productSchema.js');

const createProduct = async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(200).json({ product });
    } catch (error) {
        console.log(error);
        res.status(500).json({ err: "Error in createProduct", error });
    }
};

const showAllProducts = async (req, res) => {
    try{
        const products = await Product.find({});
        res.status(200).json({products})
    }catch(error){
        console.log(error);
        res.status(500).json({err: "error in showAllProduct function", error})
    }
}

module.exports = {
    createProduct,
    showAllProducts
};
