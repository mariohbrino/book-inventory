import { assert, describe, it } from "vitest";

import { createUserSchema } from "../../src/validations/user.js";

describe("user schema", () => {
  it("accepts a valid user request body", () => {
    const result = createUserSchema.safeParse({
      body: {
        username: "johndoe",
        email: "john@example.com",
        password: "securepassword123",
        role: "user",
      },
      query: {},
      params: {},
    });

    assert.equal(result.success, true);
  });

  it("rejects an invalid email format", () => {
    const result = createUserSchema.safeParse({
      body: {
        username: "johndoe",
        email: "not-an-email",
        password: "securepassword123",
        role: "user",
      },
      query: {},
      params: {},
    });

    assert.equal(result.success, false);
  });
});
