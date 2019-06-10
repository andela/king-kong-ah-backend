import express from 'express';
import auth from './user';
import article from './article';

const router = express.Router();
router.use('/auth', auth);

router.use('/articles', article);

export default router;
