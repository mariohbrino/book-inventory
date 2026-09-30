import { Schema } from "mongoose";

export const LoanSchema = new Schema({
  bookId: {
    type: Schema.Types.ObjectId,
    ref: "Author",
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  borrowedAt: { type: Date, required: true },
  dueAt: { type: Date, required: true },
  returnedAt: Date,
});
