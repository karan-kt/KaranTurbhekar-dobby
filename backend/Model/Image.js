const mongoose = require('mongoose')

const Imagemodel = mongoose.Schema({

    imageName: {
        type: String,
        trim: true,
    },
    picture: {
        type: String,
        trim: true,
    },
    userId: {
        type: String,
        trim: true,
    }

},
    {
        timestamps: true,
    }
)

const Image = mongoose.model("Image", Imagemodel)
module.exports = Image;