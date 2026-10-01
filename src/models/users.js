import { UserSchema } from "../schemas/users.js";
import { connection } from "../services/database.js";

const UserModel = connection.model("User", UserSchema);

const withoutPassword = (user) => {
  if (!user) {
    return user;
  }

  const userData = user.toObject ? user.toObject() : { ...user };
  delete userData.password;
  return userData;
};

export const getAllUsers = async () => {
  try {
    const users = await UserModel.find().select("-password");
    return users.map(withoutPassword);
  } catch (error) {
    console.log("Error fetching users: ", error);
    throw error;
  }
};

export const getUserById = async (id) => {
  try {
    const user = await UserModel.findById(id).select("-password");
    return withoutPassword(user);
  } catch (error) {
    console.log("Error fetching user by ID: ", error);
    throw error;
  }
};

export const createUser = async (data) => {
  try {
    const newUser = await UserModel.create(data);
    return withoutPassword(newUser);
  } catch (error) {
    console.log("Error creating user: ", error);
    throw error;
  }
};

export const updateUser = async (id, data) => {
  try {
    const updatedUser = await UserModel.findByIdAndUpdate(id, data, {
      new: true,
    }).select("-password");
    return withoutPassword(updatedUser);
  } catch (error) {
    console.log("Error updating user: ", error);
    throw error;
  }
};

export const deleteUser = async (id) => {
  try {
    const deletedUser =
      await UserModel.findByIdAndDelete(id).select("-password");
    return withoutPassword(deletedUser);
  } catch (error) {
    console.log("Error deleting user: ", error);
    throw error;
  }
};
