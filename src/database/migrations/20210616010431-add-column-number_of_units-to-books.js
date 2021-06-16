module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('books', 'number_of_units', {
      type: Sequelize.INTEGER,
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('books', 'number_of_units');
  },
};
