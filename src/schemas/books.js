import { Schema } from "mongoose";

export const BookSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  authorId: {
    type: Schema.Types.ObjectId,
    ref: "Author",
    required: true,
  },
  isbn: {
    type: String,
    required: true,
    unique: true,
  },
  publisher: String,
  publishedYear: Number,
  genre: String,
  totalCopies: {
    type: Number,
    default: 1,
    min: 0,
  },
  availableCopies: {
    type: Number,
    default: 1,
    min: 0,
  },
});
