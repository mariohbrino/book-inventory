import swaggerUi from "swagger-ui-express";

import openApiDocument from "../openapi.json" with { type: "json" };

export { openApiDocument };

export const openApiMiddleware = () => {
  return [swaggerUi.serve, swaggerUi.setup(openApiDocument)];
};
