import supertest from "supertest";
import { app } from "../src/app.js";
import {
  MISSING_ACCESS_TOKEN_FIELD,
  MISSING_REFRESH_TOKEN_FIELD,
  MISSING_USER_ID_FIELD,
} from "../src/constants/responseMessages.js";

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

  describe("Not Generate Tokens", () => {
    it("Should not generate accessToken and refreshToken without userId", async () => {
      const res = await supertest(app).post("/generate").send({});

      expect(res.statusCode).toBe(400);
      expect(res.body.error.name).toBe("MalformedRequest");
      expect(res.body.error.message).toBe(MISSING_USER_ID_FIELD);
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

  describe("Not Verify accessToken", () => {
    it("Should not verify accessToken without accessToken", async () => {
      const res = await supertest(app).post("/verify").send({ userId });

      expect(res.statusCode).toBe(400);
      expect(res.body.error.name).toBe("MalformedRequest");
      expect(res.body.error.message).toBe(MISSING_ACCESS_TOKEN_FIELD);
    });
  });

  describe("Renew accessToken", () => {
    it("Should successfully renew accessToken", async () => {
      const res = await supertest(app).post("/renew").send({ refreshToken });

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("accessToken");
    });
  });

  describe("Not Renew accessToken", () => {
    it("Should not renew accessToken without refreshToken", async () => {
      const res = await supertest(app).post("/renew").send({});

      expect(res.statusCode).toBe(400);
      expect(res.body.error.name).toBe("MalformedRequest");
      expect(res.body.error.message).toBe(MISSING_REFRESH_TOKEN_FIELD);
    });
  });

  describe("Revoke refreshToken", () => {
    it("Should successfully revoke refreshToken", async () => {
      const res = await supertest(app).post("/revoke").send({ refreshToken });

      expect(res.statusCode).toBe(200);
    });
  });

  describe("Not Revoke refreshToken", () => {
    it("Should not revoke refreshToken without refreshToken", async () => {
      const res = await supertest(app).post("/revoke").send({});

      expect(res.statusCode).toBe(400);
      expect(res.body.error.name).toBe("MalformedRequest");
      expect(res.body.error.message).toBe(MISSING_REFRESH_TOKEN_FIELD);
    });
  });
});
