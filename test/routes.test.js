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

  it("gets all books", async () => {
    const response = await request(app).get("/books");

    assert.equal(response.status, 200);
    assert.deepEqual(response.body, { books: [] });
  });
});
