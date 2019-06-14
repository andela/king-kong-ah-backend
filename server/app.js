import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import env from 'dotenv';
import router from './routes';

env.config();

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser(process.env.SECRET));
app.use(express.json());
app.use(router);
app.get('/', (req, res, next) => {
  res.status(200).send(`<h1>Welcome To The Authors Haven Application</h1>
            <p>Authors Haven - A Social platform for the creative at heart.</p>
            <h4>Please use PostMan and navigate to <code>/api/v1</code> to use the app</h4>
            <p>For any more info, please click <a href='https://github.com/andela/king-kong-ah-backend'> here </a>to visit the repo.</P>
            <h4>Thanks  &#x1F600;</h4>`);
  next();
});

app.all('*', (req, res) => res.status(404).send({
  status: 'error',
  message: 'you have entered an incorrect route'
}));

const port = process.env.PORT || 3000;
app.listen(port);

export default app;
