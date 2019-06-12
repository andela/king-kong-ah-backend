import express from 'express';
import bodyParser from 'body-parser';
import env from 'dotenv';
import router from './routes';

env.config();

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(router);

app.all('*', (req, res) => res.status(404).send({
  status: 'error',
  message: 'you have entered an incorrect route'
}));

const port = process.env.PORT || 3000;
app.listen(port);

export default app;
