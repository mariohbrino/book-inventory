import express from "express";

import { destroy, index, show, store, update } from "../controllers/books.js";
import { authenticate } from "../middlewares/authenticate.js";
import { validate } from "../middlewares/validate.js";
import {
  bookIdSchema,
  bookSchema,
  bookUpdateSchema,
} from "../validations/book.js";

const router = express.Router();

router.get("/", index);
router.get("/:id", validate(bookIdSchema), show);
router.post("/", authenticate, validate(bookSchema), store);
router.put("/:id", authenticate, validate(bookUpdateSchema), update);
router.delete("/:id", authenticate, validate(bookIdSchema), destroy);

export { router as booksRouter };
