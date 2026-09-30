// User controller functions for handling user-related operations
// req, res, and service calls
//Using Zod for schema validation
import { z } from "zod";

// User schema for validation
export const userSchema = z.object({
  id: z.string().uuid({ message: "Invalid UUID" }).optional(),
  username: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(8),
  age: z.number().int().min(18).optional(),
  role: z.string().min(1),
});

export const userIdSchema = z.object({
  id: z.string().uuid({ message: "Invalid UUID" }),
});

export const userUpdateSchema = z.object({
  username: z.string().min(1).optional(),
  email: z.string().email().optional(),
  password: z.string().min(8).optional(),
});
