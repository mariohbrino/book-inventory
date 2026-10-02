import express from "express";
import {
  createUser,
  deleteUser,
  getUserById,
  getUsers,
  updateUser,
} from "../controllers/users.js";
import { validate } from "../middlewares/validate.js";
import {
  createUserSchema,
  userIdSchema,
  userUpdateSchema,
} from "../schemas/userSchema.js";

const router = express.Router();

router.get("/", getUsers);
router.post("/", validate(createUserSchema), createUser);
router.get("/:id", validate(userIdSchema), getUserById);
router.put("/:id", validate(userUpdateSchema), updateUser);
router.delete("/:id", validate(userIdSchema), deleteUser);

export { router as usersRouter };
