import request from "supertest";
import { afterEach, assert, describe, it, vi } from "vitest";

import { app } from "../../src/app.js";
import { connection } from "../../src/services/database.js";

const AuthorModel = connection.model("Author");

describe("author GET endpoints", () => {
  const authorsData = [
    {
      _id: "507f1f77bcf86cd799439031",
      name: "George Orwell",
      nationality: "British",
    },
    {
      _id: "507f1f77bcf86cd799439032",
      name: "F. Scott Fitzgerald",
      nationality: "American",
    },
  ];

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("can fetch all authors", async () => {
    vi.spyOn(AuthorModel, "find").mockResolvedValue(authorsData);

    const response = await request(app).get("/authors");

    assert.equal(response.status, 200);
    assert.deepEqual(response.body, authorsData);
  });

  it("can fetch an author by ID", async () => {
    const author = authorsData[0];
    vi.spyOn(AuthorModel, "findById").mockResolvedValue(author);

    const response = await request(app).get(`/authors/${author._id}`);

    assert.equal(response.status, 200);
    assert.deepEqual(response.body, author);
  });
});

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
