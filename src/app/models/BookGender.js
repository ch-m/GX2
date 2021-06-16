import { Model, DataTypes } from 'sequelize';

class BookGender extends Model {
  static init(sequelize) {
    super.init(
      {
        name: {
          type: DataTypes.STRING,
        },
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.hasMany(models.Book, {
      foreignKey: 'gender_id',
      as: 'books',
    });
  }
}

export default BookGender;
