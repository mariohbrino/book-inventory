import express from "express";

import { getAllBooks } from "../controllers/books.js";

const router = express.Router();

router.get("/", getAllBooks);

export { router as booksRouter };
