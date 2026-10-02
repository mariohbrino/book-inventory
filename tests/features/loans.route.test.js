import mockingoose from "mockingoose";
import mongoose from "mongoose";
import request from "supertest";
import { afterEach, assert, beforeEach, describe, it, vi } from "vitest";

import { app } from "../../src/app.js";
import { LoanModel } from "../../src/models/loans.js";

describe("loan endpoints", () => {
  const loansData = [
    {
      _id: "507f1f77bcf86cd799439015",
      bookId: "507f1f77bcf86cd799439011",
      userId: "507f1f77bcf86cd799439012",
      borrowedAt: "2026-09-28T10:00:00.000Z",
      dueAt: "2026-10-05T10:00:00.000Z",
    },
    {
      _id: "507f1f77bcf86cd799439016",
      bookId: "507f1f77bcf86cd799439013",
      userId: "507f1f77bcf86cd799439014",
      borrowedAt: "2026-09-29T10:00:00.000Z",
      dueAt: "2026-10-06T10:00:00.000Z",
    },
    {
      _id: "507f1f77bcf86cd799439017",
      bookId: "507f1f77bcf86cd799439015",
      userId: "507f1f77bcf86cd799439016",
      borrowedAt: "2026-09-30T10:00:00.000Z",
      dueAt: "2026-10-07T10:00:00.000Z",
    },
  ];

  beforeEach(() => {
    mongoose.model(LoanModel.modelName, LoanModel.schema);
    mockingoose.resetAll();
    vi.clearAllMocks();
  });

  afterEach(() => {
    mockingoose.resetAll();
    mongoose.deleteModel(LoanModel.modelName);
  });

  it("can load all loans", async () => {
    mockingoose(LoanModel).toReturn(loansData, "find");

    const response = await request(app).get("/loans");
    assert.equal(response.status, 200);
    assert.equal(response.body.length, 3);
    assert.deepEqual(response.body, loansData);
  });

  it("can load a loan by ID", async () => {
    const loan = loansData[0];
    mockingoose(LoanModel).toReturn(loan, "findOne");

    const response = await request(app).get(`/loans/${loan._id}`);
    assert.equal(response.status, 200);
    assert.deepEqual(response.body, loan);
  });
});

describe("loan endpoints exceptions", () => {
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
