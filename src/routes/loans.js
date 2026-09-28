import express from "express";

import { destroy, index, show, store, update } from "../controllers/loans.js";

const router = express.Router();

router.get("/", index);
router.get("/:id", show);
router.post("/", store);
router.put("/:id", update);
router.delete("/:id", destroy);

export { router as loansRouter };
