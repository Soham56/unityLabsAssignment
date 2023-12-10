const mongoose = require('mongoose');

const connectDb = (mongoUri)=>{
    return mongoose.connect(mongoUri);
}

module.exports = connectDb;

