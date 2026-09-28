import express from "express";

import { index, show } from "../controllers/loans.js";

const router = express.Router();

router.get("/", index);
router.get("/:id", show);

export { router as loansRouter };
