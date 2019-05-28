import express from 'express';
import bodyParser from 'body-parser';
import env from 'dotenv';
import router from './routes';

env.config();
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(router);

app.get('*', (req, res) => res.status(200).send({
  message: 'Welcome to authors haven',
}));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on ${port}`));

export default app;
