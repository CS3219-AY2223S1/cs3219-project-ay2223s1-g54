import supertest from "supertest";
import { app } from "../src/app.js";
import { dbInit, dbTerminate } from "../src/db/setup.js";

describe("History Service", () => {
  beforeAll(async () => {
    await dbInit();
  })

  const userId = "123";
  const questionId = "123";
  const code = "hello world!";
  const numberSubmissions = 1;

  describe("Create submission", () => {
    it("Should create submission successfully", async () => {
      const res = await supertest(app)
        .post(`/submission/${userId}/${questionId}`)
        .send({ code });
      expect(res.statusCode).toBe(200);
    })
  })

  afterAll(async () => {
    await dbTerminate();
  })
})