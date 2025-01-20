'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Topics', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      subtopic: {
        type: Sequelize.INTEGER
      },
      parentTopicId: {
        // unique: true,
        type: Sequelize.INTEGER,
        references: {
           model: "Topics",
           key: 'id'
        }
      },
      userId: {
        type: Sequelize.INTEGER,
        // unique: true,
        references: {
          model: "Users",
          key: 'id'
        }
      },
      title: {
        type: Sequelize.STRING
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
           fields: ['userId', 'parentTopicId']
         }
       ]
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Topics');
  }
};
