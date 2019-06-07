import express from 'express';
import userController from '<controllers>/user';
import { validateUserSignUp } from '<middlewares>/authValidation';

const user = express.Router();

user.post('/signup', validateUserSignUp, userController.signUp);

export default user;
