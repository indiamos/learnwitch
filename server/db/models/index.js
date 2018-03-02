const Newt = require('./newt');
const Tag = require('./tag');
const User = require('./user');

// A many-to-many association such as
//   Model1.belongsToMany(Model2, {through: 'Model2Model1'});
//   Model2.belongsToMany(Model1, {through: 'Model2Model1'});
// creates the following association methods:
//   Model1.getModel2s, Model1.setModel2s, Model1.addModel2, Model1.addModel2s
//   Model2.getModel1s, Model2.setModel1s, Model2.addModel1, Model2.addModel1s.

Newt.belongsTo(User);

Newt.belongsToMany(Tag, { as: 'Tagges', through: 'newt_tag', foreignKey: 'newtteId' });
Tag.belongsToMany(Newt, { as: 'Newttes', through: 'newt_tag', foreignKey: 'taggeId' });
// These associations create the following methods:
// Newt.getTagges, Newt.setTagges, Newt.addTagge, Newt.addTagges
// Tag.getNewttes, Tag.setNewttes, Tag.addNewtte, Tag.addNewttes

/* Export all models here, so that any time a module needs a model, we can
 * require it from 'db/models'. For example, we can say:
 *   `const { User } = require('../db/models')`
 * instead of
 *   `const User = require('../db/models/user')`
 */
module.exports = {
  Newt,
  Tag,
  User,
};
