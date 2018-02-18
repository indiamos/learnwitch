const router = require('express').Router();

const {
  Newt,
  Tag,
} = require('../db/models');

module.exports = router;

// GET    /api/newts                          // returns all newt objects
// POST   /api/newts/addnewt                  // creates a new newt
// GET    /api/newts/:newtId                  // returns one newt object
// PUT    /api/newts/:newtId                  // updates a newt
// DELETE /api/newts/:newtId                  // deletes a newt

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
    .then(newnewt => res.status(201).json(newnewt))
    .catch(next));

// // GET /api/newts/:newtId
// // PUT /api/newts/:newtId
// // DELETE /api/newts/:newtId
// router.route('/:newtId')
// // Using findOne instead of findAll for GET, to avoid storing the whole newt text unnecessarily
//   .get((req, res, next) => Newt.findOne({
//     attributes: ['id', 'title', 'year', 'wordCount', 'uniqueCount', 'coverURL', 'pgURL', 'wikipediaURL', 'sentenceArray', 'wordMap'],
//     where: { id: req.params.newtId },
//     include: [{
//       model: Author,
//       as: 'Creators',
//       attributes: ['firstName', 'lastName'],
//     }],
//   })
//     .then(newt => res.json(newt))
//     .catch(next))
//   .put((req, res, next) => Newt.findById(req.params.newtId)
//     .then(newt => newt.update(req.body, {
//       returning: true,
//       plain: true,
//     }))
//     .then(updated => res.send({ message: 'Updated sucessfully', updated }))
//     .catch(next))
//   .delete((req, res, next) => Newt.findById(req.params.newtId)
//     .then(foundNewt => foundNewt.destroy())
//     .then(() => res.send({ message: 'Deleted successfully' }))
//     .catch(next));

// // ----------------------- BOOK-SENTENCE ROUTES --------------------------------

// // GET    /api/newts/:newtId/sentences        // returns all of a newt’s sentences
// // POST   /api/newts/:newtId/sentences        // stores all of a newt’s sentences
// // GET    /api/newts/:newtId/sentences/:word  // returns all of a newt’s sentences
// //                                               that contain a given word

// // Either GET or POST on /api/newts/:newtId/sentences will create a sentenceArray
// // if one doesn't yet exist. The difference is whether you get a saucy response.

// // GET /api/newts/:newtId/sentences
// //   Returns all of a newt’s sentences
// // POST /api/newts/:newtId/sentences
// //   Stores all of a newt’s sentences - should happen during the import process—
// //   probably as an afterCreate hook.
// router.route('/:newtId/sentences')
//   // 1. get the newt’s text
//   .get((req, res, next) => Newt.findById(req.params.newtId)
//   // 2. tokenize the text
//     .then((foundNewt) => {
//       let sentenceArray;
//       if (foundNewt.sentencesTokenized) {
//         sentenceArray = foundNewt.sentenceArray; // I'm a teapot
//       } else {
//         sentenceArray = sentenceTokenizer.tokenize(foundNewt.text);
//         foundNewt.update({
//           sentenceArray,
//           sentencesTokenized: true,
//         }, {
//           returning: true,
//           plain: true,
//         });
//       }
//       return sentenceArray;
//     // 3. build an array of objects
//     })
//     .then(allSentences => res.json(allSentences))
//     .catch(next))
//   // 1. get the newt’s text
//   .post((req, res, next) => Newt.findById(req.params.newtId)
//   // 2. tokenize the text
//     .then((foundNewt) => {
//       let sentenceArray;
//       let status;
//       if (foundNewt.sentencesTokenized) {
//         sentenceArray = foundNewt.sentenceArray;
//         status = 218; // I'm a teapot
//       } else {
//         status = 201;
//         sentenceArray = sentenceTokenizer.tokenize(foundNewt.text);
//         foundNewt.update({
//           sentenceArray,
//           sentencesTokenized: true,
//         }, {
//           returning: true,
//           plain: true,
//         });
//       }
//       return { sentenceArray, status };
//     })
//     .then(({ sentenceArray, status }) => res.status(status).json(sentenceArray))
//     .catch(next));

// // GET /api/newts/:newtId/sentences/:word
// // Returns all of a newt’s sentences that contain a given word
// router.get('/:newtId/sentences/:word', (req, res, next) => {
//   // Sentence.findAll({
//   //   where: {
//   //     newtId: req.params.newtId
//   //   }
//   // })
//   Newt.findById(req.params.newtId).sentenceArray
//     .then(newtSentences => newtSentences.filter(sentence => sentence.indexOf(req.params.word) > -1))
//     .then(wordSentences => res.json(wordSentences))
//     .catch(next);
// });

// // ------------------------ BOOK-WORD ROUTES -----------------------------------

// // GET    /api/newts/:newtId/words            // returns all words in a newt
// // POST   /api/newts/:newtId/words            // stores all of a newt’s words

// // Either GET or POST on /api/newts/:newtId/words will create a wordMap object
// // if one doesn't yet exist. The difference is whether you get a saucy response.

// function mapWords(arr) {
//   const map = {};
//   arr.forEach((word) => {
//     if (!Number(word)) {
//       map[word] = map[word] + 1 || 1;
//     }
//   });
//   return JSON.stringify(map);
// }

// // GET /api/newts/:newtId/words
// //   Returns a list of all words in a newt.
// //   If the newt has already been tokenized, retrieve the existing list.
// //   Otherwise, condense the array into an object, post it to the newt’s `wordMap`
// //   field, and then return the wordMap.
// // POST /api/newts/:newtId/words
// //   Stores all of a newt’s words
// //   If the newt has already been tokenized, say you’re a teapot.
// //   Otherwise, post the array to the newt’s `wordArray` field.
//   // 1. Get the newt object
// router.route('/:newtId/words')
//   .get((req, res, next) => Newt.findById(req.params.newtId)
//     .then((foundNewt) => {
//       let wordMap;
//       // 2. Check whether it's already been tokenized
//       if (foundNewt.wordsTokenized) {
//         wordMap = foundNewt.wordMap;
//       } else {
//       // 3. Tokenize the text
//         const wordArray = wordTokenizer.tokenize(foundNewt.text);
//         wordMap = mapWords(wordArray);
//         foundNewt.update({
//           wordMap,
//           wordsTokenized: true,
//           wordCount: wordArray.length,
//           uniqueCount: Object.keys(wordMap).length,
//         }, {
//           returning: true,
//           plain: true,
//         });
//       }
//       return wordMap;
//     })
//     .then(allWords => res.send(allWords))
//     .catch(next))
//   // 1. Get the newt object
//   .post((req, res, next) => Newt.findById(req.params.newtId)
//     .then((foundNewt) => {
//       let wordMap;
//       let status;
//       // 2. Check whether it's already been tokenized
//       if (foundNewt.wordsTokenized) {
//         wordMap = foundNewt.wordMap;
//         status = 218;
//       } else {
//         status = 201;
//         // 3. Tokenize the text
//         const wordArray = wordTokenizer.tokenize(foundNewt.text);
//         wordMap = mapWords(wordArray);
//         foundNewt.update({
//           wordMap,
//           wordsTokenized: true,
//           wordCount: wordArray.length,
//           uniqueCount: Object.keys(wordMap).length,
//         });
//       }
//       return { wordMap, status };
//     })
//     .then(({ wordMap, status }) => res.status(status).send(wordMap))
//     .catch(next));
