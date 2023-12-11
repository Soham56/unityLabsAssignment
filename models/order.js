const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    buyerId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    sellerId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    productId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Products'
    }
});

module.exports = mongoose.model('Orders', orderSchema);