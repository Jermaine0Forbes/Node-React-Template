'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Tags-to-Entries', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: 'id'
        }
      },
      entryId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Entries",
          key: 'id'
        }
      },
      tagId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Tags",
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
           fields: ['tagId', 'entryId', 'userId']
         }
       ]
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Tags-to-Entries');
  }
};
