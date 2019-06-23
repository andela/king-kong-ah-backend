import express from 'express';
import { verifyUser } from '<middlewares>/verifyUser';
import { updateProfile, getUserProfile } from '<controllers>/profile';
import validateProfile from '<validations>/profile';
import validateUuidParams from '<validations>';

const router = express.Router();

router.patch('/', verifyUser, validateProfile, updateProfile);
router.get('/:id', verifyUser, validateUuidParams, getUserProfile);

export default router;
