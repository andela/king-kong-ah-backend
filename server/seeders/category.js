import uuidV4 from 'uuid/v4';

const Category = {
  up: queryInterface => queryInterface.bulkInsert('Categories', [
    {
      id: uuidV4(),
      name: 'defaults',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: uuidV4(),
      name: 'technology',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: uuidV4(),
      name: 'experiences',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: uuidV4(),
      name: 'adventure',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ], {}),

  down: queryInterface => queryInterface.bulkDelete('Categories', null, {})
};

export default Category;
