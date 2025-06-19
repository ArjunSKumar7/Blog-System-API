
# Blog System Backend
A secure and scalable RESTful API built with **Node.js**, **Express**, and **MongoDB** that allows users to sign up, log in, create blog posts with **image uploads**, and manage them with proper authorization. Includes advanced features like **JWT authentication**, **pagination**, **rate limiting**, and **custom error handling**.

Vercel Link :blog-system-backend-six.vercel.app






## 🚀 Features

- 🔐 User signup and login with JWT authentication
- 📖 CRUD operations for blog posts
- ✍️ Add, update, and delete blogs 
- 📊 Get All Posts with pagination (/api/user/posts?page=2)
- 🛡️ Input validation and protected routes using middleware
- 🛡️ Global error handler with consistent error responses,Rate limiting to prevent abuse


## API Documentation

[Postman API Documentation](https://documenter.getpostman.com/view/44758697/2sB2qfBKLp)

## 🏗️ Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT + bcrypt
- **Validation**: Custom middlewares,express-validator


## 🗂️ Project Structure
src/  
├── authService/ → JWT helper (jwtAuth.js)   
├── config/ → Configuration files (database, cloudinary, keys)
├── controllers/ → Business logic (authController.js, userController.js)  
├── middlewares/ → Auth, rate limiting, error handling, multer upload  
├── models/ → Mongoose schemas (User, Blog)  
├── routes/ → Route definitions (authRoutes, userRoutes)  
├── validators/ → Express validators  
└── index.js → Main server file
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`MONGODB_URL`=your key  
`PORT`=8000  
`JWT_SECRET_KEY`=thisistheuserkey1234  
`JWT_EXPIRATION`=1d  
`CLOUD_NAME`=Your cloud name  
`CLOUDINARY_API_KEY`= Your CLOUDINARY_API_KEY  
`CLOUDINARY_API_SECRET`=Your CLOUDINARY_API_SECRET  



## 🛠️ Project Setup Instructions
## Prerequisites
Node.js (v18+ recommended)

MongoDB (Cloud or Local instance)

## Clone the Repository
git clone https://github.com/ArjunSKumar7/Blog-System-API

## Install Dependencies

npm install
