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
const deleteProduct = async (req, res) => {
    console.log('runned')
    try{
        const _id = req.body.productId;
        console.log(_id);
        const product = await Product.findOneAndDelete({_id});
        console.log(product);
        if(product){
            return res.status(200).json(product);
        }
        return res.status(404).json('Product is not present');
    }catch(error){
        console.log(error);
        return res.status(500).json('Internal server error');
    }
}

module.exports = {
    createProduct,
    showAllProducts,
    deleteProduct
};
