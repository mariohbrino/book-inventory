import { LoanSchema } from "../schemas/loans.js";
import { connection } from "../services/database.js";

const LoanModel = connection.model("Loan", LoanSchema);

export const getAllLoans = async () => {
  try {
    const loans = await LoanModel.find();
    return loans;
  } catch (error) {
    console.log("Error fetching loans: ", error);
    throw error;
  }
};

export const getLoanById = async (id) => {
  try {
    const loan = await LoanModel.findById(id);
    return loan;
  } catch (error) {
    console.log("Error fetching loan by ID: ", error);
    throw error;
  }
};

export const createLoan = async (data) => {
  return LoanModel.create(data);
};

export const updateLoan = async (id, data) => {
  return LoanModel.findByIdAndUpdate(id, data, {
    returnDocument: "after",
  });
};

export const deleteLoan = async (id) => {
  try {
    const deletedLoan = await LoanModel.findByIdAndDelete(id);
    return deletedLoan;
  } catch (error) {
    console.log("Error deleting loan: ", error);
    throw error;
  }
};
