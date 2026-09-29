export const validate = (schema) => (request, response, next) => {
  const result = schema.safeParse({
    body: request.body,
    query: request.query,
    params: request.params,
  });

  if (!result.success) {
    return response.status(400).json({ errors: result.error.issues });
  }

  if ("body" in result.data) {
    request.body = result.data.body;
  }
  return next();
};
