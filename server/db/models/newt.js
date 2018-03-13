const { BOOLEAN, STRING, INTEGER, TEXT } = require('sequelize');
const db = require('../db');
const Tag = require('./tag');

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
  public: {
    type: BOOLEAN,
    defaultValue: false,
  },
});

Newt.prototype.addTagByName = async function (tagName) {
  // if (Tag) {
  //   console.log('Tag was found 1.');
  // } else {
  //   console.log('Tag was not found 1.');
  //   return;
  // }
  const tagId = await Tag.findIdByName(tagName);
  this.addTagge(tagId);
};

Newt.prototype.addTagsByNameArray = async function (tagNameArray) {
  // if (Tag) {
  //   console.log('Tag was found 2.');
  // } else {
  //   console.log('Tag was not found 2.');
  //   return;
  // }
  const tagFindingRequests = [];
  for (let i = 0; i < tagNameArray.length; i += 1) {
    console.log(`tagNameArray[${i}]: ${tagNameArray[i]}`);
    tagFindingRequests.push(Tag.findIdByName(tagNameArray[i]));
  }

  const tagIdArray = await Promise.all(tagFindingRequests);
  const realTagIdArray = tagIdArray.map(tag => tag.dataValues.id);
  console.log('realTagIdArray:', realTagIdArray);

  this.addTagges(realTagIdArray);
};

module.exports = Newt;
