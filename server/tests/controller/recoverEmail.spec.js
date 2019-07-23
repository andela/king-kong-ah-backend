import chai from 'chai';
import app from '<server>/app';

const { expect } = chai;

describe('Recover Email', () => {
  it('should not send email with an invalid email format', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/recoverEmail')
      .send({ email: '12' })
      .end((err, res) => {
        expect(res.status).to.be.equal(400);
        expect(res.body.message).to.equal('The email format is invalid.');
        done(err);
      });
  });

  it('should not send email with an incorrect email', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/recoverEmail')
      .send({ email: 'a@b.com' })
      .end((err, res) => {
        expect(res.status).to.be.equal(404);
        expect(res.body.message).to.equal('This email does not exist');
        done(err);
      });
  });

  it('should not send email with a correct email', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/recoverEmail')
      .send({ email: 'testing@authorshaven.com' })
      .end((err, res) => {
        expect(res.status).to.be.equal(200);
        expect(res.body.message).to.equal(
          'A verification mail has been sent to your email. Please follow that link to reset your password'
        );
        done(err);
      });
  });
});
