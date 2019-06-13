import passport from 'passport';

export const googleAuth = () => passport.authenticate('google', {
  scope: ['profile', 'email']
});
export const googleAuthRedirect = () => passport.authenticate('google', { session: false });

export const facebookAuth = () => passport.authenticate('facebook');

export const facebookAuthRedirect = () => passport.authenticate('facebook', { session: false });

export const twitterAuth = () => passport.authenticate('twitter');

export const twitterAuthRedirect = () => passport.authenticate('twitter', { session: false });
