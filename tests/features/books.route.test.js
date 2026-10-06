import mockingoose from "mockingoose";
import mongoose from "mongoose";
import request from "supertest";
import { afterEach, assert, beforeEach, describe, it, vi } from "vitest";

import { app } from "../../src/app.js";
import { BookModel } from "../../src/models/books.js";

describe("book endpoints", () => {
  it("rejects book creation with missing required fields", async () => {
    const response = await request(app).post("/books").send({
      title: "The Great Gatsby",
    });

    assert.equal(response.status, 400);
    assert.ok(response.body.errors.length > 0);
  });

  it("rejects book creation with an invalid authorId format", async () => {
    const response = await request(app).post("/books").send({
      title: "The Great Gatsby",
      authorId: "not-an-object-id",
      isbn: "978-3-16-148410-0",
    });

    assert.equal(response.status, 400);
    assert.ok(
      response.body.errors.some((issue) => issue.path.includes("authorId")),
    );
  });

  it("rejects book creation with an isbn that is too short", async () => {
    const response = await request(app).post("/books").send({
      title: "The Great Gatsby",
      authorId: "507f1f77bcf86cd799439011",
      isbn: "123",
    });

    assert.equal(response.status, 400);
    assert.ok(
      response.body.errors.some((issue) => issue.path.includes("isbn")),
    );
  });

  it("rejects an invalid book ID format on GET by ID", async () => {
    const response = await request(app).get("/books/invalid-id");

    assert.equal(response.status, 400);
    assert.ok(response.body.errors.some((issue) => issue.path.includes("id")));
  });

  it("rejects an invalid book ID format on DELETE", async () => {
    const response = await request(app).delete("/books/invalid-id");

    assert.equal(response.status, 400);
    assert.ok(response.body.errors.some((issue) => issue.path.includes("id")));
  });

  it("rejects an invalid book ID format on PUT", async () => {
    const response = await request(app).put("/books/invalid-id").send({
      title: "The Great Gatsby",
      authorId: "507f1f77bcf86cd799439011",
      isbn: "978-3-16-148410-0",
    });

    assert.equal(response.status, 400);
    assert.ok(response.body.errors.some((issue) => issue.path.includes("id")));
  });
});

describe("book endpoints happy path", () => {
  const booksData = [
    {
      _id: "507f1f77bcf86cd799439011",
      title: "The Great Gatsby",
      authorId: "507f1f77bcf86cd799439021",
      isbn: "978-3-16-148410-0",
    },
    {
      _id: "507f1f77bcf86cd799439012",
      title: "1984",
      authorId: "507f1f77bcf86cd799439022",
      isbn: "978-0-451-52493-5",
    },
  ];

  beforeEach(() => {
    mongoose.model(BookModel.modelName, BookModel.schema);
    mockingoose.resetAll();
    vi.clearAllMocks();
  });

  afterEach(() => {
    mockingoose.resetAll();
    mongoose.deleteModel(BookModel.modelName);
  });

  it("can fetch all books", async () => {
    mockingoose(BookModel).toReturn(booksData, "find");

    const response = await request(app).get("/books");
    assert.equal(response.status, 200);
    assert.equal(response.body.length, 2);
  });

  it("can fetch a book by ID", async () => {
    const book = booksData[0];
    mockingoose(BookModel).toReturn(book, "findOne");

    const response = await request(app).get(`/books/${book._id}`);
    assert.equal(response.status, 200);
    assert.equal(response.body.title, book.title);
  });
});
