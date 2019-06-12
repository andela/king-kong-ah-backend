import { cookieGenerator } from '<helpers>/utils';

const login = async (req, res) => {
  const { id, isVerified } = req.user;

  cookieGenerator(id, isVerified, process.env.COOKIE_EXPIRY_DATE, res);

  return res.status(200).send({
    status: 'success',
    message: 'Login successful'
  });
};

export default login;
