'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Tests', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      number: {
        type: Sequelize.INTEGER
      },
      correct: {
        type: Sequelize.INTEGER
      },
      wrong: {
        type: Sequelize.INTEGER
      },
      userId: {
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
    })
    .then( () => queryInterface.addConstraint('Questions', {
      type: "foreign key",
      name: "fk_questions_tests",
      fields:['testId'],
      references: {
        table: 'Tests',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }))
    ;
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Tests');
  }
};