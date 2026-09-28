import express from "express";

import { index, show, store } from "../controllers/loans.js";

const router = express.Router();

router.get("/", index);
router.get("/:id", show);
router.post("/", store);

export { router as loansRouter };
