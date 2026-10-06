import { UserSchema } from "../schemas/users.js";
import { connection } from "../services/database.js";

const UserModel = connection.model("User", UserSchema);

const userProfileFields = {
  username: true,
  email: true,
  age: true,
  role: true,
};

export const getAllUsers = async () => {
  try {
    const users = await UserModel.find({}, userProfileFields);
    return users;
  } catch (error) {
    console.log("Error fetching users: ", error);
    throw error;
  }
};

export const getUserById = async (id) => {
  try {
    const user = await UserModel.findById(id, userProfileFields);
    return user;
  } catch (error) {
    console.log("Error fetching user by ID: ", error);
    throw error;
  }
};

export const getUserByEmail = async (email) => {
  try {
    const user = await UserModel.findOne({ email }, userProfileFields);
    return user;
  } catch (error) {
    console.log("Error fetching user by email: ", error);
    throw error;
  }
};

export const createUser = async (data) => {
  try {
    const newUser = await UserModel.create(data);
    const user = newUser.toObject();
    delete user.password;
    return user;
  } catch (error) {
    console.log("Error creating user: ", error);
    throw error;
  }
};

export const updateUser = async (id, data) => {
  try {
    const updatedUser = await UserModel.findByIdAndUpdate(id, data, {
      returnDocument: "after",
      projection: userProfileFields,
    });
    return updatedUser;
  } catch (error) {
    console.log("Error updating user: ", error);
    throw error;
  }
};

export const deleteUser = async (id) => {
  try {
    const deletedUser = await UserModel.findByIdAndDelete(id, {
      projection: userProfileFields,
    });
    const user = deletedUser.toObject();
    delete user.password;
    return user;
  } catch (error) {
    console.log("Error deleting user: ", error);
    throw error;
  }
};
