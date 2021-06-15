import { Model, DataTypes } from 'sequelize';
import bcrypt from 'bcryptjs';

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
  }
}

export default Book;
