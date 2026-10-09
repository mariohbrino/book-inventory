import mockingoose from "mockingoose";
import mongoose from "mongoose";
import request from "supertest";
import { afterEach, assert, beforeEach, describe, it, vi } from "vitest";

import { app } from "../../src/app.js";
import { AuthorModel } from "../../src/models/authors.js";

describe("author endpoints", () => {
  it("rejects author creation with missing required fields", async () => {
    const response = await request(app).post("/authors").send({});

    assert.equal(response.status, 400);
    assert.ok(response.body.errors.length > 0);
  });

  it("rejects author creation with a name that is too short", async () => {
    const response = await request(app).post("/authors").send({
      name: "A",
    });

    assert.equal(response.status, 400);
    assert.ok(
      response.body.errors.some((issue) => issue.path.includes("name")),
    );
  });

  it("rejects an invalid author ID format on GET by ID", async () => {
    const response = await request(app).get("/authors/invalid-id");

    assert.equal(response.status, 400);
    assert.ok(response.body.errors.some((issue) => issue.path.includes("id")));
  });

  it("rejects an invalid author ID format on DELETE", async () => {
    const response = await request(app).delete("/authors/invalid-id");

    assert.equal(response.status, 400);
    assert.ok(response.body.errors.some((issue) => issue.path.includes("id")));
  });

  it("rejects an invalid author ID format on PUT", async () => {
    const response = await request(app).put("/authors/invalid-id").send({
      name: "George Orwell",
    });

    assert.equal(response.status, 400);
    assert.ok(response.body.errors.some((issue) => issue.path.includes("id")));
  });
});

describe("author endpoints happy path", () => {
  const authorsData = [
    {
      _id: "507f1f77bcf86cd799439011",
      name: "George Orwell",
      nationality: "British",
    },
    {
      _id: "507f1f77bcf86cd799439012",
      name: "Aldous Huxley",
      nationality: "British",
    },
  ];

  beforeEach(() => {
    mongoose.model(AuthorModel.modelName, AuthorModel.schema);
    mockingoose.resetAll();
    vi.clearAllMocks();
  });

  afterEach(() => {
    mockingoose.resetAll();
    mongoose.deleteModel(AuthorModel.modelName);
  });

  it("can fetch all authors", async () => {
    mockingoose(AuthorModel).toReturn(authorsData, "find");

    const response = await request(app).get("/authors");
    assert.equal(response.status, 200);
    assert.equal(response.body.length, 2);
  });

  it("can fetch an author by ID", async () => {
    const author = authorsData[0];
    mockingoose(AuthorModel).toReturn(author, "findOne");

    const response = await request(app).get(`/authors/${author._id}`);
    assert.equal(response.status, 200);
    assert.equal(response.body.name, author.name);
  });
});
