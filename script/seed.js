const db = require('../server/db');
const { Newt, Tag, User } = require('../server/db/models');
// const seedTags = require('./tagList');
const seedNewts = require('./newtList');
// const seedNewtTags = require('./newtTags');

async function seed() {
  await db.sync({ force: true });
  console.log('db synced!');

  const users = await Promise.all([
    User.create({ email: 'ampersand@indiamos.com', password: '123' }),
    User.create({ email: 'interrobang@indiamos.com', password: '123' }),
  ]);

  // const tags = await Tag.bulkCreate(seedTags);

  const newts = await Newt.bulkCreate(
    seedNewts,
    {
      include: [{
        model: Tag,
        as: 'tagges',
      }],
    },
  );

  console.log(`seeded ${users.length} users`);
  console.log(`seeded ${newts.length} newts`);
  // console.log(`seeded ${tags.length} tags`);
  console.log('seeded successfully');

  // // Adorn each new Newt with its respective tags
  // const attachYeTagges = [];
  // for (let i = 0; i < seedNewts.length; i += 1) {
  //   return Newt.findById(i+1)
  //     .then((thisNewt) => {
  //       console.log('thisNewt.dataValues.title:', thisNewt.dataValues.title);
  //       thisNewt.addTagsByNameArray(seedNewtTags[i])
  //     })
  //     .then(attachPromise => attachYeTagges.push(attachPromise))
  //     .catch();
  // }
  // await Promise.all(attachYeTagges);
  // console.log('Ye tagges have been attached.');
}

// Execute the `seed` function
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`
seed()
  .catch((err) => {
    console.error(err.message);
    console.error(err.stack);
    process.exitCode = 1;
  })
  .then(() => {
    console.log('closing db connection');
    db.close();
    console.log('db connection closed');
  });

/*
 * Note: Everything outside of the async function is totally synchronous
 * The console.log below will occur before any of the logs that occur inside
 * of the async function.
 */
console.log('seeding…');
