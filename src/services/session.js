import jwt from "jsonwebtoken";

import { loadAuthConfig } from "../configs/auth.js";

export const createSessionToken = (payload) => {
  const { sessionSecret } = loadAuthConfig();
  return jwt.sign(payload, sessionSecret, { expiresIn: "1d" });
};

export const verifySessionToken = (token) => {
  const { sessionSecret } = loadAuthConfig();
  try {
    return jwt.verify(token, sessionSecret);
  } catch {
    return null;
  }
};
