const category = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true,
        notNull: {
          msg: 'Category name is required.'
        },
        isAlpha: {
          msg: 'Category can only be a string.'
        }
      }
    }
  });

  Category.associate = (models) => {
    Category.hasMany(models.Article, {
      foreignKey: 'categoryId',
      as: 'category'
    });
  };
  return Category;
};
export default category;
