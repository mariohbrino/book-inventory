import { assert, describe, it } from "vitest";

import { loanSchema } from "../../src/validations/loan.js";

describe("loan schema", () => {
  it("accepts a valid loan request envelope", () => {
    const result = loanSchema.safeParse({
      body: {
        bookId: "507f1f77bcf86cd799439011",
        userId: "507f1f77bcf86cd799439012",
        borrowedAt: "2026-09-28T10:00:00.000Z",
        dueAt: "2026-10-05T10:00:00.000Z",
      },
      query: {},
      params: {},
    });

    assert.equal(result.success, true);
  });
});
