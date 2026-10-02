import request from "supertest";
import { assert, describe, it } from "vitest";

import { app } from "../../src/app.js";

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
    const response = await request(app)
      .put("/authors/invalid-id")
      .send({
        name: "George Orwell",
      });

    assert.equal(response.status, 400);
    assert.ok(response.body.errors.some((issue) => issue.path.includes("id")));
  });
});