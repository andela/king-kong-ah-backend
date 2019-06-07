import utils from '../helpers/utils';

const { createUniqueSlug } = utils;
const article = (sequelize, DataTypes) => {
  const Article = sequelize.define(
    'Article',
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        validate: {
          isUUID: 4
        }
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      slug: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: true
        }
      },
      body: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
        validate: {
          isUUID: 4
        }
      },
      isBlacklisted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      categoryId: {
        type: DataTypes.UUID,
        allowNull: false,
        validate: {
          isUUID: 4
        }
      },
      isPublished: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
    },
    {}
  );
  Article.beforeCreate((newArticle) => {
    newArticle.setDataValue('slug', createUniqueSlug(newArticle.title));
  });
  Article.associate = () => {
    // associations can be defined here
  };
  return Article;
};
export default article;
