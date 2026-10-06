import { Schema } from "mongoose";

export const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: false,
  },
  provider: {
    type: String,
    default: "local",
  },
  auth0Id: {
    type: String,
  },
  age: {
    type: Number,
  },
  role: {
    type: String,
    required: true,
  },
});
