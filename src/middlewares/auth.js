import jwt from "jsonwebtoken";

const getJwtSecret = () => process.env.JWT_SECRET;

const authenticate = (request, response, next) => {
  const authorization = request.get("authorization");
  const token = authorization?.startsWith("Bearer ")
    ? authorization.slice(7)
    : null;

  if (!token) {
    return response.status(401).json({ error: "Authentication required" });
  }

  const secret = getJwtSecret();

  if (!secret) {
    return response.status(500).json({ error: "JWT_SECRET is not configured" });
  }

  try {
    request.user = jwt.verify(token, secret);
    return next();
  } catch {
    return response.status(401).json({ error: "Invalid or expired token" });
  }
};

const authorize =
  (...allowedRoles) =>
  (request, response, next) => {
    if (!request.user || !allowedRoles.includes(request.user.role)) {
      return response.status(403).json({ error: "Forbidden" });
    }

    return next();
  };

export { authenticate, authorize };
