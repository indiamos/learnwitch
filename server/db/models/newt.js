const { BOOLEAN, STRING, INTEGER, TEXT } = require('sequelize');
const db = require('../db');

const Newt = db.define('newt', {
  title: {
    type: STRING,
    allowNull: false,
  },
  url: {
    type: STRING,
  },
  description: {
    type: TEXT,
  },
  minutes: {
    type: INTEGER,
  },
  source: {
    type: STRING,
  },
  goals: {
    type: TEXT,
  },
  progress: {
    type: INTEGER,
    defaultValue: 0,
    validate: {
      min: 0,
      max: 100,
    },
  },
  completed: {
    type: BOOLEAN,
    defaultValue: false,
  },
  rating: {
    type: INTEGER,
    validate: {
      min: 0,
      max: 10,
    },
  },
  highlights: {
    type: TEXT,
  },
});

module.exports = Newt;
