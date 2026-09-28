import assert from "node:assert/strict";
import { describe, it } from "node:test";

import jwt from "jsonwebtoken";
import request from "supertest";

import { app } from "../src/app.js";

const jwtSecret = "test-secret";
process.env.JWT_SECRET = jwtSecret;

const tokenForRole = (role) => jwt.sign({ sub: "test-user", role }, jwtSecret);

describe("GET routes", () => {
  it("gets the home page", async () => {
    const response = await request(app).get("/");

    assert.equal(response.status, 200);
    assert.deepEqual(response.body, {
      message: "Welcome to the home page!",
    });
  });

  it("gets all books", async () => {
    const response = await request(app)
      .get("/books")
      .set("Authorization", `Bearer ${tokenForRole("librarian")}`);

    assert.equal(response.status, 200);
    assert.deepEqual(response.body, { books: [] });
  });

  it("rejects requests without authentication", async () => {
    const response = await request(app).get("/books");

    assert.equal(response.status, 401);
    assert.deepEqual(response.body, { error: "Authentication required" });
  });

  it("rejects authenticated users without an allowed role", async () => {
    const response = await request(app)
      .get("/books")
      .set("Authorization", `Bearer ${tokenForRole("user")}`);

    assert.equal(response.status, 403);
    assert.deepEqual(response.body, { error: "Forbidden" });
  });
});
