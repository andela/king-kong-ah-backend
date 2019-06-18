/* eslint-disable no-console */
import chai from 'chai';
import chaiAsPromise from 'chai-as-promised';
import models from '<serverModels>';

chai.use(chaiAsPromise);

const { expect } = chai;

const { Tag, sequelize } = models;

let tag;

before(async () => {
  try {
    await sequelize.sync({ force: true });
  } catch (error) {
    console.log(error);
  }
});

describe('Tag Model', async () => {
  it('should not allow empty tag name', async () => {
    try {
      const emptyTag = { name: '' };
      tag = await Tag.create(emptyTag);
    } catch (error) {
      await expect(error).to.be.an.instanceof(Error);
      await expect(error.errors[0].message).to.equal('Validation notEmpty on name failed');
    }
  });

  it('should not allow tag name that is numeral', async () => {
    try {
      const invalidTag = { name: 123 };
      tag = await Tag.create(invalidTag);
    } catch (error) {
      await expect(error).to.be.an.instanceof(Error);
      await expect(error.errors[0].message).to.equal('Tag can only be a string.');
    }
  });

  it('should create a tag', async () => {
    tag = await Tag.create({ name: 'excellence' });
    const { id, name } = tag;
    await expect(id).to.be.a('string');
    await expect(name).to.be.equal('excellence');
  });

  it('should not allow duplicate tag name', async () => {
    try {
      tag = await Tag.create({ name: 'excellence' });
      await expect(tag).to.equal(undefined);
    } catch (error) {
      await expect(error).to.be.an.instanceof(Error);
    }
  });

  it('should delete a tag', async () => {
    tag = await Tag.create({ name: 'collaboration' });
    await expect(tag.id).to.be.a('string');
    await Tag.destroy({ where: { id: tag.id } });
    const found = await Tag.findOne({ where: { id: tag.id } });
    await expect(found).to.equal(null);
  });
});
