import { createUniqueSlug, createEllipsis } from '<helpers>/utils';

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
      description: {
        type: DataTypes.TEXT,
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
      articleImage: {
        type: DataTypes.TEXT,
        allowNull: true,
        validate: {
          isUrl: {
            msg: 'Article image must be a url.'
          }
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
    newArticle.setDataValue('description', createEllipsis(newArticle.body));
  });


  Article.associate = (models) => {
    Article.belongsTo(models.User, {
      foreignKey: 'userId',
      target: 'id',
      as: 'user',
      onDelete: 'CASCADE'
    });


    Article.belongsTo(models.Category, {
      foreignKey: 'categoryId',
      as: 'category'
    });

    Article.belongsToMany(models.Tag, {
      through: 'TagArticles'
    });
  };
  return Article;
};
export default article;
