const router = require('express').Router();

const {
  Newt,
  Tag,
} = require('../db/models');

module.exports = router;

// ----------------------------- API Summary -----------------------------------
// GET     /api/newts          // returns all newt objects
// POST    /api/newts/addnewt  // creates a new newt
// GET     /api/newts/:newtId  // returns one newt object
// PUT     /api/newts/:newtId  // updates a newt
// DELETE  /api/newts/:newtId  // deletes a newt
// -----------------------------------------------------------------------------

// GET /api/newts - returns all newt objects
router.get('/', (req, res, next) => Newt.findAll({
  include: [{
    model: Tag,
    as: 'Tagges',
  }],
})
  .then(foundNewts => res.json(foundNewts))
  .catch(next));

// POST /api/newts/addnewt
router.post('/addnewt', (req, res, next) => Newt.create(req.body)
  .then(newNewt => res.status(201).json(newNewt))
  .catch(next));

// GET /api/newts/:newtId
// PUT /api/newts/:newtId
// DELETE /api/newts/:newtId
router.route('/:newtId')
  .get((req, res, next) => Newt.findOne({
    where: { id: req.params.newtId },
    include: [{
      model: Tag,
      as: 'Tagges',
    }],
  })
    .then(foundNewt => res.json(foundNewt))
    .catch(next))
  .put((req, res, next) => Newt.findById(req.params.newtId)
    .then(foundNewt => foundNewt.update(req.body, {
      returning: true,
      plain: true,
    }))
    .then(updated => res.send({ message: 'Updated sucessfully', updated }))
    .catch(next))
  .delete((req, res, next) => Newt.findById(req.params.newtId)
    .then(foundNewt => foundNewt.destroy())
    .then(() => res.send({ message: 'Deleted successfully' }))
    .catch(next));
