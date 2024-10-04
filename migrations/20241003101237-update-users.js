'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return await queryInterface.sequelize.transaction( t => {
      return Promise.all([
        queryInterface.addColumn('Users', 'profileImage', {
          type: Sequelize.DataTypes.STRING
        },
      { transaction: t },
      ),
      ]);

    })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
