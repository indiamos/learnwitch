const router = require('express').Router();
const { Op } = require('sequelize');

const {
  Newt,
  Tag,
} = require('../db/models');

module.exports = router;

// ----------------------------- API Summary -----------------------------------
// GET    /api/tags/all             // returns all tags used on newts that are
//                                     accessible to the logged-in user (are
//                                     public, belong to the user, or are shared
//                                     with the user); if not logged in, only
//                                     tags used on public newts are shown;
//                                     corresponding newts are eagerly loaded
// GET    /api/tags/all/:tagName    // returns all newts having the specified
//                                     tag that are accessible to the logged-in
//                                     user (are public, belong to the user, or
//                                     are shared with the user); if not logged
//                                     in, only public newts are shown
// GET    /api/tags/user            // returns all tags used on newts that are
//                                     owned by the logged-in user;
//                                     corresponding newts are eagerly loaded
// GET    /api/tags/user/:tagName   // returns all newts having the specified
//                                     tag that are owned by the logged-in user
// POST   /api/tags/                // creates a new tag
// PUT    /api/tags/:tagName        // DOES NOT LITERALLY UPDATE A TAG RECORD.
//                                     let oldTagName = :tagName from the route
//                                     let newTagName = the tagName supplied in
//                                       the request body
//                                     1. If `newTagName` does not yet have a
//                                        table row, a new row for it is added.
//                                     2. All newts owned by the logged-in user
//                                        that have the tag `oldTagName` get
//                                        `newTagName` instead.
//                                     3. If `oldTagName` is orphaned by step 2
//                                        (i.e., no newts by any user have that
//                                        tag anymore), `oldTagName` is deleted.
// DELETE /api/tags/:tagName          // DOES NOT NECESSARILY DELETE A TAG RECORD.
//                                     1. :tagName is removed from all newts
//                                        owned by the logged-in user.
//                                     2. If :tagName is orphaned by step 1
//                                        (i.e., no newts by any user have that
//                                        tag anymore), :tagName is deleted.
// -----------------------------------------------------------------------------

// GET  /api/tags/all  // returns all tags used on newts that are accessible to
//                        the logged-in user (are public, belong to the user, or
//                        are shared with the user); if not logged in, only tags
//                        used on public newts are shown; corresponding newts
//                        are eagerly loaded
// NOTE: This code doesn't yet identify the logged-in user.
router.get('/all', (req, res, next) => {
  return Tag.findAll({
    include: [{
      model: Newt,
      as: 'Newttes',
      where: {
        [Op.or]: [
          { public: true },
          // { userId: req.headers.user.id },
        ],
      },
    }],
  })
    .then(foundTags => res.json(foundTags))
    .catch(next);
});

// GET  /api/tags/all/:tagName  // returns all newts having the specified tag
//                                 that are accessible to the logged-in user
//                                 (are public, belong to the user, or are
//                                 shared with the user); if not logged in,
//                                 only public newts are shown
// NOTE: This code doesn't yet identify the logged-in user.
router.get('/all/:tagName', (req, res, next) => {
  return Tag.findAll({
    where: { name: req.params.tagName },
    include: [{
      model: Newt,
      as: 'Newttes',
      where: {
        [Op.or]: [
          { public: true },
          // { userId: req.headers.user.id },
        ],
      },
    }],
  })
    .then(foundTags => res.json(foundTags))
    .catch(next);
});

// GET  /api/tags/user  // returns all tags used on newts that are owned by the
//                         logged-in user; corresponding newts are eagerly
//                         loaded
router.get('/user', (req, res, next) => Tag.findAll({
  include: [{
    model: Newt,
    as: 'Newttes',
    where: { userId: req.user.id },
  }],
})
  .then(foundTags => res.json(foundTags))
  .catch(next));

// GET  /api/tags/user/:tagName  // returns all newts having the specified tag
//                                  that are owned by the logged-in user
router.get('/user/:tagName', (req, res, next) => {
  return Tag.findAll({
    where: { name: req.params.tagName },
    include: [{
      model: Newt,
      as: 'Newttes',
      where: { userId: req.user.id },
    }],
  })
    .then(foundTags => res.json(foundTags))
    .catch(next);
});

// POST  /api/tags/  // creates a new tag
router.post('/', (req, res, next) => Tag.create(req.body)
  .then(newTag => res.status(201).json(newTag))
  .catch(next));

// PUT  /api/tags/:tagName  // DOES NOT LITERALLY UPDATE A TAG RECORD.
//                             let oldTagName = :tagName from the route
//                             let newTagName = the tagName supplied in the
//                               request body
//                             1. If `newTagName` does not yet have a table row,
//                                a new row for it is added.
//                             2. All newts owned by the logged-in user that
//                                have the tag `oldTagName` get `newTagName`
//                                instead.
//                             3. If `oldTagName` is orphaned by step 2 (i.e.,
//                                no newts by any user have that tag anymore),
//                                `oldTagName` is deleted.
// DELETE  /api/tags/:tagName  // DOES NOT NECESSARILY DELETE A TAG RECORD.
//                                1. :tagName is removed from all newts owned by
//                                   the logged-in user.
//                                2. If :tagName is orphaned by step 1 (i.e., no
//                                   newts by any user have that tag anymore),
//                                   :tagName is deleted.
// For now, though, `put` and `delete` just work as usual.
router.route('/:tagName')
  .put((req, res, next) => Tag.findOne({
    where: { name: req.params.tagName },
  })
    .then(foundTag => foundTag.update(req.body, {
      returning: true,
      plain: true,
    }))
    .then(updated => res.send({ message: 'Updated sucessfully', updated }))
    .catch(next))
  .delete((req, res, next) => Tag.findOne({
    where: { name: req.params.tagName },
  })
    .then(foundTag => foundTag.destroy())
    .then(() => res.send({ message: 'Deleted successfully' }))
    .catch(next));
