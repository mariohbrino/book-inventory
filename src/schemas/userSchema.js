// User schema for validation using Zod
import { z } from "zod";
// for POST requests to create a new user
export const createUserSchema = z.object({
  body: z.object({
    username: z
      .string()
      .min(2, { message: "Username must be at least 2 characters long" }),
    email: z.string().email("Invalid email address"),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" }),
    age: z.number().int().min(18).optional(),
    role: z.string().min(1),
  }),
});
//for GET/users/:id or DELETE/users/:id operations
export const userIdSchema = z.object({
  params: z.object({
    id: z.string().regex(/^[a-f\d]{24}$/i, "Invalid ObjectId"),
  }),
});
// for PATCH requests to update (PUT) a user
export const userUpdateSchema = z.object({
  params: z.object({
    id: z.string().regex(/^[a-f\d]{24}$/i, "Invalid ObjectId"),
  }),
  body: z.object({
    username: z
      .string()
      .min(2, { message: "Username must be at least 2 characters long" })
      .optional(),
    email: z.string().email("Invalid email address").optional(),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" })
      .optional(),
    age: z.number().int().min(18).optional(),
    role: z.string().min(1).optional(),
  }),
});
