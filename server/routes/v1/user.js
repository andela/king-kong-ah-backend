import express from 'express';
import userController from '<controllers>/userController';
import { validateSignUp } from '<middlewares>';

const user = express.Router();

user.post('/signup', validateSignUp, userController.signUp);

export default user;
