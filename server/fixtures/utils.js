const res = {
  cookie: (accessToken, tokenObj, options) => {
    res.accessToken = accessToken;
    res.token = tokenObj.token;
    res.options = options;
  }
};
export default res;
