import uuid from 'uuid';
import data from '<fixtures>/data';
import { cookieGenerator } from '<helpers>/utils';

export const signUp = (req, res) => {
  const { formattedValues } = req;
  const newUser = {
    id: uuid.v4(),
    email: formattedValues.email,
    username: formattedValues.username,
    lastName: formattedValues.lastName,
    firstName: formattedValues.firstName,
    password: req.body.password
  };
  cookieGenerator(newUser.id, res);
  data.push(newUser);
  return res.status(201).send({
    status: 201,
    message: 'User created successfully'
  });
};

export default signUp;
