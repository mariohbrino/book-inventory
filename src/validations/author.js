import { z } from "zod";

const objectIdSchema = z.string().regex(/^[0-9a-f]{24}$/i, "Invalid ObjectId");

const authorBodySchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters long",
  }),
  birthDate: z.coerce.date().optional(),
  nationality: z.string().min(2).optional(),
  biography: z.string().optional(),
});

export const createAuthorSchema = z.object({
  body: authorBodySchema,
});

export const authorIdSchema = z.object({
  params: z.object({
    id: objectIdSchema,
  }),
});

export const authorUpdateSchema = z.object({
  params: z.object({
    id: objectIdSchema,
  }),
  body: authorBodySchema.partial(),
});
