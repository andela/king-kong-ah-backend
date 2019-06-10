import express from 'express';
import signup from '<controllers>/signup';
import existingUserCheck from '<middlewares>/existingUserChecker';
import userValidations from '<middlewares>/userValidations';

const router = express.Router();

router.post('/signup', userValidations, existingUserCheck, signup);

export default router;
