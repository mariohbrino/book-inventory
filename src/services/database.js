import { createConnection } from "mongoose";

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
    const databaseUrl = process.env["DATABASE_URL"];
    await connection.openUri(databaseUrl);
    console.log("Connected to MongoDB");
    return connection;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
};
