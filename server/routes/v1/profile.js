import express from 'express';
import { verifyUser } from '<middlewares>/verifyUser';
import { update, getUserProfile } from '<controllers>/profile';
import validateProfile from '<validations>/profile';
import validateUuidParams from '<validations>';

const router = express.Router();

router.patch('/', verifyUser, validateProfile, update);
router.get('/:id', verifyUser, validateUuidParams, getUserProfile);

export default router;
