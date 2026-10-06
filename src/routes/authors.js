import express from "express";

import { destroy, index, show, store, update } from "../controllers/authors.js";
import { authenticate } from "../middlewares/authenticate.js";
import { validate } from "../middlewares/validate.js";
import {
  authorIdSchema,
  authorUpdateSchema,
  createAuthorSchema,
} from "../validations/author.js";

const router = express.Router();

router.get("/", index);
router.get("/:id", validate(authorIdSchema), show);
router.post("/", authenticate, validate(createAuthorSchema), store);
router.put("/:id", authenticate, validate(authorUpdateSchema), update);
router.delete("/:id", authenticate, validate(authorIdSchema), destroy);

export { router as authorsRouter };
