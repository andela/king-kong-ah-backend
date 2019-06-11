import { getUserData } from '<fixtures>/user';

const signupUser = agent => new Promise((resolve) => {
  agent
    .post('/api/v1/auth/signup')
    .send(getUserData({
      email: 'johndoe@email.com', username: 'johndoee', password: '123456abcdef'
    }))
    .then(() => {
      agent
        .post('/api/v1/auth/login')
        .send({
          email: 'johndoe@email.com',
          password: '123456abcdef'
        })
        .then(() => {
          resolve();
        });
    });
});

export default signupUser;
