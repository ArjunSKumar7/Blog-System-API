import User from "../models/userSchema.js";
import Blog from "../models/blogSchema.js";

import mongoose from 'mongoose';
const userController={
    createPost: async (req, res,next) => {
try {
const { title,content } = req.body;
console.log(title, content,req.body,req.file.path);

  if (!req.userId) {
const error = new Error("Unauthorized");
        error.statusCode = 401;
        throw error;  }

  if (!req.file || !req.file.path) {
    const error = new Error("Image upload failed");
        error.statusCode = 400;
        throw error;
  }

  const newPost = new Blog({
    title,
    content,
    imageUrl: req.file.path, 
    author: req.userId,
  });

  const savedPost = await newPost.save();

  res.status(201).json({ message: "Post created", post: savedPost });
} catch (error) {
    next(error);
  // res.status(500).json({ message: "Error creating post", error: error.message });
}
},

getAllPosts:async(req,res,next)=>{
  try {
  const page = parseInt(req.query.page) || 1;
  const limit = 5;
  const skip = (page - 1) * limit;
const posts = await Blog.find({ isDeleted: false })
  .sort({ createdAt: -1 }) 
  .skip(skip)
  .limit(limit)
  .populate("author", "name email");
  res.status(200).json({ message: "Posts fetched", posts });
} catch (error) {
     next(error);
}


},

getPost:async(req,res,next)=>{

try {
  const postId= req.params.id
   if (!postId.match(/^[0-9a-fA-F]{24}$/)) {
const error = new Error("Invalid post ID format");
        error.statusCode = 400;
        throw error;  }

  const posts=await Blog.findOne({ _id: postId, isDeleted: false }).populate("author", "name email");
  if (!posts) {
     const error = new Error("Post not found");
        error.statusCode = 404;
        throw error;
  }
  res.status(200).json({ message: "Post fetched", posts });
} catch (error) {
 next(error);
}

},
updatePost: async (req, res,next) => {
try {
const postId = req.params.id;
const { title, content } = req.body;
const userId = req.userId;



  if (!postId.match(/^[0-9a-fA-F]{24}$/)) {
    const error = new Error("Invalid post ID");
        error.statusCode = 400;
        throw error;
  }


  const post = Blog.findOne({ _id: postId, isDeleted: false });
  if (!post) {
  const error = new Error("Post not found");
        error.statusCode = 404;
        throw error;
  }

 
  if (post.author.toString() !== userId) {
const error = new Error("You are not authorized to update this post");
        error.statusCode = 403;
        throw error;
        }


  post.title = title || post.title;
  post.content = content || post.content;

    if (req.file && req.file.path) {

    post.imageUrl = req.file.path; 
  }

  const updatedPost = await post.save();
  res.status(200).json({ message: "Post updated", post: updatedPost });
} catch (error) {
 next(error);
}
},
deletePost: async (req, res,next) => {
try {
const postId = req.params.id;


  if (!postId.match(/^[0-9a-fA-F]{24}$/)) {
     const error = new Error("Invalid post ID");
        error.statusCode = 400;
        throw error;
  }

  const post = await Blog.findById(postId);

  if (!post) {
    const error = new Error("Post not found");
        error.statusCode = 404;
        throw error;
  }

 
  if (post.author.toString() !== req.userId) {
     const error = new Error("Unauthorized to delete this post");
        error.statusCode = 403;
        throw error;
  }



  // await Blog.findByIdAndDelete(postId);
     post.isDeleted = true;
    await post.save();
 

  res.status(200).json({ message: "Post deleted successfully" });
} catch (error) {
  next(error);
}
},
      
}
export default userController;
