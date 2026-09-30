const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const secret = process.env.CLOUD_API_SECRET;

console.log("Cloudinary secret check:", {
  exists: !!secret,
  length: secret?.length,
  lastCharCode: secret ? secret.charCodeAt(secret.length - 1) : null,
  hasWhitespace: secret ? /\s/.test(secret) : null,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'wanderlust_DEV', // The folder in your Cloudinary account where images will be stored
    allowed_formats: ['png', 'jpg', 'jpeg'], // supports promises as well
   
  },
});

module.exports = {
  cloudinary,
  storage,
};

