import { toLowerCaseAndTrim } from '<helpers>/utils';
import model from '<serverModels>';

const { User } = model;

const validUserCheck = async (req, res, next) => {
  const { email, username } = req.body;

  const formattedValues = toLowerCaseAndTrim(req.body);

  const userEmailExist = await User.findOne({ where: { email } });

  const userNameExist = await User.findOne({ where: { username } });

  let message;

  if (userEmailExist && userNameExist) {
    message = 'Email and username exist';
  } else if (userEmailExist) {
    message = 'Email exist';
  } else if (userNameExist) {
    message = 'Usename exist';
  }
  if (message) {
    return res.status(409).send({
      status: 409,
      message
    });
  }
  req.formattedValues = formattedValues;
  next();
};
export default validUserCheck;
