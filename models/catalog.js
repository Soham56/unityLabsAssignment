const mongoose = require('mongoose');

const catalogSchema = new mongoose.Schema({
    sellerId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    products:{
        type: mongoose.Schema.Types.Array,
    }
});

module.exports = mongoose.model('Catalog', catalogSchema);
