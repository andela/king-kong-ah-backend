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
  it('should login successfully', async () => {
    let response;

    try {
      response = await socialAuth(req, res);
    } catch (error) {
      console.log(error);
    }

    expect(response.statusCode).to.be.equal(200);
  });

  it('should not signup successfully', async () => {
    try {
      await socialAuth({ user: { ...req.user, oauthId: '' } }, res);
    } catch (error) {
      console.log(error);
    }

    expect(res.statusCode).to.be.equal(500);
  });
});
