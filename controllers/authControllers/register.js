const User = require('../../models/user');
const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
    const { username, password, type } = req.body;
    const user = await User.create({ username, password, type });
    const token = jwt.sign({ userId: user._id, type },process.env.JWT_SECREAT, {expiresIn: process.env.JWT_EXPIRESIN});
    return res.status(StatusCodes.CREATED).json({ token, user });
}

module.exports = registerUser;