import express from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
} from "../controllers/users.js";
import { validate } from "../middlewares/validate.js";
import {
  createUserSchema,
  userIdSchema,
  userUpdateSchema,
} from "../schemas/userSchema.js";

const router = express.Router();

router.get("/", getAllUsers);
router.post("/", validate(createUserSchema), createUser);
router.get("/:id", validate(userIdSchema), getUserById);
router.patch("/:id", validate(userUpdateSchema), updateUser);
router.delete("/:id", validate(userIdSchema), deleteUser);

export { router as usersRouter };
