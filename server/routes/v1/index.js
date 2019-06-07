import express from 'express';
import user from './user';

const indexRouter = express.Router();
indexRouter.use('/auth', user);

export default indexRouter;
