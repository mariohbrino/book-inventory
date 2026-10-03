import express from "express";

import {
  errorHandlerMiddleware,
  handleNotFoundMiddleware,
} from "./middlewares/error.js";
import { openApiMiddleware } from "./middlewares/openapi.js";
import { responseMiddleware } from "./middlewares/response.js";
import { router } from "./routes/index.js";

const app = express();

// Apply middlewares
app.use(express.json());
app.use(openApiMiddleware());
app.use(responseMiddleware);

// Mount all routes
app.use("/", router);

// Handle 404 and other errors
app.use(handleNotFoundMiddleware);
app.use(errorHandlerMiddleware);

export { app };
