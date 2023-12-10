const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please Provide Your Name']
    },
    password:{
        type: String,
        required:[true, 'Please Provide Your Password']
    },
    type:{
        type: String,
        enum:{
            values: ['buyer', 'seller'],
            message: '{VALUE} is not supported'
        }
    }
});

userSchema.pre('save', async function(){
    const getSalt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(this.password, getSalt);
    this.password = hash;
})

module.exports = mongoose.model('User', userSchema);

