import {
  createBook,
  deleteBook,
  getAllBooks,
  getBookById,
  updateBook,
} from "../models/books.js";

export const index = async (request, response) => {
  /**
   * #swagger.tags = ['Books']
   * #swagger.description = 'Retrieve a list of all books'
   */
  void request;
  try {
    const books = await getAllBooks();
    return response.json(books);
  } catch (error) {
    console.log("Error retrieving books: ", error);
    return response.status(500).json({ error: "Error retrieving books" });
  }
};

export const show = async (request, response) => {
  /**
   * #swagger.tags = ['Books']
   * #swagger.description = 'Retrieve a single book by ID'
   */
  try {
    const { id } = request.params;
    const book = await getBookById(id);
    if (!book) {
      return response.status(404).json({ error: "Book not found" });
    }
    return response.json(book);
  } catch (error) {
    console.log("Error retrieving book: ", error);
    return response.status(500).json({ error: "Error retrieving book" });
  }
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
  try {
    const bookData = request.body;
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
  try {
    const { id } = request.params;
    const bookData = request.body;
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
  try {
    const { id } = request.params;
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
