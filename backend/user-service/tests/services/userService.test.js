import * as userService from "../../src/services/userService.js";
import { dbInit, dbTerminate } from "../../src/db/setup.js";

describe("User Service", () => {
  beforeAll(async () => {
    await dbInit();
  });

  let userId;
  const email = "jesttest@u.nus.edu";
  const username = "jesttest";
  const password = "jesttest123";
  const oldPassword = password;
  const newPassword = "jesttest1234";

  describe("createUser", () => {
    it("Should create user successfully", async () => {
      const f = async () => {
        await userService.createUser(email, username, password);
      };

      await expect(f()).resolves.not.toThrow();
    });
  });

  describe("getUser", () => {
    it("Should get the user using email", async () => {
      const f = async () => {
        const user = await userService.getUser(email);
        expect(user).not.toBeNull();

        userId = user.id;
      };

      await expect(f()).resolves.not.toThrow();
    });
  });

  describe("updateUserPassword", () => {
    it("Should update the user's password successfully", async () => {
      const f = async () => {
        await userService.updateUserPassword(userId, oldPassword, newPassword);
      };

      await expect(f()).resolves.not.toThrow();
    });
  });

  describe("verifyUser", () => {
    it("Should verify the user's credentials successfully", async () => {
      const f = async () => {
        const match = await userService.verifyUser(email, newPassword);

        expect(match).not.toBeNull();
        expect(match).toBe(true);
      };

      await expect(f()).resolves.not.toThrow();
    });
  });

  describe("deleteUser", () => {
    it("Should delete the user successfully", async () => {
      const f = async () => {
        await userService.deleteUser(userId);
      };

      await expect(f()).resolves.not.toThrow();
    });
  });

  afterAll(async () => {
    await dbTerminate();
  });
});
