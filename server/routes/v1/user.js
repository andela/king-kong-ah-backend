import express from 'express';
import signup from '<controllers>/signup';
import verifyAccount from '<controllers>/verifyAccount';
import login from '<controllers>/login';
import existingUserCheck from '<middlewares>/existingUserChecker';
import { validateUserSignUp, validateUserLogin } from '<validations>/user';
import { authentication } from '<middlewares>/authentication';
import { verifyUserToken } from '<middlewares>/verifyUser';

const router = express.Router();

router.post('/signup', validateUserSignUp, existingUserCheck, signup);
router.post('/login', validateUserLogin, authentication, login);
router.get('/verify', verifyUserToken, verifyAccount);

export default router;
