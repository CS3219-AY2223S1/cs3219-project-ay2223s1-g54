import * as authService from "../../src/services/authService";

describe("Auth Service", () => {
  let accessToken, refreshToken;
  const userId = 1;

  describe("generateTokens", () => {
    it("Should generate accessToken and refreshToken", async () => {
      const f = async () => {
        const tokens = await authService.generateTokens(userId);

        expect(tokens).not.toBeNull();
        expect(tokens).toHaveProperty("accessToken");
        expect(tokens).toHaveProperty("refreshToken");

        accessToken = tokens.accessToken;
        refreshToken = tokens.refreshToken;
      };

      await expect(f()).resolves.not.toThrow();
    });
  });

  describe("verifyAccessToken", () => {
    it("Should successfully verify accessToken", async () => {
      const f = async () => {
        await authService.verifyAccessToken(accessToken, userId);
      };

      await expect(f()).resolves.not.toThrow();
    });
  });

  describe("renewAccessToken", () => {
    it("Should successfully renew accessToken", async () => {
      const f = async () => {
        const accessToken = await authService.renewAccessToken(refreshToken);
        expect(accessToken).not.toBeNull();
      };

      await expect(f()).resolves.not.toThrow();
    });
  });
});
