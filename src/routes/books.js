import express from "express";

import {
  bookSchema,
  destroy,
  index,
  show,
  store,
  update,
} from "../controllers/books.js";
import { validate } from "../middlewares/validate.js";

const router = express.Router();

router.get("/", index);
router.get("/:id", show);
router.post("/", validate(bookSchema), store);
router.put("/:id", validate(bookSchema), update);
router.delete("/:id", destroy);

export { router as booksRouter };
