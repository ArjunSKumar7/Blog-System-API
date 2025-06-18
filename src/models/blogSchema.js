import mongoose from "mongoose";
import { Schema, model } from "mongoose";

const blogSchema = new Schema({
title: {
type: String,
required: true,
trim: true,
},
content: {
type: String,
required: true,
},
author: {
type: mongoose.Schema.Types.ObjectId,
ref: "User",
required: true,
},
  imageUrl: {
    type: String, 
    required: true,
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

const Blog = model("Blog", blogSchema);
export default Blog;

