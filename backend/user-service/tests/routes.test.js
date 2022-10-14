import supertest from "supertest";
import { app } from "../src/app.js";
import { dbInit, dbTerminate } from "../src/db/setup.js";

describe("User Endpoints", () => {
  beforeAll(async () => {
    await dbInit();
  });

  let userId;
  const email = "jesttest@u.nus.edu";
  const username = "jesttest";
  const password = "jesttest123";
  const oldPassword = password;
  const newPassword = "jesttest1234";

  describe("Create User", () => {
    it("Should create user successfully", async () => {
      const res = await supertest(app)
        .post("/")
        .send({ email, username, password });
      expect(res.statusCode).toBe(200);
    });
  });

  describe("Get User By Email", () => {
    it("Should get the user using email", async () => {
      const res = await supertest(app).get("/").query({ email });
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("userId");
      expect(res.body).toHaveProperty("username");

      userId = res.body.userId;
    });
  });

  describe("Update User's password", () => {
    it("Should update the user's password successfully", async () => {
      const res = await supertest(app)
        .put("/")
        .send({ userId, oldPassword, newPassword });
      expect(res.statusCode).toBe(200);
    });
  });

  describe("Verify User's credentials", () => {
    it("Should verify the user's credentials successfully", async () => {
      const res = await supertest(app)
        .post("/verify")
        .send({ email, password: newPassword });
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("match");

      const { match } = res.body;
      expect(match).not.toBeNull();
      expect(match).toBe(true);
    });
  });

  describe("Delete User", () => {
    it("Should delete the user successfully", async () => {
      const res = await supertest(app).delete(`/${userId}`);
      expect(res.statusCode).toBe(200);
    });
  });

  afterAll(async () => {
    await dbTerminate();
  });
});
