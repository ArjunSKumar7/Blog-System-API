import { Schema, model } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    minlength: 6,
    trim: true,
  },

  mobile: {
    type: Number,
    required: true,
    unique: true,
  },
});

const User = model("User", userSchema);
export default User;
