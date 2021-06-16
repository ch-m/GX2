import { Model, DataTypes } from 'sequelize';

class Author extends Model {
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
      foreignKey: 'author_id',
      as: 'books',
    });
  }
}

export default Author;
