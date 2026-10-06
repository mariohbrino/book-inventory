import express from "express";

import { callback, login, logout, me } from "../controllers/auth.js";
import { authenticate } from "../middlewares/authenticate.js";

const router = express.Router();

router.get("/login", login);
router.get("/callback", callback);
router.get("/logout", logout);
router.get("/me", authenticate, me);

export { router as authRouter };
