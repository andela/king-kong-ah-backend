const Bookmark = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Bookmark', {
    userId: {
      allowNull: false,
      type: Sequelize.UUID
    },
    articleId: {
      allowNull: false,
      type: Sequelize.UUID
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  }),
  down: queryInterface => queryInterface.dropTable('Bookmark')
};
export default Bookmark;
