const express = require('express')
const router = express.Router();
const { storeImages, getImages } = require("../Controller/imageController")

router.post("/storeimages", storeImages)
router.post("/getimages", getImages)


module.exports = router;