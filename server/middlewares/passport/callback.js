/* eslint-disable camelcase */
/* eslint-disable no-underscore-dangle */

const performCallback = async (accessToken, refreshToken, profile, done) => {
  const { id, provider } = profile;
  const { picture, name } = profile._json;
  const user = {
    oauthId: id,
    password: `${Date.now()}${process.env.SECRET}`,
    type: provider,
    isVerified: true
  };

  if (provider === 'google') {
    const { family_name, given_name, email } = profile._json;
    user.lastName = family_name;
    user.firstName = given_name;
    user.email = email;

    if (picture && picture.trim() !== '') {
      user.profileImage = picture.trim();
    }
  } else {
    const [lastName, firstName] = name.split(' ');
    user.lastName = lastName;
    user.firstName = firstName;

    const photo = provider === 'facebook'
      ? picture && picture.data && picture.data.url
      : profile._json.profile_image_url_https;

    if (photo && photo.trim() !== '') {
      user.profileImage = photo.trim();
    }
  }
  return done(null, user);
};
export default performCallback;
