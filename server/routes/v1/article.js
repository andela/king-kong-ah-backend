import express from 'express';
import { createArticle, getArticles } from '<controllers>/article';
import { verifyUser, checkIsVerified } from '<middlewares>/verifyUser';
import { validateCreateArticle } from '<validations>/article';

const article = express.Router();

article.post('/', validateCreateArticle, verifyUser, checkIsVerified, createArticle);
article.get('/', getArticles);

export default article;
