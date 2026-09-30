import { UserSchema } from "../schemas/users.js";
import { connection } from "../services/database.js";

const UserModel = connection.model("User", UserSchema);

export const getUserById = async (id) => {
  try {
    const user = await UserModel.findById(id);
    return user;
  } catch (error) {
    console.log("Error fetching user by ID: ", error);
    throw error;
  }
};

export const createUser = async (data) => {
  try {
    const newUser = await UserModel.create(data);
    return newUser;
  } catch (error) {
    console.log("Error creating user: ", error);
    throw error;
  }
};

export const updateUser = async (id, data) => {
  try {
    const updatedUser = await UserModel.findByIdAndUpdate(id, data, {
      new: true,
    });
    return updatedUser;
  } catch (error) {
    console.log("Error updating user: ", error);
    throw error;
  }
};
