'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Terms', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
      },
      setId: {
        type: Sequelize.INTEGER
      },
      tagId: {
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
    .then( () => queryInterface.addConstraint('Tags',{
      type: "foreign key",
      name: "fk_tags_terms",
      fields:['termId'],
      references: {
        table: 'Terms',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    })).then( () => queryInterface.addConstraint('Questions',{
      type: "foreign key",
      name: "fk_questions_terms",
      fields:['termId'],
      references: {
        table: 'Terms',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }));
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Terms');
  }
};