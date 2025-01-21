const {Model} = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  class Questions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Questions.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    question: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    termId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    correct: {
      type: DataTypes.ENUM('wrong','correct'),
      allowNull: true
    },
    testId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    quizId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'quizzes',
        key: 'id'
      }
    },
    entryId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'entries',
        key: 'id'
      }
    },
    topicId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'topics',
        key: 'id'
      }
    },
    answer: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'questions',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "quizId",
        using: "BTREE",
        fields: [
          { name: "quizId" },
        ]
      },
      {
        name: "entryId",
        using: "BTREE",
        fields: [
          { name: "entryId" },
        ]
      },
      {
        name: "topicId",
        using: "BTREE",
        fields: [
          { name: "topicId" },
        ]
      },
    ]
  });

  return Questions;
};
