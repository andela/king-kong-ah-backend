import socialAuthConfig from '<configs>/passport';
import FacebookStrategy from 'passport-facebook';
import GoogleStrategy from 'passport-google-oauth20';
import TwitterStrategy from 'passport-twitter';
import session from 'express-session';
import performCallback from './callback';

const setPassportMiddleware = (passport, server) => {
  server.use(passport.initialize());

  passport.use(new GoogleStrategy(socialAuthConfig.google, performCallback));
  passport.use('facebook', new FacebookStrategy(socialAuthConfig.facebook, performCallback));
  passport.use('twitter', new TwitterStrategy(socialAuthConfig.twitter, performCallback));

  server.use(
    session({
      secret: process.env.SECRET,
      resave: true,
      saveUninitialized: true
    })
  );
};
export default setPassportMiddleware;
