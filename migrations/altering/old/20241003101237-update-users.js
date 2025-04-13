'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    return await queryInterface.describeTable('Users')
    .then( tableDefinition => {
      if(!tableDefinition['profileImage']) {
         return queryInterface.addColumn('Users', 'profileImage', {
           type: Sequelize.STRING,
         })
      }
       return Promise.resolve(true);
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
