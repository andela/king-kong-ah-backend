import { tokenGenerator, getFullUrl, getBaseUrl } from '<helpers>/utils';
import { APP_NAME, getMailGenerator } from '<emails>/config';

const emailTemplate = link => ({
  body: {
    intro: `Welcome to ${APP_NAME}!`,
    action: {
      instructions:
        "You're almost there. To finish resetting your password, please click on this button below.",
      button: {
        color: '#B02091',
        text: 'Reset Password',
        link
      }
    },
    outro: 'If you did not initiate this request, please ignore this mail.'
  }
});

const generateResetEmail = (email, req) => {
  const token = tokenGenerator('', '', process.env.TOKEN_EXPIRY_DATE, process.env.SECRET, email);
  const baseUrl = getBaseUrl(getFullUrl(req));
  const mailGenerator = getMailGenerator(baseUrl);
  const mail = emailTemplate(`${baseUrl}/resetPassword?token=${token}`);
  const emailBody = mailGenerator.generate(mail);
  return emailBody;
};

export default generateResetEmail;
