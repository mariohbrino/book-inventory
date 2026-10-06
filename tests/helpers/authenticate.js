import { vi } from "vitest";

vi.mock("../../src/middlewares/authenticate.js", () => ({
  authenticate: vi.fn((request, response, next) => {
    void response;

    request.user = {
      sub: "507f1f77bcf86cd799439011",
      email: "test@example.com",
      role: "user",
    };

    return next();
  }),
}));
