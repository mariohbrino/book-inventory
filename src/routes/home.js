import express from "express";

const router = express.Router();

router.get("/", (request, response) => {
  void request;
  response.json({ message: "Welcome to the home page!" });
});

export { router as homeRouter };
