import request from "supertest";
import { assert, describe, it } from "vitest";

import { app } from "../../src/app.js";

describe("user endpoints", () => {
  it("rejects user creation with missing required fields", async () => {
    const response = await request(app).post("/users").send({
      username: "johndoe",
    });

    assert.equal(response.status, 400);
    assert.ok(response.body.errors.length > 0);
  });

  it("rejects user creation with a password that is too short", async () => {
    const response = await request(app).post("/users").send({
      username: "johndoe",
      email: "john@example.com",
      password: "123", // Short password
      role: "user",
    });

    assert.equal(response.status, 400);
    assert.ok(
      response.body.errors.some((issue) => issue.path.includes("password")),
    );
  });

  it("rejects an invalid user ID format on GET by ID", async () => {
    const response = await request(app).get("/users/invalid-id");

    assert.equal(response.status, 400);
    assert.ok(response.body.errors.some((issue) => issue.path.includes("id")));
  });

  it("rejects invalid update fields on PUT /users/:id", async () => {
    const response = await request(app)
      .put("/users/507f1f77bcf86cd799439012")
      .send({
        email: "invalid-email-format",
      });

    assert.equal(response.status, 400);
    assert.ok(
      response.body.errors.some((issue) => issue.path.includes("email")),
    );
  });
});
