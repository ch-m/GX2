import { Model, DataTypes } from 'sequelize';
import bcrypt from 'bcryptjs';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        email: {
          type: DataTypes.STRING,
        },
        password: DataTypes.STRING,
        administrator: DataTypes.BOOLEAN,
      },
      {
        sequelize,
      }
    );

    this.addHook('beforeSave', async (user) => {
      if (user.changed('password')) {
        user.password = await bcrypt.hash(user.password, 10);
      }
    });

    return this;
  }

  static associate(models) {
    this.hasMany(models.Book, {
      foreignKey: 'user_creation_id',
      as: 'booksCreated',
    });
    this.hasMany(models.BookReserve, {
      foreignKey: 'user_id',
      as: 'myReserves',
    });
  }

  toJSON() {
    const properties = { ...this.get() };
    for (const field of ['password']) {
      delete properties[field];
    }
    return properties;
  }
}

export default User;
