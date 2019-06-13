/* eslint-disable no-underscore-dangle */
const getProfile = (provider, picture) => {
  const pictureUrl = 'https://lklnioknfvoinhofv3hyHT7fV_I4Q/mo/photo.jpg';
  const profile = {
    id: '1234567hnijbh',
    provider
  };
  if (provider === 'google') {
    profile._json = {
      family_name: 'Ilori',
      given_name: 'Ezekiel',
      email: 'iloriezekiel@test.com'
    };
    if (picture) {
      profile._json.picture = pictureUrl;
    }
    return profile;
  }

  profile._json = {
    name: 'Ilori Ezekiel'
  };

  if (provider === 'facebook' && picture) {
    profile._json.picture = {
      data: {
        url: pictureUrl
      }
    };
  } else if (provider === 'twitter' && picture) {
    profile._json.profile_image_url_https = pictureUrl;
  }
  return profile;
};

export default getProfile;
