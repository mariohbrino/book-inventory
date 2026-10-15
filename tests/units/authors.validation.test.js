import { assert, describe, it } from "vitest";

import { createAuthorSchema } from "../../src/validations/author.js";

describe("author schema", () => {
  it("accepts a valid author request body", () => {
    const result = createAuthorSchema.safeParse({
      body: {
        name: "George Orwell",
        birthDate: "1903-06-25",
        nationality: "British",
        biography: "English novelist and essayist.",
      },
      query: {},
      params: {},
    });

    assert.equal(result.success, true);
  });

  it("accepts an author with only the required name field", () => {
    const result = createAuthorSchema.safeParse({
      body: {
        name: "Aldous Huxley",
      },
      query: {},
      params: {},
    });

    assert.equal(result.success, true);
  });

  it("rejects an author with a missing name", () => {
    const result = createAuthorSchema.safeParse({
      body: {
        nationality: "British",
      },
      query: {},
      params: {},
    });

    assert.equal(result.success, false);
  });

  it("rejects an author with a name that is too short", () => {
    const result = createAuthorSchema.safeParse({
      body: {
        name: "A",
      },
      query: {},
      params: {},
    });

    assert.equal(result.success, false);
  });
});
