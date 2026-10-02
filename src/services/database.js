import { createConnection } from "mongoose";

import { loadDatabaseConfig } from "../configs/database.js";

/**
 * The MongoDB connection instance.
 */
export const connection = createConnection();

/**
 * Connects to the MongoDB database using the connection
 * URL from environment variables.
 */
export const db = async () => {
  try {
    const { databaseUrl } = loadDatabaseConfig();
    await connection.openUri(databaseUrl);
    console.log("Connected to MongoDB");
    return connection;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
};
