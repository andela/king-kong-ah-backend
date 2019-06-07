import Validator from 'validatorjs';

const signupValidations = (request, response, next) => {
  const {
    username, firstName, lastName, email, password
  } = request.body;

  const data = {
    firstName: firstName && typeof firstName === 'string' ? firstName.trim() : firstName,
    lastName: lastName && typeof lastName === 'string' ? lastName.trim() : lastName,
    email,
    username: username && typeof username === 'string' ? username.trim() : username,
    password: password && password.trim()
  };

  const rules = {
    firstName: 'required|string|min:2',
    lastName: 'required|string|min:2',
    email: 'required|email',
    password: 'required|min:6',
    username: 'required'
  };

  const validation = new Validator(data, rules);

  if (validation.passes()) {
    return next();
  }

  return response.status(400).json({
    status: 400,
    data: {
      errors: validation.errors.all()
    }
  });
};

export default signupValidations;
