import slug from 'slug';

/**
 * @param {string} title
 * @return {string} unique_slug
 */
const createUniqueSlug = title => `${slug(title, { lower: true })}-${Date.now()}`;

export default { createUniqueSlug };
