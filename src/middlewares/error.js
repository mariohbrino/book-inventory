export const handleNotFoundMiddleware = (request, response, next) => {
  void response;
  const error = new Error(
    `Page not found: ${request.method} ${request.originalUrl}`,
  );
  error.status = 404;
  return next(error);
};

export const errorHandlerMiddleware = (error, request, response, next) => {
  void request;
  void next;

  // Determine status and template
  const status = error.status || 500;

  if (status === 404) {
    console.warn(error.message);
  } else {
    console.error("Error occurred:", error.message);
    console.error("Stack trace:", error.stack);
  }

  // Prepare data for the template
  const context = {
    title: status === 404 ? "Page Not Found" : "Server Error",
    error: error.message,
  };

  if (process.env["NODE_ENV"] === "development") {
    context.stack = JSON.stringify(error.stack, null, 2);
  }

  // Send the appropriate error template as JSON
  return response.status(status).json({ context });
};
