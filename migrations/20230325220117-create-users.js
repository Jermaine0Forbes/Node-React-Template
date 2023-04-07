'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      email: {
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
    }).then( () => queryInterface.addConstraint('Sets',{
      type: "foreign key",
      name: "fk_sets_users",
      fields:['userId'],
      references: {
        table: 'Users',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    })).then( () => queryInterface.addConstraint('Terms',{
      type: "foreign key",
      name: "fk_terms_users",
      fields:['userId'],
      references: {
        table: 'Users',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    })).then( () => queryInterface.addConstraint('Questions',{
      type: "foreign key",
      name: "fk_questions_users",
      fields:['userId'],
      references: {
        table: 'Users',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    })).then( () => queryInterface.addConstraint('Tests',{
      type: "foreign key",
      name: "fk_tests_users",
      fields:['userId'],
      references: {
        table: 'Users',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    })).then( () => queryInterface.addConstraint('Tags',{
      type: "foreign key",
      name: "fk_tags_users",
      fields:['userId'],
      references: {
        table: 'Users',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }));
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};