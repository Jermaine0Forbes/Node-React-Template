'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

     await queryInterface.describeTable('Tags')
    .then(tableDefinition => {
      if(!tableDefinition['userId']) {
        return queryInterface.addColumn("Tags", 'userId', {
           type: Sequelize.INTEGER,
           references:{
            model:'Users',
            key:'id'
           }
        },{
          indexes:[
            'userId',
          ]
        })
      }
      return Promise.resolve(true)
    });

    await queryInterface.describeTable('Tags')
    .then(tableDefinition => {
       if(tableDefinition['termId']){
        return queryInterface.removeColumn('Tags', 'termId');
       }

       return Promise.resolve(true);
    });


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
