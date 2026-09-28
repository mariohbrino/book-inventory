import express from "express";

import {
  destroy,
  index,
  loanSchema,
  show,
  store,
  update,
} from "../controllers/loans.js";
import { validate } from "../middlewares/validate.js";

const router = express.Router();

router.get("/", index);
router.get("/:id", show);
router.post("/", validate(loanSchema), store);
router.put("/:id", validate(loanSchema), update);
router.delete("/:id", destroy);

export { router as loansRouter };
