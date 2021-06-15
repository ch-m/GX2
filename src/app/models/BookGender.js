import { Model, DataTypes } from 'sequelize';
import bcrypt from 'bcryptjs';

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
    });/*
    this.belongsTo(models.PasswordRecovery, {
      foreignKey: 'password_recovery_id',
      as: 'passwordRecovery',
    });
    this.belongsTo(models.Role, {
      foreignKey: 'role_id',
      as: 'role',
    }); */
  }
}

export default BookGender;