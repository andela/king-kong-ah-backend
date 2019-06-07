import express from 'express';
import indexRouter from './v1';

const router = express.Router();

router.use('/api/v1', indexRouter);

export default router;
