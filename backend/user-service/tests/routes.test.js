import supertest from "supertest";
import { app } from "../src/app.js";
import { dbInit, dbTerminate } from "../src/db/setup.js";
import { getUserByEmail } from "../src/db/repositories/user.js";
import { getTokenByUserId } from "../src/db/repositories/token.js";
import {
  EMAIL_VALIDATION_FAIL,
  MISSING_EMAIL_FIELD,
  MISSING_NEW_PASSWORD_FIELD,
  MISSING_PASSWORD_FIELD,
  MISSING_USERNAME_FIELD,
  MISSING_USER_ID_FIELD,
  PASSWORD_VALIDATION_FAIL,
  USERNAME_VALIDATION_FAIL,
  USER_NOT_FOUND,
} from "../src/constants/responseMessages.js";

describe("User Endpoints", () => {
  beforeAll(async () => {
    await dbInit();
  });

  let userId;
  let confirmationCode;
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

  describe("Create User", () => {
    it("Should create user successfully", async () => {
      const res = await supertest(app)
        .post("/")
        .send({ email, username, password });
      expect(res.statusCode).toBe(200);
    });
  });

  describe("Cannot Create user", () => {
    it("Should not create user with missing email field", async () => {
      const res = await supertest(app).post("/").send({ username, password });
      expect(res.statusCode).toBe(400);
      expect(res.body.error.name).toBe("MalformedRequest");
      expect(res.body.error.message).toBe(MISSING_EMAIL_FIELD);
    });

    it("Should not create user with missing username field", async () => {
      const res = await supertest(app).post("/").send({ email, password });
      expect(res.statusCode).toBe(400);
      expect(res.body.error.name).toBe("MalformedRequest");
      expect(res.body.error.message).toBe(MISSING_USERNAME_FIELD);
    });

    it("Should not create user with missing password field", async () => {
      const res = await supertest(app).post("/").send({ username, email });
      expect(res.statusCode).toBe(400);
      expect(res.body.error.name).toBe("MalformedRequest");
      expect(res.body.error.message).toBe(MISSING_PASSWORD_FIELD);
    });

    it("Should not create user with invalid email", async () => {
      const res = await supertest(app)
        .post("/")
        .send({ email: invalidEmail, username, password });
      expect(res.statusCode).toBe(400);
      expect(res.body.error.name).toBe("FieldValidationFailure");
      expect(res.body.error.message).toBe(EMAIL_VALIDATION_FAIL);
    });

    it("Should not create user with invalid username starting with number", async () => {
      const res = await supertest(app)
        .post("/")
        .send({ email, username: invalidUsernameStartWithNumber, password });
      expect(res.statusCode).toBe(400);
      expect(res.body.error.name).toBe("FieldValidationFailure");
      expect(res.body.error.message).toBe(USERNAME_VALIDATION_FAIL);
    });

    it("Should not create user with invalid short password", async () => {
      const res = await supertest(app)
        .post("/")
        .send({ email, username, password: invalidShortPassword });
      expect(res.statusCode).toBe(400);
      expect(res.body.error.name).toBe("FieldValidationFailure");
      expect(res.body.error.message).toBe(PASSWORD_VALIDATION_FAIL);
    });
  });

  describe("Confirm User By Email", () => {
    it("Should confirm user account successfully", async () => {
      const user = await getUserByEmail(email);
      const { confirmationCode } = user;
      const res = await supertest(app).get("/confirm/" + confirmationCode);
      expect(res.statusCode).toBe(200);
    });
  });

  describe("Cannot Confirm User By Email", () => {
    it("Should not confirm account with incorrect confirmation code", async () => {
      const res = await supertest(app).get(
        "/confirm/" + invalidConfirmationCode
      );
      expect(res.statusCode).toBe(404);
      expect(res.body.error.name).toBe("UserNotFound");
      expect(res.body.error.message).toBe(USER_NOT_FOUND);
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

  describe("Cannot Get User By Email", () => {
    it("Should not get the user without an email", async () => {
      const res = await supertest(app).get("/").query({});
      expect(res.statusCode).toBe(400);
      expect(res.body.error.name).toBe("MalformedRequest");
      expect(res.body.error.message).toBe(MISSING_EMAIL_FIELD);
    });

    it("Should not get the user using email not belonging to any account", async () => {
      const res = await supertest(app).get("/").query({ email: invalidEmail });
      expect(res.statusCode).toBe(404);
      expect(res.body.error.name).toBe("UserNotFound");
      expect(res.body.error.message).toBe(USER_NOT_FOUND);
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

  describe("Cannot Update User's password", () => {
    it("Should not update the user's password without userId", async () => {
      const res = await supertest(app)
        .put("/")
        .send({ oldPassword, newPassword });
      expect(res.statusCode).toBe(400);
      expect(res.body.error.name).toBe("MalformedRequest");
      expect(res.body.error.message).toBe(MISSING_USER_ID_FIELD);
    });

    it("Should not update the user's password without old password", async () => {
      const res = await supertest(app).put("/").send({ userId, newPassword });
      expect(res.statusCode).toBe(400);
      expect(res.body.error.name).toBe("MalformedRequest");
      expect(res.body.error.message).toBe(MISSING_PASSWORD_FIELD);
    });

    it("Should not update the user's password without new password", async () => {
      const res = await supertest(app).put("/").send({ userId, oldPassword });
      expect(res.statusCode).toBe(400);
      expect(res.body.error.name).toBe("MalformedRequest");
      expect(res.body.error.message).toBe(MISSING_NEW_PASSWORD_FIELD);
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

  describe("Cannot Verify User's credentials", () => {
    it("Should not verify the user's credentials without email", async () => {
      const res = await supertest(app)
        .post("/verify")
        .send({ password: newPassword });
      expect(res.statusCode).toBe(400);
      expect(res.body.error.name).toBe("MalformedRequest");
      expect(res.body.error.message).toBe(MISSING_EMAIL_FIELD);
    });

    it("Should not verify the user's credentials without password", async () => {
      const res = await supertest(app).post("/verify").send({ email });
      expect(res.statusCode).toBe(400);
      expect(res.body.error.name).toBe("MalformedRequest");
      expect(res.body.error.message).toBe(MISSING_PASSWORD_FIELD);
    });
  });

  describe("Request password reset for User", () => {
    it("Should send the user an email to reset password successfully", async () => {
      const res = await supertest(app).post("/passwordReset").send({ email });
      expect(res.statusCode).toBe(200);
    });
  });

  describe("Cannot request password reset for User without email", () => {
    it("Should not send the user an email to reset password successfully if no email is supplied", async () => {
      const res = await supertest(app).post("/passwordReset").send({});
      expect(res.statusCode).toBe(400);
      expect(res.body.error.name).toBe("MalformedRequest");
      expect(res.body.error.message).toBe(MISSING_EMAIL_FIELD);
    });
  });

  describe("Reset User's password", () => {
    it("Should reset the user's password successfully", async () => {
      const user = await getUserByEmail(email);
      const token = await getTokenByUserId(user.id);
      const res = await supertest(app)
        .post("/passwordReset" + `/${user.id}/${token.token}`)
        .send({ newPassword: resetPassword });
      expect(res.statusCode).toBe(200);
    });
  });

  describe("Cannot Reset User's password", () => {
    it("Should not reset the user's password without New Password", async () => {
      const user = await getUserByEmail(email);
      const token = await getTokenByUserId(user.id);
      const res = await supertest(app)
        .post("/passwordReset" + `/${user.id}/${token.token}`)
        .send({});
      expect(res.statusCode).toBe(400);
      expect(res.body.error.name).toBe("MalformedRequest");
      expect(res.body.error.message).toBe(MISSING_PASSWORD_FIELD);
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
