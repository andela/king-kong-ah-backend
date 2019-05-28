import express from 'express';
import user from './user';

const routerV1 = express.Router();

routerV1.use('/auth', user);


export default routerV1;
