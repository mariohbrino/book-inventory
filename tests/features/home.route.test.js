import request from "supertest";
import { assert, describe, it, vi } from "vitest";

vi.unmock("../../src/middlewares/authenticate.js");

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
