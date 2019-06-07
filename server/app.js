/* eslint-disable no-console */
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
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`server running on PORT ${port}`);
});
export default app;
