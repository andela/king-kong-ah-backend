/* eslint-disable no-console */
import models from '<serverModels>';
import chai from 'chai';
import chaiAsPromise from 'chai-as-promised';

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
    } catch (error) {
      expect(error).to.be.an.instanceof(Error);
      expect(category).to.equal(undefined);
    }
  });

  it('should not allow category name that is numeral', async () => {
    try {
      const invalidCategory = { name: 123 };
      category = await Category.create(invalidCategory);
    } catch (error) {
      expect(category).to.equal(undefined);
      expect(error).to.be.an.instanceof(Error);
      expect(error.errors[0].message).to.equal('Category can only be a string.');
    }
  });

  it('should create an category', async () => {
    try {
      category = await Category.create({ name: 'defaults' });
    } catch (error) {
      console.log(error);
    }
    const { id, name } = category;

    expect(id).to.be.a('string');
    expect(name).to.be.equal('defaults');
  });

  it('should not allow duplicate category name', async () => {
    let newCategory;
    try {
      newCategory = await Category.create({ name: 'defaults' });
    } catch (error) {
      expect(newCategory).to.equal(undefined);
      expect(error).to.be.an.instanceof(Error);
    }
  });

  it('should delete a category', async () => {
    let found;

    try {
      await Category.destroy({ where: { id: category.id } });
      found = await Category.findOne({ where: { id: category.id } });
    } catch (error) {
      console.log(error);
    }
    expect(found).equal(null);
  });
});
