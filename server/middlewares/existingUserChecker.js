import data from '<fixtures>/data';
import { toLowerCaseAndTrim } from '<helpers>/utils';

const userCheck = (req, res, next) => {
  const formattedValues = toLowerCaseAndTrim(req.body);
  const userEmailExist = data.find(userEmail => userEmail.email === formattedValues.email);
  const userNameExist = data.find(userName => userName.username === formattedValues.username);
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
export default userCheck;
