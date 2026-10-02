import { assert, describe, it } from "vitest";

import request from "supertest";

import { app } from "../../src/app.js";

describe("root endpoints", () => {
  it("gets the home page", async () => {
    const response = await request(app).get("/");

    assert.equal(response.status, 200);
    assert.deepEqual(response.body, {
      message: "Welcome to the home page!",
    });
  });
});
