'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
      await queryInterface.addConstraint('Terms',{
        type: "foreign key",
        name: "fk_terms_tags",
        fields:['tagId'],
        references: {
          table: 'Tags',
          field: 'id',
        },
        onDelete: 'cascade',
        onUpdate: 'cascade',
      }),
      await queryInterface.addConstraint('Questions', {
        type: "foreign key",
        name: "fk_questions_tests",
        fields:['testId'],
        references: {
          table: 'Tests',
          field: 'id',
        },
        onDelete: 'cascade',
        onUpdate: 'cascade',
      }),
      await queryInterface.addConstraint('Terms',{
        type: "foreign key",
        name: "fk_terms_sets",
        fields:['setId'],
        references: {
          table: 'Sets',
          field: 'id',
        },
        onDelete: 'cascade',
        onUpdate: 'cascade',
      }),
        await queryInterface.addConstraint('Tags',{
          type: "foreign key",
          name: "fk_tags_terms",
          fields:['termId'],
          references: {
            table: 'Terms',
            field: 'id',
          },
          onDelete: 'cascade',
          onUpdate: 'cascade',
        }),
        await queryInterface.addConstraint('Questions',{
          type: "foreign key",
          name: "fk_questions_terms",
          fields:['termId'],
          references: {
            table: 'Terms',
            field: 'id',
          },
          onDelete: 'cascade',
          onUpdate: 'cascade',
        }),
        await queryInterface.addConstraint('Sets',{
          type: "foreign key",
          name: "fk_sets_users",
          fields:['userId'],
          references: {
            table: 'Users',
            field: 'id',
          },
          onDelete: 'cascade',
          onUpdate: 'cascade',
        }),
        await queryInterface.addConstraint('Terms',{
          type: "foreign key",
          name: "fk_terms_users",
          fields:['userId'],
          references: {
            table: 'Users',
            field: 'id',
          },
          onDelete: 'cascade',
          onUpdate: 'cascade',
        }),
        await queryInterface.addConstraint('Questions',{
          type: "foreign key",
          name: "fk_questions_users",
          fields:['userId'],
          references: {
            table: 'Users',
            field: 'id',
          },
          onDelete: 'cascade',
          onUpdate: 'cascade',
        }), 
        await queryInterface.addConstraint('Tests',{
          type: "foreign key",
          name: "fk_tests_users",
          fields:['userId'],
          references: {
            table: 'Users',
            field: 'id',
          },
          onDelete: 'cascade',
          onUpdate: 'cascade',
        }),
    ]);
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
