import swaggerAutogen from "swagger-autogen";

import { loadAppConfig } from "./configs/app.js";

const { baseUrl, isDevelopment, port } = loadAppConfig();

const hostUrl = () => {
  if (isDevelopment) {
    return `${baseUrl}:${port}`;
  }
  return baseUrl;
};

const outputFile = "./openapi.json";
const routes = ["./routes/index.js"];
const doc = {
  info: {
    title: "Book Inventory API",
    description: "A simple book inventory API",
    version: "0.1.0",
  },
  host: hostUrl(),
  schemes: isDevelopment ? ["http"] : ["http", "https"],
};

const generateSwagger = swaggerAutogen({ openapi: "3.2.0" });
generateSwagger(outputFile, routes, doc);
