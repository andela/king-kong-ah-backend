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
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Email is required.'
          },
          isEmail: {
            msg: 'Email field must be an email.'
          }
        }
      },
      username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Username is required.'
          }
        }
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
        default: false
      }
    },
    {}
  );

  User.beforeCreate(async (newUser) => {
    newUser.password = hashPassword(newUser.password);
  });

  User.associate = (models) => {
    // associations between user and article
    User.hasMany(models.Article, {
      foreignKey: 'userId',
      target: 'id',
      onDelete: 'CASCADE'
    });
  };

  return User;
};

export default user;
