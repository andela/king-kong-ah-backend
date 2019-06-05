import express from 'express';
import user from './user';

const v1Router = express.Router();
v1Router.use('/auth', user);

export default v1Router;
