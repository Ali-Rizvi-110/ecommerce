const Product = require('../models/productSchema.js');

const createProduct = async (req, res) => {
    try {
        const product = await Product.create(req.body);
        console.log(req.body);
        res.status(200).json({ product });
    } catch (error) {
        console.log(error);
        res.status(500).json({ err: "Error in createProduct", error });
    }
};

const showAllProducts = async (req, res) => {
    try {
        const category = req.query.category;
        let products;
    
        if (category) {
          // Fetch products by category
          products = await Product.find({ category: category });
        } else {
          // Fetch all products
          products = await Product.find();
        }
    
        res.json({ products });
      } catch (error) {
        console.error('Error in Fetching Products', error);
        res.status(500).json({ error: 'An error occurred while fetching products' });
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
