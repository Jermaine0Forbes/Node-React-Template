const {Model} = require('sequelize');
module.exports = function(sequelize, DataTypes) {

    class Terms extends Model {
      /**
       * Helper method for defining associations.
       * This method is not a part of Sequelize lifecycle.
       * The `models/index` file will call this method automatically.
       */
      static associate(models) {
        // define association here
      }
    }

    Terms.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    setId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'sets',
        key: 'id'
      }
    },
    tagId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'tags',
        key: 'id'
      }
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'terms',
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
        name: "fk_terms_tags",
        using: "BTREE",
        fields: [
          { name: "tagId" },
        ]
      },
      {
        name: "fk_terms_sets",
        using: "BTREE",
        fields: [
          { name: "setId" },
        ]
      },
      {
        name: "fk_terms_users",
        using: "BTREE",
        fields: [
          { name: "userId" },
        ]
      },
    ]
  });

  return Terms;
};
