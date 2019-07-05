import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import env from 'dotenv';
import passport from 'passport';
import cors from 'cors';
import router from './routes';
import setPassportMiddleware from '<middlewares>/passport/strategies';

env.config();
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser(process.env.SECRET));
app.use(express.json());
setPassportMiddleware(passport, app);

app.use(router);

app.all('*', (req, res) => res.status(404).send({
  status: 'error',
  message: 'you have entered an incorrect route'
}));

const port = process.env.PORT || 3000;
app.listen(port);

export default app;
