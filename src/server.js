import { app } from "./app.js";
import { loadAppConfig } from "./configs/app.js";
import { db } from "./services/database.js";

const { nodeEnv, port } = loadAppConfig();

app.listen(port, async () => {
  try {
    console.log(`Server is running on http://localhost:${port}`);
    console.log(`Environment: ${nodeEnv}`);
    await db();
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
});
