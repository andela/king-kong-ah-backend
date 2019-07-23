import { toLowerCaseAndTrim, displayError } from '<helpers>/utils';
import model from '<serverModels>';

const { User } = model;

const validUserCheck = async (req, res, next) => {
  const { email } = req.body;
  const formattedValues = toLowerCaseAndTrim(req.body);

  const userEmailExist = await User.findOne({ where: { email } });

  let message;

  if (userEmailExist) {
    message = 'Email exist';
  }
  if (message) {
    const err = new Error(message);
    return displayError(err, res, 409);
  }

  req.formattedValues = formattedValues;
  return next();
};
export default validUserCheck;
