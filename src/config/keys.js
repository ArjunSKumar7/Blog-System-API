import dotENV from "dotenv";

dotENV.config();

export const configKeys = {
  MONGODB_URL: process.env.MONGODB_URL,
  PORT: process.env.PORT,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
  CLIENT_URL: process.env.JWT_SECRET_KEY,
  JWT_EXPIRATION: process.env.JWT_EXPIRATION,
CLOUD_NAME: process.env.CLOUD_NAME,
CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
};
