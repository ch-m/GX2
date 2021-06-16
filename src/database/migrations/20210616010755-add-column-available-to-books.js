module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('books', 'available_units', {
      type: Sequelize.INTEGER,
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('books', 'available_units');
  },
};
