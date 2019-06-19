import signup from '<controllers>/signup';
import verifyAccount from '<controllers>/verifyAccount';
import login from '<controllers>/login';
import resetPassword from '<controllers>/resetPassword';
import existingUserChecker from '<middlewares>/existingUserChecker';
import {
  validateUserSignUp,
  validateUserLogin,
  validateRecoverEmail,
  validatePasswordReset
} from '<validations>/user';
import { authentication } from '<middlewares>/authentication';
import { verifyUserToken } from '<middlewares>/verifyUser';
import {
  googleAuth,
  googleAuthRedirect,
  facebookAuth,
  facebookAuthRedirect,
  twitterAuth,
  twitterAuthRedirect
} from '<middlewares>/passport/authentication';
import socialAuth from '<controllers>/socialAuth';
import express from 'express';
import recoverEmail from '<controllers>/recoverEmail';

const router = express.Router();

router.post('/signup', validateUserSignUp, existingUserChecker, signup);
router.post('/login', validateUserLogin, authentication, login);
router.get('/verify', verifyUserToken, verifyAccount);
router.post('/recoverEmail', validateRecoverEmail, recoverEmail);
router.patch('/resetPassword', validatePasswordReset, resetPassword);

router.get('/google', googleAuth());
router.get('/google/redirect', googleAuthRedirect(), socialAuth);

router.get('/facebook', facebookAuth());
router.get('/facebook/redirect', facebookAuthRedirect(), socialAuth);

router.get('/twitter', twitterAuth());
router.get('/twitter/redirect', twitterAuthRedirect(), socialAuth);
export default router;
