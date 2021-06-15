module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('book_genders', {
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
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('book_genders');
  },
};
