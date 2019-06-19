import { newUser } from '<fixtures>/user';
import utilRes from './utils';

export const getReq = () => ({
  user: {
    ...newUser,
    oauthId: '1234567809warsxtgcfh',
    type: 'google',
    username: 'whatever',
    email: 'teat@tes.com'
  }
});

export const getRes = () => {
  const res = {
    ...utilRes,
    status: (code) => {
      res.statusCode = code;
      return res;
    },
    json: (data) => {
      res.json = JSON.stringify(data);
      return res;
    }
  };
  return res;
};
