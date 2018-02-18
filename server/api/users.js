const router = require('express').Router();
const authMaster = require('klen-secure')();
const { User } = require('../db/models');

module.exports = router;

const userAuthenticator = new authMaster(User, null, true);
router.use(userAuthenticator.checkAuthorizations());

router.get('/', (req, res, next) => {
  User.findAll({
    attributes: ['id', 'email'],
  })
    .then(users => res.json(users))
    .catch(next);
});

router.get('/getAuthFailLog', userAuthenticator.getAuthFailLog(), (req, res, next) => {
  const log = req.user.authFailLog;
  res.json(log);
});
