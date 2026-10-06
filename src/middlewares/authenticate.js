import { verifySessionToken } from "../services/session.js";

export const authenticate = (request, response, next) => {
  const token = request.cookies?.session;

  if (!token) {
    return response.status(401).json({ error: "Authentication required" });
  }

  const payload = verifySessionToken(token);

  if (!payload) {
    return response.status(401).json({ error: "Invalid or expired session" });
  }

  request.user = payload;
  return next();
};
