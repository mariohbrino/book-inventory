import {
  createUser as createUserRecord,
  deleteUser as deleteUserRecord,
  getUserById as getUserRecordById,
  getAllUsers as getUserRecords,
  updateUser as updateUserRecord,
} from "../models/users.js";

export const index = async (request, response) => {
  /**
   * #swagger.tags = ['Users']
   * #swagger.summary = 'Retrieve a list of all users'
   */
  try {
    const users = await getUserRecords();
    return response.json(users);
  } catch (error) {
    console.log("Error fetting users: ", error);
    return response.status(500).json({ error: "Error fetching users" });
  }
};

export const store = async (request, response) => {
  /**
   * #swagger.tags = ['Users']
   * #swagger.summary = 'Create a new user'
   * #swagger.requestBody = {
      description: 'User creation payload',
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            required: ['username', 'email', 'password', 'role'],
            properties: {
              username: {
                type: 'string',
                example: 'johndoe'
              },
              email: {
                type: 'string',
                example: 'johndoe@example.com'
              },
              password: {
                type: 'string',
                example: 'password123'
              },
              age: {
                type: 'integer',
                example: 30
              },
              role: {
                type: 'string',
                example: 'user'
              }
            }
          }
        }
      }
    }
   */
  try {
    const newUser = await createUserRecord(request.body);
    return response.status(201).json(newUser);
  } catch (error) {
    console.log("Error creating user: ", error);
    return response.status(500).json({ error: "Error creating user" });
  }
};

export const show = async (request, response) => {
  /**
   * #swagger.tags = ['Users']
   * #swagger.summary = 'Retrieve a single user by ID'
   */
  try {
    const { id } = request.params;
    const user = await getUserRecordById(id);
    if (!user) {
      return response.status(404).json({ error: "User not found" });
    }
    return response.json(user);
  } catch (error) {
    console.log("Error retrieving user: ", error);
    return response.status(500).json({ error: "Error retrieving user" });
  }
};

export const update = async (request, response) => {
  /**
   * #swagger.tags = ['Users']
   * #swagger.summary = 'Update an existing user by ID'
   * #swagger.requestBody = {
      description: 'User update payload',
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            required: ['username', 'email', 'password', 'role'],
            properties: {
              username: {
                type: 'string',
                example: 'johndoe'
              },
              email: {
                type: 'string',
                example: 'johndoe@example.com'
              },
              password: {
                type: 'string',
                example: 'password123'
              },
              age: {
                type: 'integer',
                example: 30
              },
              role: {
                type: 'string',
                example: 'user'
              }
            }
          }
        }
      }
    }
   */
  try {
    const { id } = request.params;
    const updatedUser = await updateUserRecord(id, request.body);
    if (!updatedUser) {
      return response.status(404).json({ error: "User not found" });
    }
    return response.json(updatedUser);
  } catch (error) {
    console.log("Error updating user: ", error);
    return response.status(500).json({ error: "Error updating user" });
  }
};

export const destroy = async (request, response) => {
  /**
   * #swagger.tags = ['Users']
   * #swagger.summary = 'Delete an existing user by ID'
   */
  try {
    const { id } = request.params;
    const deletedUser = await deleteUserRecord(id);
    if (!deletedUser) {
      return response.status(404).json({ error: "User not found" });
    }
    console.log("User deleted successfully: ", deletedUser);
    return response.json(deletedUser);
  } catch (error) {
    console.log("Error deleting user: ", error);
    return response.status(500).json({ error: "Error deleting user" });
  }
};
