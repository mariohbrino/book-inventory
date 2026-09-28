export const validate = (schema) => (request, response, next) => {
  try {
    schema.parse({
      body: request.body,
      query: request.query,
      params: request.params,
    });
    return next();
  } catch (error) {
    if (error) {
      console.log("Validation error: ", error);
      return response.status(400).json({ errors: error.issues });
    }
    return response.status(500).json({ error: "Internal Server Error" });
  }
};
