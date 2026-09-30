import express from "express";

import { booksRouter } from "./books.js";
import { homeRouter } from "./home.js";
import { loansRouter } from "./loans.js";
import { usersRouter } from "./users.js";

const router = express.Router();

router.use("/", homeRouter);
router.use("/books", booksRouter);
router.use("/loans", loansRouter);
router.use("/users", usersRouter);

export { router };
