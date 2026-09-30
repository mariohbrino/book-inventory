import { z } from "zod";

import {
  createBook,
  deleteBook,
  getAllBooks,
  getBookById,
  updateBook,
} from "../models/books.js";

const objectIdSchema = z.string().regex(/^[0-9a-f]{24}$/i, "Invalid ObjectId");

export const bookSchema = z.object({
  body: z.object({
    title: z.string().min(1),
    authorId: objectIdSchema,
    isbn: z.string().min(10),
    publisher: z.string().optional(),
    publishedYear: z.coerce.number().int().optional(),
    genre: z.string().optional(),
    totalCopies: z.coerce.number().int().min(0).optional(),
    availableCopies: z.coerce.number().int().min(0).optional(),
  }),
});

export const index = async (request, response) => {
  /**
   * #swagger.tags = ['Books']
   * #swagger.description = 'Retrieve a list of all books'
   */
  void request;
  const books = await getAllBooks();
  return response.json(books);
};

export const show = async (request, response) => {
  /**
   * #swagger.tags = ['Books']
   * #swagger.description = 'Retrieve a single book by ID'
   */
  const { id } = request.params;
  const book = await getBookById(id);
  if (!book) {
    return response.status(404).json({ error: "Book not found" });
  }
  return response.json(book);
};

export const store = async (request, response) => {
  /**
   * #swagger.tags = ['Books']
   * #swagger.description = 'Create a new book'
   * #swagger.requestBody = {
      description: 'Book creation payload',
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            required: ['title', 'authorId', 'isbn'],
            properties: {
              title: {
                type: 'string',
                example: 'The Great Gatsby'
              },
              authorId: {
                type: 'string',
                example: '1234567890abcdef12345678'
              },
              isbn: {
                type: 'string',
                example: '978-3-16-148410-0'
              },
              publisher: {
                type: 'string',
                example: 'Scribner'
              },
              publishedYear: {
                type: 'integer',
                example: 1925
              },
              genre: {
                type: 'string',
                example: 'Fiction'
              },
              totalCopies: {
                type: 'integer',
                example: 10
              },
              availableCopies: {
                type: 'integer',
                example: 7
              }
            }
          }
        }
      }
    }
   */
  const bookData = request.body;
  try {
    const newBook = await createBook(bookData);
    console.log("Book created successfully: ", newBook);
    return response.status(201).json(newBook);
  } catch (error) {
    console.log("Error creating book: ", error);
    return response.status(500).json({ error: "Error creating book" });
  }
};

export const update = async (request, response) => {
  /**
   * #swagger.tags = ['Books']
   * #swagger.description = 'Update an existing book by ID'
   * #swagger.requestBody = {
      description: 'Book update payload',
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            required: ['title', 'authorId', 'isbn'],
            properties: {
              title: {
                type: 'string',
                example: 'The Great Gatsby'
              },
              authorId: {
                type: 'string',
                example: '1234567890abcdef12345678'
              },
              isbn: {
                type: 'string',
                example: '978-3-16-148410-0'
              },
              publisher: {
                type: 'string',
                example: 'Scribner'
              },
              publishedYear: {
                type: 'integer',
                example: 1925
              },
              genre: {
                type: 'string',
                example: 'Fiction'
              },
              totalCopies: {
                type: 'integer',
                example: 10
              },
              availableCopies: {
                type: 'integer',
                example: 7
              }
            }
          }
        }
      }
    }
   */
  const { id } = request.params;
  const bookData = request.body;
  try {
    const updatedBook = await updateBook(id, bookData);
    if (!updatedBook) {
      return response.status(404).json({ error: "Book not found" });
    }
    console.log("Book updated successfully: ", updatedBook);
    return response.json(updatedBook);
  } catch (error) {
    console.log("Error updating book: ", error);
    return response.status(500).json({ error: "Error updating book" });
  }
};

export const destroy = async (request, response) => {
  /**
   * #swagger.tags = ['Books']
   * #swagger.description = 'Delete an existing book by ID'
   */
  const { id } = request.params;
  try {
    const deletedBook = await deleteBook(id);
    if (!deletedBook) {
      return response.status(404).json({ error: "Book not found" });
    }
    console.log("Book deleted successfully: ", deletedBook);
    return response.json(deletedBook);
  } catch (error) {
    console.log("Error deleting book: ", error);
    return response.status(500).json({ error: "Error deleting book" });
  }
};
