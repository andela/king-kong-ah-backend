import express from 'express';
import indexRouter from './v1';

const router = express.Router();

router.use('/api/v1', indexRouter);
router.get('/', (req, res) => {
  res.status(200).send(`<h1>Welcome To The Authors Haven Application</h1>
    <p>Authors Haven - A Social platform for the creative at heart.</p>
    <h4>Please use PostMan and navigate to <code>/api/v1</code> to use the app</h4>
    <p>For any more info, please click
     <a href='https://github.com/andela/king-kong-ah-backend'> here </a>
     to visit the repo.</P>
      <h4>Thanks  &#x1F600;</h4>`);
});

export default router;
