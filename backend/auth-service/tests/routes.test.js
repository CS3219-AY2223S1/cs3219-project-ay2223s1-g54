import supertest from "supertest";
import { app } from "../src/app.js";

describe("Auth Endpoints", () => {
  let accessToken, refreshToken;
  const userId = 1;

  describe("Generate Tokens", () => {
    it("Should generate accessToken and refreshToken", async () => {
      const res = await supertest(app).post("/generate").send({ userId });

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("accessToken");
      expect(res.body).toHaveProperty("refreshToken");

      accessToken = res.body.accessToken;
      refreshToken = res.body.refreshToken;
    });
  });

  describe("Verify accessToken", () => {
    it("Should successfully verify accessToken", async () => {
      const res = await supertest(app)
        .post("/verify")
        .send({ accessToken, userId });

      expect(res.statusCode).toBe(200);
    });
  });

  describe("Renew accessToken", () => {
    it("Should successfully renew accessToken", async () => {
      const res = await supertest(app).post("/renew").send({ refreshToken });

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("accessToken");
    });
  });

  describe("Revoke refreshToken", () => {
    it("Should successfully revoke refreshToken", async () => {
      const res = await supertest(app).post("/revoke").send({ refreshToken });

      expect(res.statusCode).toBe(200);
    });
  });
});
