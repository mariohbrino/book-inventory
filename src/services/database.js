import { createConnection } from "mongoose";

export const db = () => {
  try {
    const databaseUrl = process.env["DATABASE_URL"];
    const connection = createConnection();
    const database = connection.openUri(databaseUrl);
    console.log("Connected to MongoDB");
    return database;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
};
