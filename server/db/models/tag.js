const { STRING } = require('sequelize');
const db = require('../db');

const Tag = db.define('tag', {
  name: {
    type: STRING,
    allowNull: false,
    unique: true,
  },
 });

module.exports = Tag;
