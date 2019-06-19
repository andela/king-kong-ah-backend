import uuidV4 from 'uuid/v4';

const Tag = {
  up: queryInterface => queryInterface.bulkInsert('Tags', [
    {
      id: uuidV4(),
      name: 'andela',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: uuidV4(),
      name: 'EPIC',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: uuidV4(),
      name: 'passion',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: uuidV4(),
      name: 'skydiving',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ], {}),

  down: queryInterface => queryInterface.bulkDelete('Tags', null, {})
};

export default Tag;
