import request from "supertest";
import { assert, describe, it } from "vitest";

import { app } from "../../src/app.js";

describe("book endpoints", () => {
  it("rejects an invalid book ID on GET by ID", async () => {
    const response = await request(app).get("/books/invalid-id");

    assert.equal(response.status, 400);
    assert.ok(response.body.errors.some((issue) => issue.path.includes("id")));
  });

  it("rejects an invalid book ID on update", async () => {
    const response = await request(app).put("/books/invalid-id").send({});

    assert.equal(response.status, 400);
    assert.ok(response.body.errors.some((issue) => issue.path.includes("id")));
  });

  it("rejects an invalid book ID on DELETE", async () => {
    const response = await request(app).delete("/books/invalid-id");

    assert.equal(response.status, 400);
    assert.ok(response.body.errors.some((issue) => issue.path.includes("id")));
  });
});
