/**
 * @param {object} sequelize
 * @param {object} DataTypes
 * @returns {object} Comment model
 */
const comment = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Comment should not be empty'
        }
      }
    },
    type: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  });
  Comment.associate = (models) => {
    Comment.belongsTo(models.User, {
      foreignKey: 'userId',
      target: 'id',
      as: 'user',
      onDelete: 'CASCADE'
    });
    Comment.belongsTo(models.Article, {
      foreignKey: 'articleId',
      onDelete: 'CASCADE'
    });
  };
  return Comment;
};

export default comment;
