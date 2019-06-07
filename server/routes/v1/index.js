import express from 'express';
import auth from './user';

const router = express.Router();
router.use('/auth', auth);

export default router;
