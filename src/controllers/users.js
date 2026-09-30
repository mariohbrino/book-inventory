import {
  createUser as createUserRecord,
  deleteUser as deleteUserRecord,
  getUserById as getUserRecordById,
  getAllUsers as getUserRecords,
  updateUser as updateUserRecord,
} from "../models/users.js";

export const getUsers = async (request, response) => {
  try {
    const users = await getUserRecords();
    return response.json(users);
  } catch (error) {
    console.log("Error fetting users: ", error);
    return response.status(500).json({ error: "Error fetching users" });
  }
};

export const createUser = async (request, response) => {
  try {
    const newUser = await createUserRecord(request.body);
    return response.status(201).json(newUser);
  } catch (error) {
    console.log("Error creating user: ", error);
    return response.status(500).json({ error: "Error creating user" });
  }
};

export const getUserById = async (request, response) => {
  const { id } = request.params;
  const user = await getUserRecordById(id);
  if (!user) {
    return response.status(404).json({ error: "User not found" });
  }
  return response.json(user);
};

export const updateUser = async (request, response) => {
  const { id } = request.params;
  try {
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

export const deleteUser = async (request, response) => {
  const { id } = request.params;
  try {
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
