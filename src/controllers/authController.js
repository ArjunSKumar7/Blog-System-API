import User from "../models/userSchema.js";
import bcrypt from "bcryptjs";
import { generateJWT, verifyjwt } from "../authService/jwtAuth.js";

const authController = {
  userSignup: async (req, res) => {
    try {
      const { email, name, password, mobile } = req.body;
      let hashedPassword = await bcrypt.hash(password, 10);
      const existingUser = await User.findOne({ email: email });
      if (existingUser) {
        return res.json({ userExist: true, message: "User already exists" });
      } else {
        const newUserData = await User.create({
          email,
          name,
          password: hashedPassword,
          mobile,
        });
        delete newUserData._doc.password;
        const jwt = generateJWT(newUserData._id.toString());
        res.json({
          status: 200,
          user: newUserData,
          created: true,
          token: jwt,
          message: "success! User LoggedIn",
        });
      }
    } catch (error) {
      res.json({
        user: "",
        message: `something went wrong: ${error}`,
        token: "",
        status: 400,
      });
    }
  },

  userLogin: async (req, res) => {
    try {
      const { email, password } = req.body;
      const userData = await User.findOne({ email: email });

      if (!userData) {
        res.json({
          status: 400,
          created: false,
          message: "user not found/exist",
        });
      } else if (userData.password) {
        const validPassword = await bcrypt.compare(password, userData.password);

        if (validPassword) {
          const token = generateJWT(userData._id.toString());
          const { password, ...userWithoutPassword } = userData._doc;
          return res.json({
            user: userWithoutPassword,
            created: true,
            token: token,
            status: 200,
            message: "success",
          });
        } else {
          res.json({
            status: 400,
            created: false,
            token: "",
            message: "password not matched",
          });
        }
      }
    } catch (err) {
      res.json({
        message: `something went wrong: ${err}`,
        status: 500,
        token: "",
      });
    }
  },
};

export default authController;
