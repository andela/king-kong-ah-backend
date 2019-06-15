import { tokenGenerator, getFullUrl, getBaseUrl } from '<helpers>/utils';
import { APP_NAME, getMailGenerator } from '<emails>/config';

const emailTemplate = link => ({
  body: {
    intro: `Welcome to ${APP_NAME}!`,
    action: {
      instructions:
        "You're almost there. To finish activating your account please click the link below.",
      button: {
        color: '#B02091',
        text: 'Activate Account',
        link
      }
    },
    outro: 'If you did not initiate this request, please ignore this mail.'
  }
});

const generateEmail = (user, req) => {
  const token = tokenGenerator(user.id, false, process.env.TOKEN_EXPIRY_DATE, process.env.SECRET);
  const baseUrl = getBaseUrl(getFullUrl(req));
  const mailGenerator = getMailGenerator(baseUrl);
  const email = emailTemplate(`${baseUrl}/verify?token=${token}`);
  const emailBody = mailGenerator.generate(email);
  return emailBody;
};

export default generateEmail;
