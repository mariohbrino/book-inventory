import { createLoan, getAllLoans, getLoanById } from "../models/loans.js";

export const index = async (request, response) => {
  void request;
  const loans = await getAllLoans();
  return response.json(loans);
};

export const show = async (request, response) => {
  const { id } = request.params;
  const loan = await getLoanById(id);
  if (!loan) {
    return response.status(404).json({ error: "Loan not found" });
  }
  return response.json(loan);
};

export const store = async (request, response) => {
  const loanData = request.body;
  try {
    const newLoan = await createLoan(loanData);
    return response.status(201).json(newLoan);
  } catch (error) {
    console.log("Error creating loan: ", error);
    return response.status(500).json({ error: "Error creating loan" });
  }
};
