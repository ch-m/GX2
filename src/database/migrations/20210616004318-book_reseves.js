module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('book_reserves', {
      id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: { model: 'users', key: 'id' },
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE',
      },
      book_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: { model: 'books', key: 'id' },
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE',
      },
      returned: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('book_reserves');
  },
};
