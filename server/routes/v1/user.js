import express from 'express';
import userController from '../../controllers/userController';


const user = express.Router();

user.post('/test', userController.createTestUser);

export default user;
