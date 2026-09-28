import { getAllLoans } from "../models/loans.js";

export const index = async (request, response) => {
  void request;
  const loans = await getAllLoans();
  return response.json(loans);
};
