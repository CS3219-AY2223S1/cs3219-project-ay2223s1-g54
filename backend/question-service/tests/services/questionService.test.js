import { dbInit, dbTerminate } from "../../src/db/setup.js";
import { getRandomQuestion } from "../../src/services/questionService.js";

describe("Question Service", () => {
  beforeAll(async () => {
    await dbInit();
  });

  describe("getRandomQuestion", () => {
    it("Should get a question of any difficulty", async () => {
      const validDifficulties = ["Easy", "Medium", "Hard"];
      const question = await getRandomQuestion(0);
      expect(question).not.toBeNull();
      expect(question).toHaveProperty("difficulty");

      const { difficulty } = question;
      expect(difficulty).not.toBeNull();
      expect(validDifficulties).toContain(difficulty);
    });

    it("Should get a question of easy difficulty", async () => {
      const question = await getRandomQuestion(1);
      expect(question).not.toBeNull();
      expect(question).toHaveProperty("difficulty");

      const { difficulty } = question;
      expect(difficulty).not.toBeNull();
      expect(difficulty).toBe("Easy");
    });

    it("Should get a question of medium difficulty", async () => {
      const question = await getRandomQuestion(2);
      expect(question).not.toBeNull();
      expect(question).toHaveProperty("difficulty");

      const { difficulty } = question;
      expect(difficulty).not.toBeNull();
      expect(difficulty).toBe("Medium");
    });

    it("Should get a question of hard difficulty", async () => {
      const question = await getRandomQuestion(3);
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
