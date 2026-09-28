import { Schema } from "mongoose";

export const LoanSchema = new Schema({
  bookId: {
    type: Schema.Types.ObjectId,
    ref: "author",
    require: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "user",
    require: true,
  },
  borrowedAt: Date,
  dueAt: Date,
  returnedAt: Date,
});
