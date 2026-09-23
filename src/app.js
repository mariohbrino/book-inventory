import express from "express";

import { responseMiddleware } from "./middlewares/response.js";
import { router } from "./routes/index.js";

const app = express();

// Apply middlewares
app.use(express.json());
app.use(responseMiddleware);

// Mount all routes
app.use("/", router);

export { app };
