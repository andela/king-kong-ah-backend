import express from 'express';
import { verifyUser, checkIsVerified } from '<middlewares>/verifyUser';
import { validateCreateArticle } from '<validations>/article';
import validateUuidParams from '<validations>';
import {
  createArticle,
  getArticles,
  getArticle,
  updateArticle,
  deleteArticle
} from '<controllers>/article';


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
article.delete('/:id', validateUuidParams, verifyUser, deleteArticle);

export default article;
