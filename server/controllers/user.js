import uuid from 'uuid';
import { cookieGenerator } from '<helpers>/utils';
import data from '../dummyData/data.json';


/**
 * Class userController contains all methods pertaining to users
 */
class userController {
  /**
   * Creates a new user
   * @param {Object} req - request parameters
   * @param {Object} res - response object
   * @returns {Object} res - returns res object
   */
  static signUp(req, res) {
    const email = data.find(user => user.email === req.body.email);
    if (email) {
      return res.status(409).send({
        status: 409,
        message: 'email already exists'
      });
    }
    const newUser = {
      id: uuid.v4(),
      email: req.body.email.toLowerCase().trim(),
      username: req.body.username.toLowerCase().trim(),
      lastName: req.body.lastName.toLowerCase().trim(),
      firstName: req.body.firstName.toLowerCase().trim(),
      password: req.body.password
    };
    cookieGenerator(newUser.id, res);
    data.push(newUser);
    return res.status(201).send({
      status: 201,
      message: 'User created successfully',
    });
  }
}

export default userController;
