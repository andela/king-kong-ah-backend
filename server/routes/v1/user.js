import express from 'express';
import signup from '<controllers>/signup';
import existingUserCheck from '<middlewares>/existingUserChecker';
import { validateUserSignUp, validateUserLogin } from '<validations>/user';

const router = express.Router();

router.post('/signup', validateUserSignUp, existingUserCheck, signup);
router.post('/login', validateUserLogin);

export default router;
