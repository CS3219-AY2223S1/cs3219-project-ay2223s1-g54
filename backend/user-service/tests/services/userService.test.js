import * as userService from "../../src/services/userService.js";
import { dbInit, dbTerminate } from "../../src/db/setup.js";
import {
  EMAIL_VALIDATION_FAIL,
  GET_USER_BY_CONFIRMATION_CODE_FAILURE,
  PASSWORD_VALIDATION_FAIL,
  USERNAME_VALIDATION_FAIL,
  USER_NOT_FOUND,
} from "../../src/constants/responseMessages.js";

describe("User Service", () => {
  beforeAll(async () => {
    await dbInit();
  });

  let userId;
  let confirmationCode;
  let retrievedToken;
  const email = "jesttest@u.nus.edu";
  const username = "jesttest";
  const password = "jesttest123";
  const oldPassword = password;
  const newPassword = "jesttest1234";
  const resetPassword = "jesttest5678";

  const invalidEmail = "test@test";
  const invalidUsernameStartWithNumber = "1jesttest123";
  const invalidShortPassword = "12345";
  const invalidConfirmationCode = "123456";

  describe("createUser", () => {
    it("Should create user successfully", async () => {
      const f = async () => {
        const createdUser = await userService.createUser(
          email,
          username,
          password
        );
        confirmationCode = createdUser.confirmationCode;
      };

      await expect(f()).resolves.not.toThrow();
    });
  });

  describe("confirmUser", () => {
    it("Should confirm user account successfully", async () => {
      const f = async () => {
        await userService.emailVerifyingUser(confirmationCode);
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

  describe("sendResetPasswordLinkUser", () => {
    it("Should send the user the link to reset password successfully", async () => {
      const f = async () => {
        const { user, token } = await userService.sendResetPasswordLinkUser(
          email
        );

        userId = user.id;
        retrievedToken = token.token;
      };

      await expect(f()).resolves.not.toThrow();
    });
  });

  describe("resetPasswordUser", () => {
    it("Should send the user the link to reset password successfully", async () => {
      const f = async () => {
        await userService.resetPasswordUser(
          userId,
          retrievedToken,
          resetPassword
        );
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

  describe("createUserFail", () => {
    it("Should not create user with invalid email", async () => {
      const f = async () => {
        const createdUser = await userService.createUser(
          invalidEmail,
          username,
          password
        );
      };

      await expect(f()).rejects.toThrow(EMAIL_VALIDATION_FAIL);
    });
  });

  describe("createUserFail", () => {
    it("Should not create user with invalid username starting with number", async () => {
      const f = async () => {
        const createdUser = await userService.createUser(
          email,
          invalidUsernameStartWithNumber,
          password
        );
      };

      await expect(f()).rejects.toThrow(USERNAME_VALIDATION_FAIL);
    });
  });

  describe("createUserFail", () => {
    it("Should not create user with invalid short password", async () => {
      const f = async () => {
        const createdUser = await userService.createUser(
          email,
          username,
          invalidShortPassword
        );
      };

      await expect(f()).rejects.toThrow(PASSWORD_VALIDATION_FAIL);
    });
  });

  describe("confirmUserFail", () => {
    it("Should not confirm account with incorrect confirmation code", async () => {
      const f = async () => {
        await userService.emailVerifyingUser(invalidConfirmationCode);
      };

      await expect(f()).rejects.toThrow(USER_NOT_FOUND);
    });
  });
});
