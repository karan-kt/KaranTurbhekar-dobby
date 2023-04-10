const asyncHandler = require('express-async-handler');
const Image = require('../Model/Image');


//storeimage http://localhost:4000/api/images/storeimages
const storeImages = asyncHandler(async (req, res) => {
    const { imageName, picture, userId } = req.body;

    const pic = await Image.create({
        imageName: imageName,
        picture: picture,
        userId: userId,
    })

    if (pic) {
        res.status(200).json({
            imageName: pic.imageName,
            picture: pic.picture,
            userId: userId
        })
    } else {
        res.status(400)
        throw new Error("Couldn't save image");
    }

})

//storeimage http://localhost:4000/api/images/getimages
const getImages = asyncHandler(async (req, res) => {
    const { userId } = req.body;
    try {
        const data = await Image.find({ userId })
        res.status(200).send(data);
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }

})


module.exports = { storeImages, getImages }
