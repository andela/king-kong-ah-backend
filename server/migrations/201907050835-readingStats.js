const ReadingStats = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('ReadingStats', {
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
  down: queryInterface => queryInterface.dropTable('ReadingStats')
};
export default ReadingStats;
