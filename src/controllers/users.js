import {
  createUser as createUserRecord,
  deleteUser as deleteUserRecord,
  getAllUsers as getAllUserRecords,
  getUserById as getUserRecordById,
  updateUser as updateUserRecord,
} from "../models/users.js";

export const getAllUsers = async (request, response) => {
  void request;
  try {
    const users = await getAllUserRecords();
    return response.json(users);
  } catch (error) {
    console.log("Error fetching users: ", error);
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
  try {
    const user = await getUserRecordById(id);
    if (!user) {
      return response.status(404).json({ error: "User not found" });
    }
    return response.json(user);
  } catch (error) {
    console.log("Error fetching user: ", error);
    return response.status(500).json({ error: "Error fetching user" });
  }
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
    return response.json(deletedUser);
  } catch (error) {
    console.log("Error deleting user: ", error);
    return response.status(500).json({ error: "Error deleting user" });
  }
};
