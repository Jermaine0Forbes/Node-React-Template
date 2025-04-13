'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Entries', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      entry: {
        type: Sequelize.TEXT
      },
      topicId: {
        type: Sequelize.INTEGER,
        // unique: true,
        references: {
          model: "Topics",
          key: 'id'
        }
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }, {
       indexes: [
         {
           fields: ['topicId']
         }
       ]
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Entries');
  }
};
