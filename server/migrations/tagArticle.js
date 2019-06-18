const TagArticles = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('TagArticles', {
    tagId: {
      allowNull: false,
      type: Sequelize.UUID,
    },
    articleId: {
      allowNull: false,
      type: Sequelize.UUID,
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
  down: queryInterface => queryInterface.dropTable('TagArticles')
};
export default TagArticles;
