import express from 'express';
import signup from '<controllers>/signup';
import login from '<controllers>/login';
import existingUserCheck from '<middlewares>/existingUserChecker';
import { validateUserSignUp, validateUserLogin } from '<validations>/user';
import { authentication } from '<middlewares>/authentication';

const router = express.Router();

router.post('/signup', validateUserSignUp, existingUserCheck, signup);
router.post('/login', validateUserLogin, authentication, login);

export default router;
