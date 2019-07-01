import express from 'express';
import {
  createArticle,
  getArticles,
  getArticle,
  updateArticle
} from '<controllers>/article';
import { verifyUser, checkIsVerified } from '<middlewares>/verifyUser';
import { validateCreateArticle } from '<validations>/article';
import validateUuidParams from '<validations>';

const article = express.Router();

article.post(
  '/',
  validateCreateArticle,
  verifyUser,
  checkIsVerified,
  createArticle
);
article.get('/:id', validateUuidParams, getArticle);
article.get('/', getArticles);
article.patch('/:id', validateUuidParams, verifyUser, updateArticle);

export default article;
