const userFollower = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('UserFollower', {
    userId: {
      allowNull: false,
      type: Sequelize.UUID,
    },
    followerId: {
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
  down: queryInterface => queryInterface.dropTable('UserFollower')
};
export default userFollower;
