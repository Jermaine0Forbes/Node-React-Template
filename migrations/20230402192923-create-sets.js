'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Sets', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      parentInt: {
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
    .then( () => queryInterface.addConstraint('Terms',{
      type: "foreign key",
      name: "fk_terms_sets",
      fields:['setId'],
      references: {
        table: 'Sets',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }));
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Sets');
  }
};