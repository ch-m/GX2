import { Model, DataTypes } from 'sequelize';

class Book extends Model {
  static init(sequelize) {
    super.init(
      {
        name: {
          type: DataTypes.STRING,
        },
        synopsis: {
          type: DataTypes.BIGINT,
        },
        numberOfUnits: {
          field: 'number_of_units',
          type: DataTypes.INTEGER,
          defaultValue: 0,
        },
        availableUnits: {
          field: 'available_units',
          type: DataTypes.INTEGER,
        },
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, {
      foreignKey: 'user_creation_id',
      as: 'creator',
    });
    this.belongsTo(models.BookGender, {
      foreignKey: 'gender_id',
      as: 'gender',
    });
    this.belongsTo(models.Author, {
      foreignKey: 'author_id',
      as: 'author',
    });
    this.hasMany(models.BookReserve, {
      foreignKey: 'book_id',
      as: 'reserves',
    });
  }
}

export default Book;
