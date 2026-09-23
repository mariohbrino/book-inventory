const responseMiddleware = (request, response, next) => {
  void request;
  response.setHeader("Content-Type", "application/json");
  next();
};

export { responseMiddleware };
