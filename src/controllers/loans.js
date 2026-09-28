import { getAllLoans, getLoanById } from "../models/loans.js";

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
