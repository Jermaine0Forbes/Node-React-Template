var DataTypes = require("sequelize").DataTypes;
var _entries = require("./entries");
var _questions = require("./questions");
var _quizzes = require("./quizzes");
var _sequelizemeta = require("./sequelizemeta");
var _sets = require("./sets");
var _tags = require("./tags");
var _terms = require("./terms");
var _tests = require("./tests");
var _topics = require("./topics");
var _users = require("./users");

function initModels(sequelize) {
  var entries = _entries(sequelize, DataTypes);
  var questions = _questions(sequelize, DataTypes);
  var quizzes = _quizzes(sequelize, DataTypes);
  var sequelizemeta = _sequelizemeta(sequelize, DataTypes);
  var sets = _sets(sequelize, DataTypes);
  var tags = _tags(sequelize, DataTypes);
  var terms = _terms(sequelize, DataTypes);
  var tests = _tests(sequelize, DataTypes);
  var topics = _topics(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);

  questions.belongsTo(entries, { as: "entry", foreignKey: "entryId"});
  entries.hasMany(questions, { as: "questions", foreignKey: "entryId"});
  questions.belongsTo(quizzes, { as: "quiz", foreignKey: "quizId"});
  quizzes.hasMany(questions, { as: "questions", foreignKey: "quizId"});
  terms.belongsTo(sets, { as: "set", foreignKey: "setId"});
  sets.hasMany(terms, { as: "terms", foreignKey: "setId"});
  terms.belongsTo(tags, { as: "tag_tag", foreignKey: "tagId"});
  tags.hasMany(terms, { as: "tag_terms", foreignKey: "tagId"});
  tags.belongsTo(terms, { as: "term", foreignKey: "termId"});
  terms.hasMany(tags, { as: "tags", foreignKey: "termId"});
  entries.belongsTo(topics, { as: "topic", foreignKey: "topicId"});
  topics.hasMany(entries, { as: "entries", foreignKey: "topicId"});
  questions.belongsTo(topics, { as: "topic", foreignKey: "topicId"});
  topics.hasMany(questions, { as: "questions", foreignKey: "topicId"});
  topics.belongsTo(topics, { as: "parentTopic", foreignKey: "parentTopicId"});
  topics.hasMany(topics, { as: "topics", foreignKey: "parentTopicId"});
  quizzes.belongsTo(users, { as: "user", foreignKey: "userId"});
  users.hasOne(quizzes, { as: "quiz", foreignKey: "userId"});
  sets.belongsTo(users, { as: "user", foreignKey: "userId"});
  users.hasMany(sets, { as: "sets", foreignKey: "userId"});
  terms.belongsTo(users, { as: "user", foreignKey: "userId"});
  users.hasMany(terms, { as: "terms", foreignKey: "userId"});
  tests.belongsTo(users, { as: "user", foreignKey: "userId"});
  users.hasMany(tests, { as: "tests", foreignKey: "userId"});
  topics.belongsTo(users, { as: "user", foreignKey: "userId"});
  users.hasMany(topics, { as: "topics", foreignKey: "userId"});

  return {
    entries,
    questions,
    quizzes,
    sequelizemeta,
    sets,
    tags,
    terms,
    tests,
    topics,
    users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
