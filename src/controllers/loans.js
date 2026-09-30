import { z } from "zod";

import {
  createLoan,
  deleteLoan,
  getAllLoans,
  getLoanById,
  updateLoan,
} from "../models/loans.js";

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

export const index = async (request, response) => {
  /**
   * #swagger.tags = ['Loans']
   * #swagger.summary = 'Get all loans'
   */
  void request;
  const loans = await getAllLoans();
  return response.json(loans);
};

export const show = async (request, response) => {
  /**
   * #swagger.tags = ['Loans']
   * #swagger.summary = 'Get a loan by ID'
   */
  const { id } = request.params;
  const loan = await getLoanById(id);
  if (!loan) {
    return response.status(404).json({ error: "Loan not found" });
  }
  return response.json(loan);
};

export const store = async (request, response) => {
  /**
   * #swagger.tags = ['Loans']
   * #swagger.summary = 'Create a new loan'
   * #swagger.requestBody = {
      description: 'Post creation payload',
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            required: ['title', 'authorId', 'isbn'],
            properties: {
              bookId: {
                type: 'string',
                example: '507f1f77bcf86cd799439011'
              },
              userId: {
                type: 'string',
                example: '507f191e810c19729de860ea'
              },
              borrowedAt: {
                type: 'string',
                format: 'date-time',
                example: '2024-06-01T10:00:00Z'
              },
              dueAt: {
                type: 'string',
                format: 'date-time',
                example: '2024-06-15T10:00:00Z'
              },
              returnedAt: {
                type: 'string',
                format: 'date-time',
                example: '2024-06-10T10:00:00Z'
              },
            }
          }
        }
      }
    }
   */
  const loanData = request.body;
  try {
    const newLoan = await createLoan(loanData);
    console.log("Loan created successfully: ", newLoan);
    return response.status(201).json(newLoan);
  } catch (error) {
    console.log("Error creating loan: ", error);
    return response.status(500).json({ error: "Error creating loan" });
  }
};

export const update = async (request, response) => {
  /**
   * #swagger.tags = ['Loans']
   * #swagger.summary = 'Update a loan by ID'
   * #swagger.requestBody = {
      description: 'Post creation payload',
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            required: ['title', 'authorId', 'isbn'],
            properties: {
              bookId: {
                type: 'string',
                example: '507f1f77bcf86cd799439011'
              },
              userId: {
                type: 'string',
                example: '507f191e810c19729de860ea'
              },
              borrowedAt: {
                type: 'string',
                format: 'date-time',
                example: '2024-06-01T10:00:00Z'
              },
              dueAt: {
                type: 'string',
                format: 'date-time',
                example: '2024-06-15T10:00:00Z'
              },
              returnedAt: {
                type: 'string',
                format: 'date-time',
                example: '2024-06-10T10:00:00Z'
              },
            }
          }
        }
      }
    }
   */
  const { id } = request.params;
  const loanData = request.body;
  try {
    const updatedLoan = await updateLoan(id, loanData);
    if (!updatedLoan) {
      return response.status(404).json({ error: "Loan not found" });
    }
    console.log("Loan updated successfully: ", updatedLoan);
    return response.json(updatedLoan);
  } catch (error) {
    console.log("Error updating loan: ", error);
    return response.status(500).json({ error: "Error updating loan" });
  }
};

export const destroy = async (request, response) => {
  /**
   * #swagger.tags = ['Loans']
   * #swagger.summary = 'Delete a loan by ID'
   */
  const { id } = request.params;
  try {
    const deletedLoan = await deleteLoan(id);
    if (!deletedLoan) {
      return response.status(404).json({ error: "Loan not found" });
    }
    console.log("Loan deleted successfully: ", deletedLoan);
    return response.json(deletedLoan);
  } catch (error) {
    console.log("Error deleting loan: ", error);
    return response.status(500).json({ error: "Error deleting loan" });
  }
};
