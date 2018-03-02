const router = require('express').Router();

module.exports = router;

router.use('/newts', require('./newts'));
router.use('/tags', require('./tags'));
router.use('/users', require('./users'));

router.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});
