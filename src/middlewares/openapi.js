import swaggerUi from "swagger-ui-express";

import openapiDocument from "../openapi.json" with { type: "json" };

export const openApiMiddleware = () => {
  return [swaggerUi.serve, swaggerUi.setup(openapiDocument)];
};
