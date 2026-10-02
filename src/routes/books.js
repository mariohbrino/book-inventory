import express from "express";

import { destroy, index, show, store, update } from "../controllers/books.js";
import { validate } from "../middlewares/validate.js";
import {
  bookIdSchema,
  bookSchema,
  bookUpdateSchema,
} from "../validations/book.js";

const router = express.Router();

router.get("/", index);
router.get("/:id", validate(bookIdSchema), show);
router.post("/", validate(bookSchema), store);
router.put("/:id", validate(bookUpdateSchema), update);
router.delete("/:id", validate(bookIdSchema), destroy);

export { router as booksRouter };
