import express from "express";

import { authenticate } from "../middlewares/authenticate.js";
import { authRouter } from "./auth.js";
import { authorsRouter } from "./authors.js";
import { booksRouter } from "./books.js";
import { homeRouter } from "./home.js";
import { loansRouter } from "./loans.js";
import { usersRouter } from "./users.js";

const router = express.Router();

router.use("/", homeRouter);
router.use("/auth", authRouter);
router.use("/books", booksRouter);
router.use("/authors", authorsRouter);
router.use("/loans", loansRouter);
router.use("/users", authenticate, usersRouter);

export { router };
