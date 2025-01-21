const {Model} = require('sequelize');
module.exports = function(sequelize, DataTypes) {
    class Tags extends Model {
      /**
       * Helper method for defining associations.
       * This method is not a part of Sequelize lifecycle.
       * The `models/index` file will call this method automatically.
       */
      static associate(models) {
        // define association here
      }
    }
  Tags.init({
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
    termId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'terms',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'tags',
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
        name: "fk_tags_terms",
        using: "BTREE",
        fields: [
          { name: "termId" },
        ]
      },
    ]
  });

  return Tags;
};
