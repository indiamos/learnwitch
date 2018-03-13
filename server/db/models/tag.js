const { STRING } = require('sequelize');
const db = require('../db');

const Tag = db.define('tag', {
  name: {
    type: STRING,
    allowNull: false,
    unique: true,
  },
});

Tag.findIdByName = function (name) {
  return Tag.findOne({
    where: { name },
    attributes: ['id'],
  });
};

module.exports = Tag;
