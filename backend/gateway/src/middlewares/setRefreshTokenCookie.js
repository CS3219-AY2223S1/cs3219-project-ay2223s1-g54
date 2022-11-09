export const setRefreshTokenCookie = async (req, res, refreshToken, path) => {
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    path: path,
  });
};
