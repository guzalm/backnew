const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
}, { collection: 'products' });

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;
