/**
 * @param {object} sequelize
 * @param {object} DataTypes
 * @returns {object} rating model
 */
const rating = (sequelize, DataTypes) => {
  const Rating = sequelize.define('Rating', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        max: {
          args: 5,
          msg: 'Rating cannot be more than five'
        },
        min: {
          args: 1,
          msg: 'Rating cannot be less than one'
        }
      }
    }
  });

  return Rating;
};

export default rating;
