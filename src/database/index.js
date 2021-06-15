import { Sequelize } from 'sequelize';

import mysqlConfig from '../config/database';

import User from '../app/models/User';
import Book from '../app/models/Book';
import BookGender from '../app/models/BookGender';
import Author from '../app/models/Author';

const models = [User, Book, BookGender, Author];

class Database {
  constructor() {
    this.mysql();
  }

  mysql() {
    this.connection = new Sequelize(mysqlConfig);

    models
      .map((model) => model.init(this.connection))
      .forEach(
        (model) => model.associate && model.associate(this.connection.models)
      );
  }
}

export default new Database();
