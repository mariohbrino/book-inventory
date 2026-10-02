import express from "express";

import { destroy, index, show, store, update } from "../controllers/users.js";
import { validate } from "../middlewares/validate.js";
import {
  createUserSchema,
  userIdSchema,
  userUpdateSchema,
} from "../validations/user.js";

const router = express.Router();

router.get("/", index);
router.post("/", validate(createUserSchema), store);
router.get("/:id", validate(userIdSchema), show);
router.put("/:id", validate(userUpdateSchema), update);
router.delete("/:id", validate(userIdSchema), destroy);

export { router as usersRouter };
