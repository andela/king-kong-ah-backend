import { tokenGenerator, cookieGenerator, handleSuccessResponse } from '<helpers>/utils';

const login = async (req, res) => {
  const { id, isVerified } = req.user;

  cookieGenerator(id, isVerified, process.env.COOKIE_EXPIRY_DATE, res);

  return handleSuccessResponse(
    {
      ...req.user,
      'access-token': tokenGenerator(
        id, isVerified, process.env.TOKEN_EXPIRY_DATE, process.env.SECRET
      ),
    },
    'Login successful',
    res,
    200,
  );
};

export default login;
