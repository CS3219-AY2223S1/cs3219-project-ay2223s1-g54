import supertest from "supertest";
import { app } from "../src/app.js";
import { dbInit, dbTerminate } from "../src/db/setup.js";

describe("Question Endpoints", () => {
  beforeAll(async () => {
    await dbInit();
  });

  describe("Get Random Question (Any)", () => {
    it("Should get a question of any difficulty", async () => {
      const validDifficulties = ["Easy", "Medium", "Hard"];
      const res = await supertest(app).get("/");
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("question");

      const { question } = res.body;
      expect(question).not.toBeNull();
      expect(question).toHaveProperty("difficulty");

      const { difficulty } = question;
      expect(difficulty).not.toBeNull();
      expect(validDifficulties).toContain(difficulty);
    });
  });

  describe("Get Random Question (Easy)", () => {
    it("Should get a question of easy difficulty", async () => {
      const res = await supertest(app).get("/easy");
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("question");

      const { question } = res.body;
      expect(question).not.toBeNull();
      expect(question).toHaveProperty("difficulty");

      const { difficulty } = question;
      expect(difficulty).not.toBeNull();
      expect(difficulty).toBe("Easy");
    });
  });

  describe("Get Random Question (Medium)", () => {
    it("Should get a question of medium difficulty", async () => {
      const res = await supertest(app).get("/medium");
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("question");

      const { question } = res.body;
      expect(question).not.toBeNull();
      expect(question).toHaveProperty("difficulty");

      const { difficulty } = question;
      expect(difficulty).not.toBeNull();
      expect(difficulty).toBe("Medium");
    });
  });

  describe("Get Random Question (Hard)", () => {
    it("Should get a question of hard difficulty", async () => {
      const res = await supertest(app).get("/hard");
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("question");

      const { question } = res.body;
      expect(question).not.toBeNull();
      expect(question).toHaveProperty("difficulty");

      const { difficulty } = question;
      expect(difficulty).not.toBeNull();
      expect(difficulty).toBe("Hard");
    });
  });

  afterAll(async () => {
    await dbTerminate();
  });
});
