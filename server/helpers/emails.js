import sgMail from '@sendgrid/mail';

/**
 * @param {string} sendgridApiKey
 * @param {string} to
 * @param {string} from
 * @param {string} subject
 * @param {string} html
 * @return {string} emailResponse
 */
const sendMail = async (sendgridApiKey, to, from, subject, html) => {
  sgMail.setApiKey(sendgridApiKey);
  const msg = {
    to,
    from,
    subject,
    html
  };
  const emailResponse = await sgMail.send(msg);
  return emailResponse;
};

export default sendMail;
