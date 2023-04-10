const asyncHandler = require('express-async-handler')
const User = require('../Model/User')

//Registration http://localhost:4000/api/user/register
const registration = (async (req, res) => {
    const { email, username, password } = req.body;

    const userExists = await User.findOne({ email: email });
    if (userExists) {
        res.status(400).send("User already exists");
    }

    const user = await User.create({
        email,
        username,
        password
    })

    if (user) {
        res.status(200).json({
            _id: user._id,
            email: user.email,
            username: user.username
        })
    } else {
        res.status(400);
        throw new Error("Invalid user data");
    }

})


//Registration http://localhost:4000/api/user/login
const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });
    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            email: user.email,
            username: user.username
        })
    } else {
        res.status(400).send("Invalid user credentials");
        throw new Error("Invalid user credentials");
    }

})

module.exports = { registration, login }

