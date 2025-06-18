import { verifyjwt } from "../authService/jwtAuth.js";
import jwt from "jsonwebtoken";

const authcheck = () => {
  return async (req, res, next) => {
    try {
      let token;

      if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer ")
      ) {
        token = req.headers.authorization.split(" ")[1];
      }

      if (!token) {
        console.log("No token provided");
        return res.status(401).json({ message: "Unauthorized" });
      }

      const response = verifyjwt(token);

      if (response) {
        req.userId = response.id;
        next();
      } else {
        console.log("Token verification failed");
        return res.status(401).json({ message: "Unauthorized" });
      }
    } catch (error) {
      if (
        error instanceof jwt.TokenExpiredError ||
        (error.name && error.name === "TokenExpiredError")
      ) {
        console.log("Token expired");
        return res.status(401).json({ message: "Token expired" });
      }

      console.error("Auth error:", error);
      return res.status(401).json({ message: "Unauthorized" });
    }
  };
};

export default authcheck;
