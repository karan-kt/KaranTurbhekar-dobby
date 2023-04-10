const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')

const Usermodel = mongoose.Schema({

    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    }
},
    {
        timestamps: true,
    }
)

Usermodel.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

Usermodel.pre("save", async function (next) {

    if (!this.isModified) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)
})

const User = mongoose.model('User', Usermodel);
module.exports = User;