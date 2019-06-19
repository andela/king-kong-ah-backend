/* eslint-disable no-console */
import model from '<serverModels>';
import socialAuth from '<controllers>/socialAuth';
import { getReq, getRes } from '<fixtures>/socialAuth';
import chai from 'chai';

const { sequelize } = model;
const { expect } = chai;
let req;
let res;

before(async () => {
  try {
    await sequelize.sync({ force: true });
  } catch (error) {
    return error;
  }
});

beforeEach(() => {
  req = getReq();
  res = getRes();
});

describe('Oauth signup', () => {
  it('should signup successfully', async () => {
    try {
      const response = await socialAuth(req, res);

      expect(response.statusCode).to.be.equal(201);
    } catch (error) {
      console.log(error);
    }
  });

  it('should login successfully', async () => {
    try {
      const response = await socialAuth(req, res);

      expect(response.statusCode).to.be.equal(200);
    } catch (error) {
      console.log(error);
    }
  });

  it('should not signup successfully', async () => {
    try {
      await socialAuth({ user: { ...req.user, oauthId: '' } }, res);

      expect(res.statusCode).to.be.equal(500);
    } catch (error) {
      console.log(error);
    }
  });
});
