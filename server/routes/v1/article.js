import express from 'express';
import articles from '<controllers>/article';
import verifyUser from '<middlewares>/verifyUser';
import { validateCreateArticle } from '<validations>/article';

const article = express.Router();

article.post('/', validateCreateArticle, verifyUser, articles);

export default article;
