import express from "express";

import { destroy, index, show, store, update } from "../controllers/authors.js";
import { validate } from "../middlewares/validate.js";
import {
  authorIdSchema,
  authorUpdateSchema,
  createAuthorSchema,
} from "../validations/author.js";

const router = express.Router();

router.get("/", index);
router.post("/", validate(createAuthorSchema), store);
router.get("/:id", validate(authorIdSchema), show);
router.put("/:id", validate(authorUpdateSchema), update);
router.delete("/:id", validate(authorIdSchema), destroy);

export { router as authorsRouter };
