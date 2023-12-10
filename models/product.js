const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'Please Provide Product Name']
    },
    price:{
        type: Number,
        required: [true, 'Please Provide Product Price']
    },
    sellerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('Products', productSchema);