const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "must provide product name"],
        trim: true
    },
    imageUrl: {
        type: String,
        required: [true, "must provide the photo"]
    },
    company: {
        type: String,
        required: [true, "must provide company name"]
    },
    description:{
        type: String,
        required: [true, "must provider description"]
    },
    seller:{
        type: String,
        required: [true, "must provide seller information"]
    },
    price: {
        type: Number,
        required: [true, "must provide price of product"]
    },
    category: {
        type: String,
        required: false
    }
})
module.exports = mongoose.model('Product', productSchema, 'products')