const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadFile = async (file, folder = "") => {
  try {
    const result = await cloudinary.uploader.upload(file, { folder: folder });
    return result;
  } catch (error) {
    throw new Error("Error uploading file to Cloudinary: " + error.message);
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

module.exports = { uploadFile, getFile };
