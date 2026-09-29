import { BookSchema } from "../schemas/books.js";
import { connection } from "../services/database.js";

const BookModel = connection.model("Book", BookSchema);

export const getAllBooks = async () => {
  try {
    const books = await BookModel.find();
    return books;
  } catch (error) {
    console.log("Error fetching books: ", error);
    throw error;
  }
};

export const getBookById = async (id) => {
  try {
    const book = await BookModel.findById(id);
    return book;
  } catch (error) {
    console.log("Error fetching book by ID: ", error);
    throw error;
  }
};

export const createBook = async (data) => {
  try {
    const newBook = await BookModel.create(data);
    return newBook;
  } catch (error) {
    console.log("Error creating book: ", error);
    throw error;
  }
};

export const updateBook = async (id, data) => {
  try {
    const updatedBook = await BookModel.findByIdAndUpdate(id, data, {
      new: true,
    });
    return updatedBook;
  } catch (error) {
    console.log("Error updating book: ", error);
    throw error;
  }
};

export const deleteBook = async (id) => {
  try {
    const deletedBook = await BookModel.findByIdAndDelete(id);
    return deletedBook;
  } catch (error) {
    console.log("Error deleting book: ", error);
    throw error;
  }
};
