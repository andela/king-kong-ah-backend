import chai from 'chai';
import { tokenGenerator } from '<helpers>/utils';
import app from '<server>/app';

const { expect } = chai;
const token = tokenGenerator(
  'noid',
  false,
  process.env.TOKEN_EXPIRY_DATE,
  process.env.SECRET,
  'testing@authorshaven.com'
);
describe('Reset Password', () => {
  it('should not reset password if password and confirm password does not match', (done) => {
    chai
      .request(app)
      .patch(`/api/v1/auth/resetPassword?token=${token}`)
      .send({ password: 'abcfegt569', confirmPassword: 'abcfegt56' })
      .end((err, res) => {
        expect(res.status).to.be.equal(400);
        done(err);
      });
  });

  it('should not reset password if password has an incorrect format', (done) => {
    chai
      .request(app)
      .patch(`/api/v1/auth/resetPassword?token=${token}`)
      .send({ password: '569', confirmPassword: '569' })
      .end((err, res) => {
        expect(res.status).to.be.equal(400);
        expect(res.body.message.password)
          .to.be.an('array')
          .that.does.include('The password must be at least 8 characters.');
        done(err);
      });
  });

  it('should reset password with valid inputs', (done) => {
    chai
      .request(app)
      .patch(`/api/v1/auth/resetPassword?token=${token}`)
      .send({ password: 'abcfegt569', confirmPassword: 'abcfegt569' })
      .end((err, res) => {
        expect(res.status).to.be.equal(200);
        done(err);
      });
  });

  it('should not reset password with invalid link', (done) => {
    chai
      .request(app)
      .patch('/api/v1/auth/resetPassword?token')
      .send({ password: 'abcfegt569', confirmPassword: 'abcfegt569' })
      .end((err, res) => {
        expect(res.status).to.be.equal(400);
        done(err);
      });
  });
});
