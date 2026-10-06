import { assert, describe, it } from "vitest";

import { bookSchema } from "../../src/validations/book.js";

describe("book schema", () => {
  it("accepts a valid book request body", () => {
    const result = bookSchema.safeParse({
      body: {
        title: "The Great Gatsby",
        authorId: "507f1f77bcf86cd799439011",
        isbn: "978-3-16-148410-0",
        publisher: "Scribner",
        publishedYear: 1925,
        genre: "Fiction",
        totalCopies: 10,
        availableCopies: 7,
      },
      query: {},
      params: {},
    });

    assert.equal(result.success, true);
  });

  it("accepts a book with only the required fields", () => {
    const result = bookSchema.safeParse({
      body: {
        title: "1984",
        authorId: "507f1f77bcf86cd799439011",
        isbn: "9780451524935",
      },
      query: {},
      params: {},
    });

    assert.equal(result.success, true);
  });

  it("rejects a book with a missing title", () => {
    const result = bookSchema.safeParse({
      body: {
        authorId: "507f1f77bcf86cd799439011",
        isbn: "9780451524935",
      },
      query: {},
      params: {},
    });

    assert.equal(result.success, false);
  });

  it("rejects a book with an invalid authorId", () => {
    const result = bookSchema.safeParse({
      body: {
        title: "The Great Gatsby",
        authorId: "not-an-object-id",
        isbn: "9780451524935",
      },
      query: {},
      params: {},
    });

    assert.equal(result.success, false);
  });

  it("rejects a book with an isbn that is too short", () => {
    const result = bookSchema.safeParse({
      body: {
        title: "The Great Gatsby",
        authorId: "507f1f77bcf86cd799439011",
        isbn: "123",
      },
      query: {},
      params: {},
    });

    assert.equal(result.success, false);
  });
});
