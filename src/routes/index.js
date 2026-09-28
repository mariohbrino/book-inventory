import express from "express";

import { booksRouter } from "./books.js";
import { homeRouter } from "./home.js";
import { loansRouter } from "./loans.js";

const router = express.Router();

router.use("/", homeRouter);
router.use("/books", booksRouter);
router.use("/loans", loansRouter);

export { router };
