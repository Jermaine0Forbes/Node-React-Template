'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TagsToEntries extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  TagsToEntries.init({
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
    }
  }, {
    sequelize,
    modelName: 'TagsToEntries',
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
        name: "userId",
        using: "BTREE",
        fields: [
          { name: "userId" },
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
        name: "tagId",
        using: "BTREE",
        fields: [
          { name: "tagId" },
        ]
      },
    ]
  });
  return TagsToEntries;
};