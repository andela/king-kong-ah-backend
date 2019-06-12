import express from 'express';
import { validateCreateArticle } from '<validations>/article';

const article = express.Router();

article.post('/', validateCreateArticle);

export default article;
