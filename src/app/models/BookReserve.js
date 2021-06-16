import { Model, DataTypes } from 'sequelize';

class BookReserve extends Model {
  static init(sequelize) {
    super.init(
      {
        returned: {
          type: DataTypes.BOOLEAN,
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
      foreignKey: 'user_id',
      as: 'reserveOwner',
    });
    this.belongsTo(models.Book, {
      foreignKey: 'book_id',
      as: 'book',
    });
  }
}

export default BookReserve;
