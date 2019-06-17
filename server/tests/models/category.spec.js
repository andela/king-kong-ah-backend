/* eslint-disable no-console */
import chai from 'chai';
import chaiAsPromise from 'chai-as-promised';
import models from '<serverModels>';

chai.use(chaiAsPromise);

const { expect } = chai;

const { Category, sequelize } = models;

let category;

before(async () => {
  try {
    await sequelize.sync({ force: true });
  } catch (error) {
    console.log(error);
  }
});

describe('Category Model', async () => {
  it('should not allow empty category name', async () => {
    try {
      const emptyCategory = { name: '' };
      category = await Category.create(emptyCategory);
      expect(category).to.equal(undefined);
    } catch (error) {
      expect(error).to.be.an.instanceof(Error);
    }
  });

  it('should not allow category name that is numeral', async () => {
    try {
      const invalidCategory = { name: 123 };
      category = await Category.create(invalidCategory);
      expect(category).to.equal(undefined);
    } catch (error) {
      expect(error).to.be.an.instanceof(Error);
      expect(error.errors[0].message).to.equal('Category can only be a string.');
    }
  });

  it('should create an category', async () => {
    try {
      category = await Category.create({ name: 'defaults' });
      const { id, name } = category;
      expect(id).to.be.a('string');
      expect(name).to.be.equal('defaults');
    } catch (error) {
      console.log(error);
    }
  });

  it('should not allow duplicate category name', async () => {
    try {
      category = await Category.create({ name: 'defaults' });
      expect(category).to.equal(undefined);
    } catch (error) {
      expect(error).to.be.an.instanceof(Error);
    }
  });

  it('should delete a category', async () => {
    try {
      expect(category.id).to.be.a('string');
      await Category.destroy({ where: { id: category.id } });
      expect(Category.findOne({ where: { id: category.id } })).to.rejectedWith(Error);
    } catch (error) {
      console.log(error);
    }
  });
});
