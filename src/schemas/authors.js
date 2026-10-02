import { Schema } from "mongoose";

export const AuthorSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  birthDate: {
    type: Date,
  },
  nationality: {
    type: String,
  },
  biography: {
    type: String,
  },
});
