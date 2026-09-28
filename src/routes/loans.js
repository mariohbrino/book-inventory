import express from "express";

import { index } from "../controllers/loans.js";

const router = express.Router();

router.get("/", index);

export { router as loansRouter };
