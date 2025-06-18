import { v2 as cloudinary } from 'cloudinary';
import { configKeys } from "./keys.js";
cloudinary.config({
cloud_name: configKeys.CLOUD_NAME,
api_key: configKeys.CLOUDINARY_API_KEY,
api_secret: configKeys.CLOUDINARY_API_SECRET,
});

export default cloudinary;