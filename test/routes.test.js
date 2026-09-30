import assert from "node:assert/strict";
import { describe, it } from "node:test";

import request from "supertest";

import { app } from "../src/app.js";
import { loanSchema } from "../src/controllers/loans.js";

describe("GET routes", () => {
  it("gets the home page", async () => {
    const response = await request(app).get("/");

    assert.equal(response.status, 200);
    assert.deepEqual(response.body, {
      message: "Welcome to the home page!",
    });
  });

  // The /books route now reads from MongoDB instead of returning a fixed
  // placeholder, so this assertion needs a database connection. Dedicated
  // book tests are planned as a separate task (see project board, Week 07).
  it.skip("gets all books", async () => {
    const response = await request(app).get("/books");

    assert.equal(response.status, 200);
    assert.ok(Array.isArray(response.body));
  });
});

describe("loan input validation", () => {
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

  it("rejects an invalid userId before persistence", async () => {
    const response = await request(app).post("/loans").send({
      bookId: "507f1f77bcf86cd799439011",
      userId: "not-an-object-id",
      borrowedAt: "2026-09-28T10:00:00.000Z",
      dueAt: "2026-10-05T10:00:00.000Z",
    });

    assert.equal(response.status, 400);
    assert.ok(
      response.body.errors.some((issue) => issue.path.includes("userId")),
    );
  });

  it("rejects missing required loan fields", async () => {
    const response = await request(app).post("/loans").send({
      bookId: "507f1f77bcf86cd799439011",
      userId: "507f1f77bcf86cd799439012",
    });

    assert.equal(response.status, 400);
    assert.ok(response.body.errors.length > 0);
  });

  it("rejects unexpected fields", async () => {
    const response = await request(app).post("/loans").send({
      bookId: "507f1f77bcf86cd799439011",
      userId: "507f1f77bcf86cd799439012",
      borrowedAt: "2026-09-28T10:00:00.000Z",
      dueAt: "2026-10-05T10:00:00.000Z",
      admin: true,
    });

    assert.equal(response.status, 400);
  });

  it("rejects a due date before the borrowed date", async () => {
    const response = await request(app).post("/loans").send({
      bookId: "507f1f77bcf86cd799439011",
      userId: "507f1f77bcf86cd799439012",
      borrowedAt: "2026-09-28T10:00:00.000Z",
      dueAt: "2026-09-27T10:00:00.000Z",
    });

    assert.equal(response.status, 400);
    assert.ok(
      response.body.errors.some((issue) => issue.path.includes("dueAt")),
    );
  });

  it("rejects an invalid loan id on get-by-id", async () => {
    const response = await request(app).get("/loans/not-an-object-id");

    assert.equal(response.status, 400);
  });

  it("rejects an invalid loan id on update", async () => {
    const response = await request(app).put("/loans/not-an-object-id").send({
      bookId: "507f1f77bcf86cd799439011",
      userId: "507f1f77bcf86cd799439012",
      borrowedAt: "2026-09-28T10:00:00.000Z",
      dueAt: "2026-10-05T10:00:00.000Z",
    });

    assert.equal(response.status, 400);
  });

  it("rejects an invalid loan id on delete", async () => {
    const response = await request(app).delete("/loans/not-an-object-id");

    assert.equal(response.status, 400);
  });
});
