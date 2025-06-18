import jwt from "jsonwebtoken";
import { configKeys } from "../config/keys.js";

export const generateJWT = (id) => {
  try {
    const jwtPayload = { id:id };
    if (configKeys.JWT_SECRET_KEY) {
      const token = jwt.sign(jwtPayload, configKeys.JWT_SECRET_KEY, {
        expiresIn: configKeys.JWT_EXPIRATION,
      });
      return token;
    }
  } catch (error) {
    console.error("Error generating JWT:", error);
    throw error;
  }
};

export const verifyjwt = (token) => {
  if (configKeys.JWT_SECRET_KEY) {
    const verifyJwt = jwt.verify(token,configKeys.JWT_SECRET_KEY);
    return verifyJwt;
  }
};
