module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('books', {
      id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      synopsis: {
        type: Sequelize.BIGINT,
        allowNull: true,
      },
      gender_id: {
        type: Sequelize.BIGINT,
        allowNull: true,
        references: { model: 'book_genders', key: 'id' },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      },
      user_creation_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: { model: 'users', key: 'id' },
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE',
      },
      author_id: {
        type: Sequelize.BIGINT,
        allowNull: true,
        references: { model: 'authors', key: 'id' },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('books');
  },
};
