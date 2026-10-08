import request from "supertest";
import { afterEach, assert, describe, it, vi } from "vitest";

import { app } from "../../src/app.js";
import { connection } from "../../src/services/database.js";

const UserModel = connection.model("User");

describe("user GET endpoints", () => {
  const usersData = [
    {
      _id: "507f1f77bcf86cd799439041",
      username: "johndoe",
      email: "john@example.com",
      age: 30,
      role: "user",
    },
    {
      _id: "507f1f77bcf86cd799439042",
      username: "janedoe",
      email: "jane@example.com",
      age: 28,
      role: "user",
    },
  ];

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("can fetch all users", async () => {
    vi.spyOn(UserModel, "find").mockResolvedValue(usersData);

    const response = await request(app).get("/users");

    assert.equal(response.status, 200);
    assert.deepEqual(response.body, usersData);
  });

  it("can fetch a user by ID", async () => {
    const user = usersData[0];
    vi.spyOn(UserModel, "findById").mockResolvedValue(user);

    const response = await request(app).get(`/users/${user._id}`);

    assert.equal(response.status, 200);
    assert.deepEqual(response.body, user);
  });
});

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
