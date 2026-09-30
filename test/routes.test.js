import assert from "node:assert/strict";
import { describe, it } from "node:test";

import request from "supertest";

import { app } from "../src/app.js";

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
