const {
  FACEBOOK_CLIENT_ID,
  TWITTER_CLIENT_ID,
  TWITTER_CLIENT_SECRET,
  FACEBOOK_CLIENT_SECRET,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  HOST
} = process.env;

const socialAuthConfig = {
  facebook: {
    clientID: FACEBOOK_CLIENT_ID,
    clientSecret: FACEBOOK_CLIENT_SECRET,
    callbackURL: `${HOST}/api/v1/auth/facebook/redirect`,
    profileFields: ['id', 'displayName', 'photos', 'email']
  },
  google: {
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: '/api/v1/auth/google/redirect'
  },
  twitter: {
    consumerKey: TWITTER_CLIENT_ID,
    consumerSecret: TWITTER_CLIENT_SECRET,
    callbackURL: `${HOST}/api/v1/auth/twitter/redirect`,
    profileFields: ['id', 'displayName', 'photos', 'email']
  }
};
export default socialAuthConfig;
