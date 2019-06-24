import express from 'express';
import createComment from '<controllers>/comment';
import validateUuidParams from '<validations>';
import validateComment from '<validations>/comment';
import { verifyUser, checkIsVerified } from '<middlewares>/verifyUser';

const router = express.Router();

router.post('/:id', validateUuidParams, validateComment, verifyUser, checkIsVerified, createComment);

export default router;
