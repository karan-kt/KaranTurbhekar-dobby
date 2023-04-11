const express = require('express')
const router = express.Router();
const { storeImages, getImages, getSearchImages } = require("../Controller/imageController")

router.post("/storeimages", storeImages)
router.post("/getimages", getImages)
router.get("/searchimages", getSearchImages);


module.exports = router;