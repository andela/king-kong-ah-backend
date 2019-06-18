import { cookieGenerator, handleSuccessResponse } from '<helpers>/utils';

const login = async (req, res) => {
  const { id, isVerified } = req.user;

  cookieGenerator(id, isVerified, process.env.COOKIE_EXPIRY_DATE, res);

  return handleSuccessResponse(null, 'Login successful', res, 200);
};

export default login;
