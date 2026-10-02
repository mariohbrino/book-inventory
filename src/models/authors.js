import { AuthorSchema } from "../schemas/authors.js";
import { connection } from "../services/database.js";

const AuthorModel = connection.model("Author", AuthorSchema);

export const getAllAuthors = async () => {
  try {
    const authors = await AuthorModel.find();
    return authors;
  } catch (error) {
    console.log("Error fetching authors: ", error);
    throw error;
  }
};

export const getAuthorById = async (id) => {
  try {
    const author = await AuthorModel.findById(id);
    return author;
  } catch (error) {
    console.log("Error fetching author by ID: ", error);
    throw error;
  }
};

export const createAuthor = async (data) => {
  try {
    const newAuthor = await AuthorModel.create(data);
    return newAuthor;
  } catch (error) {
    console.log("Error creating author: ", error);
    throw error;
  }
};

export const updateAuthor = async (id, data) => {
  try {
    const updatedAuthor = await AuthorModel.findByIdAndUpdate(id, data, {
      returnDocument: "after",
    });
    return updatedAuthor;
  } catch (error) {
    console.log("Error updating author: ", error);
    throw error;
  }
};

export const deleteAuthor = async (id) => {
  try {
    const deletedAuthor = await AuthorModel.findByIdAndDelete(id);
    return deletedAuthor;
  } catch (error) {
    console.log("Error deleting author: ", error);
    throw error;
  }
};