import { Router } from "express";
import swaggerUi from "swagger-ui-express";

import openapiDocument from "../openapi.json" with { type: "json" };

export const openApiMiddleware = ({
  path = "/api-docs",
  document = openapiDocument,
  uiOptions = { customSiteTitle: "Book Inventory API Docs" },
} = {}) => {
  const router = Router();
  router.use(path, swaggerUi.serve, swaggerUi.setup(document, uiOptions));
  return router;
};
