import mockingoose from "mockingoose";
import mongoose from "mongoose";
import request from "supertest";
import { afterEach, assert, beforeEach, describe, it, vi } from "vitest";

import { app } from "../../src/app.js";
import { UserModel } from "../../src/models/users.js";

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

describe("user endpoints happy path", () => {
  const usersData = [
    {
      _id: "507f1f77bcf86cd799439011",
      username: "johndoe",
      email: "john.doe@example.com",
      age: 30,
      role: "user",
    },
    {
      _id: "507f1f77bcf86cd799439012",
      username: "janedoe",
      email: "jane.doe@example.com",
      age: 28,
      role: "admin",
    },
  ];

  beforeEach(() => {
    mongoose.model(UserModel.modelName, UserModel.schema);
    mockingoose.resetAll();
    vi.clearAllMocks();
  });

  afterEach(() => {
    mockingoose.resetAll();
    mongoose.deleteModel(UserModel.modelName);
  });

  it("can fetch all users", async () => {
    mockingoose(UserModel).toReturn(usersData, "find");

    const response = await request(app).get("/users");
    assert.equal(response.status, 200);
    assert.equal(response.body.length, 2);
  });

  it("can fetch a user by ID", async () => {
    const user = usersData[0];
    mockingoose(UserModel).toReturn(user, "findOne");

    const response = await request(app).get(`/users/${user._id}`);
    assert.equal(response.status, 200);
    assert.equal(response.body.username, user.username);
  });
});
