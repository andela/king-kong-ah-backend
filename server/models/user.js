module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique:true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique:true
    },
    bio: {
      type: DataTypes.TEXT
    },
    imgUrl: {
      type: DataTypes.STRING
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    }
  }, {});
  User.associate = (models) => {
    // associations can be defined here
  };
  return User;
};