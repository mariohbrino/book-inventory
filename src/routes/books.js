import express from "express";

import { getAllBooks } from "../controllers/books.js";
import { authenticate, authorize } from "../middlewares/auth.js";

const router = express.Router();

router.get("/", authenticate, authorize("admin", "librarian"), getAllBooks);

export { router as booksRouter };
