import express from 'express';
import auth from './user';
import article from './article';
import profile from './profile';
import comment from './comment';

const router = express.Router();
router.use('/auth', auth);
router.use('/articles', article);
router.use('/profile', profile);
router.use('/comments', comment);

export default router;
