import express from 'express';
import routerV1 from './v1';

const router = express.Router();

router.use('/api/v1', routerV1);

export default router;
