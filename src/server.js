import { app } from "./app.js";
import { loadAppConfig } from "./configs/app.js";
import { connectDatabase } from "./services/database.js";

const { nodeEnv, port } = loadAppConfig();

app.listen(port, async () => {
  try {
    console.log(`Server is running on http://localhost:${port}`);
    console.log(`API docs available at http://localhost:${port}/api-docs`);
    console.log(`Environment: ${nodeEnv}`);
    await connectDatabase();
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
});
