import { LoanSchema } from "../schemas/loans.js";
import { connection } from "../services/database.js";

const LoanModel = connection.model("Loan", LoanSchema);

export const getAllLoans = async () => {
  try {
    const loans = await LoanModel.find();
    return loans;
  } catch (error) {
    console.log("Error fetching loans: ", error);
  }
};

export const getLoanById = async (id) => {
  try {
    const loan = await LoanModel.findById(id);
    return loan;
  } catch (error) {
    console.log("Error fetching loan by ID: ", error);
  }
};

export const createLoan = async (data) => {
  try {
    const newLoan = await LoanModel.create(data);
    return newLoan;
  } catch (error) {
    console.log("Error creating loan: ", error);
  }
};
