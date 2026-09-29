import { Schema } from "mongoose";

export const LoanSchema = new Schema({
  bookId: {
    type: Schema.Types.ObjectId,
    ref: "author",
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  borrowedAt: { type: Date, required: true },
  dueAt: { type: Date, required: true },
  returnedAt: Date,
});
