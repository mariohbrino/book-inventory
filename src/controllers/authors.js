import {
  createAuthor as createAuthorRecord,
  deleteAuthor as deleteAuthorRecord,
  getAuthorById as getAuthorRecordById,
  getAllAuthors as getAuthorRecords,
  updateAuthor as updateAuthorRecord,
} from "../models/authors.js";

export const index = async (request, response) => {
  /**
   * #swagger.tags = ['Authors']
   * #swagger.summary = 'Retrieve a list of all authors'
   */
  try {
    const authors = await getAuthorRecords();
    return response.json(authors);
  } catch (error) {
    console.log("Error fetching authors: ", error);
    return response.status(500).json({ error: "Error fetching authors" });
  }
};

export const store = async (request, response) => {
  /**
   * #swagger.tags = ['Authors']
   * #swagger.summary = 'Create a new author'
   * #swagger.requestBody = {
      description: 'Author creation payload',
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            required: ['name'],
            properties: {
              name: {
                type: 'string',
                example: 'George Orwell'
              },
              birthDate: {
                type: 'string',
                format: 'date',
                example: '1903-06-25'
              },
              nationality: {
                type: 'string',
                example: 'British'
              },
              biography: {
                type: 'string',
                example: 'English novelist and essayist.'
              }
            }
          }
        }
      }
    }
   */
  try {
    const newAuthor = await createAuthorRecord(request.body);
    return response
      .status(201)
      .json({ message: "Author created successfully", data: newAuthor });
  } catch (error) {
    console.log("Error creating author: ", error);
    return response.status(500).json({ error: "Error creating author" });
  }
};

export const show = async (request, response) => {
  /**
   * #swagger.tags = ['Authors']
   * #swagger.summary = 'Retrieve a single author by ID'
   */
  try {
    const { id } = request.params;
    const author = await getAuthorRecordById(id);

    if (!author) {
      return response.status(404).json({ error: "Author not found" });
    }

    return response.json(author);
  } catch (error) {
    console.log("Error retrieving author: ", error);
    return response.status(500).json({ error: "Error retrieving author" });
  }
};

export const update = async (request, response) => {
  /**
   * #swagger.tags = ['Authors']
   * #swagger.summary = 'Update an existing author by ID'
   * #swagger.requestBody = {
      description: 'Author update payload',
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              name: {
                type: 'string',
                example: 'George Orwell'
              },
              birthDate: {
                type: 'string',
                format: 'date',
                example: '1903-06-25'
              },
              nationality: {
                type: 'string',
                example: 'British'
              },
              biography: {
                type: 'string',
                example: 'English novelist and essayist.'
              }
            }
          }
        }
      }
    }
   */
  try {
    const { id } = request.params;
    const updatedAuthor = await updateAuthorRecord(id, request.body);

    if (!updatedAuthor) {
      return response.status(404).json({ error: "Author not found" });
    }

    return response.json({
      message: "Author updated successfully",
      data: updatedAuthor,
    });
  } catch (error) {
    console.log("Error updating author: ", error);
    return response.status(500).json({ error: "Error updating author" });
  }
};

export const destroy = async (request, response) => {
  /**
   * #swagger.tags = ['Authors']
   * #swagger.summary = 'Delete an existing author by ID'
   */
  try {
    const { id } = request.params;
    const deletedAuthor = await deleteAuthorRecord(id);

    if (!deletedAuthor) {
      return response.status(404).json({ error: "Author not found" });
    }

    return response.json({
      message: "Author deleted successfully",
      data: deletedAuthor,
    });
  } catch (error) {
    console.log("Error deleting author: ", error);
    return response.status(500).json({ error: "Error deleting author" });
  }
};
