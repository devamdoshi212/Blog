const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const fs = require("fs").promises;
const path = require("path");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const multerConfig = multer({
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only images are allowed"));
    }
  },
});

const uploadFile = async (fileBuffer, originalFileName, folder) => {
  try {
    const fileExt = path.extname(originalFileName);

    if (!fs.existsSync("./public")) {
      fs.mkdir("./public");
    }

    const filePath = path.join("./public", `${Date.now()}${fileExt}`);
    await fs.writeFile(filePath, fileBuffer);
    const result = await cloudinary.uploader.upload(filePath, {
      folder: folder,
    });
    await fs.unlink(filePath);
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getFile = async (public_id) => {
  try {
    const result = await cloudinary.uploader.explicit(public_id);
    return result;
  } catch (error) {
    throw new Error("Error getting file from Cloudinary: " + error.message);
  }
};

module.exports = { multerConfig, uploadFile, getFile };
