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

  it("serves the OpenAPI document as JSON", async () => {
    const response = await request(app).get("/swagger.json");

    assert.equal(response.status, 200);
    assert.equal(response.body.openapi, "3.1.0");
    assert.deepEqual(Object.keys(response.body.paths), [
      "/",
      "/users",
      "/users/{id}",
      "/books",
      "/books/{id}",
      "/loans",
      "/loans/{id}",
    ]);
    assert.deepEqual(
      Object.keys(response.body.paths["/users/{id}"]).filter(
        (key) => key !== "parameters",
      ),
      ["get", "put", "delete"],
    );
    assert.equal(
      response.body.paths["/users"].post.requestBody.content["application/json"]
        .schema.$ref,
      "#/components/schemas/CreateUser",
    );
    assert.deepEqual(response.body.components.schemas.CreateUser.required, [
      "username",
      "email",
      "password",
      "role",
    ]);
    assert.equal(
      response.body.components.schemas.LoanInput.additionalProperties,
      false,
    );
  });
});
