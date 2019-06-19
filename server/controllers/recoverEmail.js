import generateResetEmail from '<emails>/recoverEmail';
import sendMail from '<helpers>/emails';

/**
 * @param {object} req - request body
 * @param {Object} res - response body
 * @return {object} res
 */
const recoverEmail = async (req, res) => {
  const { email } = req.body;

  const verificationEmail = generateResetEmail(email, req);

  await sendMail(
    process.env.SENDGRID_API_KEY,
    email,
    process.env.SENDGRID_FROM,
    'Recover Email',
    verificationEmail
  );
  res.status(200).send({
    status: 'success',
    message:
      'A verification mail has been sent to your email. Please follow that link to reset your password'
  });
};

export default recoverEmail;
