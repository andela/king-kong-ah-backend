/* eslint-disable no-console */
import { getUserData } from '<fixtures>/user';
import { tokenGenerator } from '<helpers>/utils';

const { TOKEN_EXPIRY_DATE, SECRET } = process.env;

export const signupUser = (agent, data) => {
  data = data || {
    email: 'johndoe@email.com',
    username: 'johndoee',
    password: '123456abcdef'
  };
  return agent.post('/api/v1/auth/signup').send(getUserData(data));
};

export const loginUser = (agent, data) => {
  data = data || {
    email: 'johndoe@email.com',
    password: '123456abcdef'
  };
  return agent.post('/api/v1/auth/login').send(data);
};

export const verifyUser = async (agent, data) => {
  const res = await signupUser(agent, data);
  const userData = res.body.data;
  const token = tokenGenerator(userData.id, false, TOKEN_EXPIRY_DATE, SECRET);
  await agent.get(`/api/v1/auth/verify?token=${token}`);
  return loginUser(agent, data);
};

export const getModelObjectId = async (model, obj) => {
  try {
    const [modelObject] = await model.findOrCreate({
      where: obj
    });
    const { id } = modelObject;
    return id;
  } catch (error) {
    console.log(error);
  }
};
