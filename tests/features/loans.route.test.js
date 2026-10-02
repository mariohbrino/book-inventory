import request from "supertest";
import { assert, describe, it } from "vitest";

import { app } from "../../src/app.js";

describe("loan endpoints", () => {
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
