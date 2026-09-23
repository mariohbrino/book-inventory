import { app } from "./app.js";

const NODE_ENV = process.env["NODE_ENV"]?.toLowerCase() || "production";
const PORT = process.env["PORT"] || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`Environment: ${NODE_ENV}`);
});
