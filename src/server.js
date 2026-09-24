import { app } from "./app.js";
import { db } from "./services/database.js";

const NODE_ENV = process.env["NODE_ENV"]?.toLowerCase() || "production";
const PORT = process.env["PORT"] || 3000;

app.listen(PORT, () => {
  try {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`Environment: ${NODE_ENV}`);
    db();
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
});
