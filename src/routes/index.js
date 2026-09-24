import express from "express";

import { booksRouter } from "./books.js";
import { homeRouter } from "./home.js";

const router = express.Router();

router.use("/", homeRouter);
router.use("/books", booksRouter);

export { router };
