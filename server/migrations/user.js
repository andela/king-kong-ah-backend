const user = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Users', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    username: {
      type: Sequelize.STRING,
      unique: true
    },
    bio: {
      type: Sequelize.TEXT,
      allowNull: true
    },
    profileImage: {
      type: Sequelize.TEXT,
      allowNull: true
    },
    lastName: {
      type: Sequelize.STRING,
      allowNull: false
    },
    firstName: {
      type: Sequelize.STRING,
      allowNull: false
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    },
    isAdmin: {
      type: Sequelize.BOOLEAN,
      default: false
    },
    isVerified: {
      type: Sequelize.BOOLEAN,
      default: false
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
  down: queryInterface => queryInterface.dropTable('Users')
};

export default user;
