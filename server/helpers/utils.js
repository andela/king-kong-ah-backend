import slug from 'slug';
import bcrypt from 'bcryptjs';

/**
 * @param {string} title
 * @return {string} unique_slug
 */
const createUniqueSlug = title => `${slug(title, { lower: true })}-${Date.now()}`;

/**
 * @param {string} password
 * @return {string} hash
 */

const hashPassword = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10));

export default { createUniqueSlug, hashPassword };
