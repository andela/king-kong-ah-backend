import slug from 'slug';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();
/**
 * @param {string} title
 * @return {string} unique_slug
 */

/**
 * @param {string} password
 * @return {string} hash
 */
const { SECRET, TOKENEXPIRYDATE, COOKIEEXPIRYDATE } = process.env;
export const hashPassword = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10));
export const createUniqueSlug = title => `${slug(title, { lower: true })}-${Date.now()}`;

export const toLowerCaseAndTrim = (req) => {
  const newFormattedObject = {};
  Object.entries(req).forEach((element) => {
    const key = element[0];
    const value = element[1];
    newFormattedObject[key] = value.replace(/\s/g, '').toLowerCase();
  });
  return newFormattedObject;
};

export const tokenGenerator = (id) => {
  const payload = {
    id
  };
  const token = jwt.sign(payload, SECRET, { expiresIn: TOKENEXPIRYDATE });
  return token;
};

export const cookieGenerator = (id, res) => res.cookie(
  'access_token',
  { token: tokenGenerator(id) },
  {
    maxAge: COOKIEEXPIRYDATE,
    httpOnly: true,
    secure: true
  }
);
