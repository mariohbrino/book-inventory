import express from "express";

import {
  destroy,
  index,
  loanIdSchema,
  loanSchema,
  loanUpdateSchema,
  show,
  store,
  update,
} from "../controllers/loans.js";
import { validate } from "../middlewares/validate.js";

const router = express.Router();

router.get("/", index);
router.get("/:id", validate(loanIdSchema), show);
router.post("/", validate(loanSchema), store);
router.put("/:id", validate(loanUpdateSchema), update);
router.delete("/:id", validate(loanIdSchema), destroy);

export { router as loansRouter };
