import { hashPassword } from '<helpers>/utils';

const user = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      oauthId: {
        unique: true,
        type: DataTypes.STRING
      },
      type: {
        allowNull: false,
        type: DataTypes.STRING,
        defaultValue: 'normal'
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
          isEmail: {
            msg: 'Email field must be an email.'
          }
        }
      },
      username: {
        type: DataTypes.STRING,
        unique: true
      },
      bio: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      profileImage: {
        type: DataTypes.TEXT,
        allowNull: true,
        validate: {
          isUrl: {
            msg: 'Profile image must be a url.'
          }
        }
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Last name is required.'
          }
        }
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'First name is required.'
          }
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Password is required.'
          }
        }
      },
      isAdmin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      isVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
    },
    {}
  );

  User.beforeCreate(async (newUser) => {
    newUser.password = hashPassword(newUser.password);
  });

  User.associate = (models) => {
    User.hasMany(models.Article, {
      foreignKey: 'userId',
      target: 'id',
      onDelete: 'CASCADE'
    });

    User.hasMany(models.Comment, {
      foreignKey: 'userId',
      target: 'id',
      onDelete: 'CASCADE'
    });

    User.hasMany(models.Rating, {
      foreignKey: 'userId',
      target: 'id',
      onDelete: 'CASCADE'
    });

    User.belongsToMany(models.User, {
      foreignKey: 'userId',
      otherKey: 'followerId',
      through: 'UserFollower',
      as: 'followers'
    });

    User.belongsToMany(models.Article, {
      through: 'ReadingStats',
      foreignKey: 'userId',
      target: 'id',
      as: 'Read',
      onDelete: 'CASCADE'
    });

    User.belongsToMany(models.Article, {
      through: 'Bookmark',
      foreignKey: 'userId',
      target: 'id',
      as: 'bookmark',
      onDelete: 'CASCADE'
    });
  };
  return User;
};

export default user;
