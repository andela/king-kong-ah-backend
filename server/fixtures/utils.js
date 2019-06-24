export const res = {
  cookie: (accessToken, tokenObj, options) => {
    res.accessToken = accessToken;
    res.token = tokenObj.token;
    res.options = options;
  }
};

export const req = {
  cookies: {
    'access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9'
  },
  body: {}
};
