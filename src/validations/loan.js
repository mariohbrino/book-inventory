import { z } from "zod";

const objectIdSchema = z.string().regex(/^[0-9a-f]{24}$/i, "Invalid ObjectId");

const loanBodySchema = z
  .object({
    bookId: objectIdSchema,
    userId: objectIdSchema,
    borrowedAt: z.coerce.date(),
    dueAt: z.coerce.date(),
    returnedAt: z.coerce.date().optional(),
  })
  .strict()
  .superRefine((loan, context) => {
    if (loan.dueAt < loan.borrowedAt) {
      context.addIssue({
        code: "custom",
        path: ["dueAt"],
        message: "Due date must be on or after the borrowed date",
      });
    }

    if (loan.returnedAt && loan.returnedAt < loan.borrowedAt) {
      context.addIssue({
        code: "custom",
        path: ["returnedAt"],
        message: "Return date must be on or after the borrowed date",
      });
    }
  });

export const loanSchema = z.object({ body: loanBodySchema });

export const loanIdSchema = z.object({
  params: z.object({ id: objectIdSchema }).strict(),
});

export const loanUpdateSchema = z.object({
  body: loanBodySchema,
  params: z.object({ id: objectIdSchema }).strict(),
});
