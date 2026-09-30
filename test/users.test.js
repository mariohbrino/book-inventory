import assert from "node:assert/strict";
import { describe, it } from "node:test";
import request from "supertest";

import { app } from "../src/app.js";
import { createUserSchema } from "../src/schemas/userSchema.js"; // Adjust import path if needed

describe("User Input Validation - Direct Schema Unit Tests", () => {
  it("accepts a valid user request body", () => {
    const result = createUserSchema.safeParse({
      body: {
        username: "johndoe",
        email: "john@example.com",
        password: "securepassword123",
        role: "user",
      },
      query: {},
      params: {},
    });

    assert.equal(result.success, true);
  });

  it("rejects an invalid email format", () => {
    const result = createUserSchema.safeParse({
      body: {
        username: "johndoe",
        email: "not-an-email",
        password: "securepassword123",
        role: "user",
      },
      query: {},
      params: {},
    });

    assert.equal(result.success, false);
  });
});

describe("User Input Validation - HTTP Integration Tests", () => {
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
