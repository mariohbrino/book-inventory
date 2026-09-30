import swaggerAutogen from "swagger-autogen";

const PORT = process.env["PORT"] || 3000;
const PRODUCTION = process.env["NODE_ENV"] === "production";
const BASE_URL = PRODUCTION ? process.env["BASE_URL"] : `localhost:${PORT}`;

const outputFile = "./openapi.json";
const routes = ["./routes/index.js"];
const doc = {
  info: {
    title: "Book Inventory API",
    description: "A simple book inventory API",
    version: "0.1.0",
  },
  host: BASE_URL,
  schemes: PRODUCTION ? ["https"] : ["http", "https"],
};

const generateSwagger = swaggerAutogen({ openapi: "3.2.0" });
generateSwagger(outputFile, routes, doc);
