import { z } from "zod";

const objectIdSchema = z.string().regex(/^[0-9a-f]{24}$/i, "Invalid ObjectId");

const bookBodySchema = z.object({
  title: z.string().min(1),
  authorId: objectIdSchema,
  isbn: z.string().min(10),
  publisher: z.string().optional(),
  publishedYear: z.coerce.number().int().optional(),
  genre: z.string().optional(),
  totalCopies: z.coerce.number().int().min(0).optional(),
  availableCopies: z.coerce.number().int().min(0).optional(),
});

export const bookIdSchema = z.object({
  params: z.object({ id: objectIdSchema }).strict(),
});

export const bookSchema = z.object({
  body: bookBodySchema,
});

export const bookUpdateSchema = z.object({
  body: bookBodySchema,
  params: z.object({ id: objectIdSchema }).strict(),
});
