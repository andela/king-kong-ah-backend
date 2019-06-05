import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

/**
 * All things pertaining to signing and verifying token
 */
class TokenHelper {
  /**
   * Generates new token
   * @param {Object} id - id
   * @returns {Object} token - returns token
   */
  static tokenGenerator(id) {
    const payload = {
      id
    };
    const token = jwt.sign(payload, process.env.SECRET, { expiresIn: '24h' });
    return `${token}`;
  }
}
export default TokenHelper;
