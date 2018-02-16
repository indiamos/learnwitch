const User = require('./user');

/* If we had any associations to make, this would be a great place to put them!
 * E.g., if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

/* We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'.
 * For example, we can say: `const { User } = require('../db/models')`
 * instead of: `const User = require('../db/models/user')`
 */
module.exports = {
  User,
};
