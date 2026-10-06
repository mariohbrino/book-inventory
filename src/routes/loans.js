import express from "express";

import { destroy, index, show, store, update } from "../controllers/loans.js";
import { authenticate } from "../middlewares/authenticate.js";
import { validate } from "../middlewares/validate.js";
import {
  loanIdSchema,
  loanSchema,
  loanUpdateSchema,
} from "../validations/loan.js";

const router = express.Router();

router.get("/", index);
router.get("/:id", validate(loanIdSchema), show);
router.post("/", authenticate, validate(loanSchema), store);
router.put("/:id", authenticate, validate(loanUpdateSchema), update);
router.delete("/:id", authenticate, validate(loanIdSchema), destroy);

export { router as loansRouter };
