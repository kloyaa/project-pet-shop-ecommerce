const express = require("express");
const router = express.Router();
const cloudinary = require("../services/img-upload/cloundinary");

router.post("/upload/image", async (req, res) => {
    try {
        const filePath = req.file.path;
        const options = {
            folder: process.env.CLOUDINARY_FOLDER + "/avatar",
            unique_filename: true,
        };
        const uploadedImg = await cloudinary.uploader.upload(filePath, options);

        return res.status(200).json({ cdn: uploadedImg.url })
    } catch (error) {
        console.log(error);
    }
})

module.exports = router;