const tag = (sequelize, DataTypes) => {
  const Tag = sequelize.define(
    'Tag',
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
      name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
          notEmpty: true,
          notNull: {
            msg: 'Tag name is required.'
          },
          isAlpha: {
            msg: 'Tag can only be a string.'
          }
        }
      }
    }
  );


  Tag.associate = (models) => {
    Tag.belongsToMany(models.Article, {
      through: 'TagArticles'
    });
  };
  return Tag;
};
export default tag;
