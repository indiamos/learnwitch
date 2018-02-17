const Newt = require('./newt');
const Tag = require('./tag');
const User = require('./user');

Newt.belongsTo(User);
Newt.belongsToMany(Tag, { through: 'newt_tag' });
Newt.belongsToMany(Tag, { through: 'newt_tag' });

/* We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'.
 * For example, we can say: `const { User } = require('../db/models')`
 * instead of: `const User = require('../db/models/user')`
 */
module.exports = {
  Newt,
  Tag,
  User,
};
