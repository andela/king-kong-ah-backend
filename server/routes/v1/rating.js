import express from 'express';
import { verifyUser, checkIsVerified } from '<middlewares>/verifyUser';
import { createRating, updateRating } from '<controllers>/rating';
import { validateCreateRating, validateUpdateRating } from '<validations>/rating';

const router = express.Router();

router.post('/', verifyUser, checkIsVerified, validateCreateRating, createRating);
router.patch('/:id', verifyUser, checkIsVerified, validateUpdateRating, updateRating);

export default router;
