'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

const getModel = (model) => {
  const x = db[model];
  // console.log(x)
  return x;
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  //  console.log(db[modelName])

  if (db[modelName].associate) {
    db[modelName].associate(db);
  }

  switch(modelName) {
    case 'Entries':
      db[modelName].belongsTo(getModel('Topics'));
      // db[modelName].belongsToMany(getModel('Tags'), { through: getModel('TagsToEntries')});
      db[modelName].belongsToMany(getModel('Tags'), { 
        through: 'tags-to-entries',
        as: 'tags',
        foreignKey: 'entryId'

      });
    break;
    case 'Tags':
      // db[modelName].belongsToMany(getModel('Entries'), { through: getModel('TagsToEntries')});
      db[modelName].belongsToMany(getModel('Entries'), { 
        through: 'tags-to-entries',
        as: 'entries',
        foreignKey: 'tagId'
      });
    break;
    // case 'TagsToEntries':
    //   db[modelName].belongsToMany(getModel('Tags'), { through: getModel('TagsToEntries')});
    // break;
   }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// console.log(db);

module.exports = db;
