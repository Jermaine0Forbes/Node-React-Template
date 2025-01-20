'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Questions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      question: {
        type: Sequelize.STRING
      },
      termId: {
        type: Sequelize.INTEGER
      },
      correct: {
        // Need to establish the array in the 'questions' model
        type: Sequelize.ENUM('wrong','correct')
      },
      testId: {
        type: Sequelize.INTEGER
      },
      quizId: {
        type: Sequelize.INTEGER,
        // unique: true,
        references: {
          model: "Quizzes",
          key: 'id'
        }
      },
      entryId: {
        type: Sequelize.INTEGER,
        // unique: true,
        references: {
          model: "Entries",
          key: 'id'
        }
      },
      topicId: {
        type: Sequelize.INTEGER,
        // unique: true,
        references: {
          model: "Topics",
          key: 'id'
        }
      },
      answer: {
        type: Sequelize.TEXT,
      },
      userId: {
        type: Sequelize.INTEGER
      },
      termId: {
        type: Sequelize.INTEGER
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
           fields: ['topicId', 'entryId', 'quizId'],
         }
       ]
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Questions');
  }
};