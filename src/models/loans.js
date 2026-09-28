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
