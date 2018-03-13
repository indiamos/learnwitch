/* Welcome to the seed file! This seed file uses a newer language feature called...
 *
 *                  -=-= ASYNC...AWAIT -=-=
 *
 * Async-await is a joy to use! Read more about it in the MDN docs:
 *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
 *
 * Now that you've got the main idea, check it out in practice below!
 */
const db = require('../server/db');
const { User } = require('../server/db/models');

const seedNewts = [
  {
    title: 'Exercises for Programmers: 57 Challenges to Develop Your Coding Skills',
    url: 'https://www.safaribooksonline.com/library/view/exercises-for-programmers/9781680501513/',
    description: 'streaming e-book',
    minutes: 15,
    source: 'SafariBooksOnline',
    goals: 'professional development',
    userId: 1,
  },
  {
    title: 'Grow with Google Challenge Scholarship: Mobile Web',
    url: 'https://classroom.udacity.com/courses/ud899-gwg',
    description: 'video course',
    minutes: 13,
    source: '',
    goals: '',
    userId: 2,
  },
  {
    title: 'The Coding Interview Bootcamp: Algorithms + Data Structures',
    url: 'https://www.udemy.com/coding-interview-bootcamp-algorithms-and-data-structure/',
    description: 'video course',
    minutes: 12,
    source: '',
    goals: '',
    userId: 1,
  },
  {
    title: 'Learning React Native, 2nd Edition',
    url: 'https://www.safaribooksonline.com/library/view/learning-react-native/9781491989135/',
    description: 'streaming e-book',
    minutes: 8,
    source: 'SafariBooksOnline',
    goals: '',
    userId: 2,
  },
  {
    title: 'AlgoExpert',
    url: 'https://www.algoexpert.io/product',
    description: 'interactive learning',
    minutes: 2,
    source: 'Fullstack Academy',
    goals: 'interview prep,',
    userId: 1,
  },
  {
    title: 'A Common-Sense Guide to Data Structures and Algorithms: Level Up Your Core Programming Skills',
    url: 'https://www.safaribooksonline.com/library/view/a-common-sense-guide/9781680502794/',
    description: 'streaming e-book',
    minutes: 0,
    source: 'SafariBooksOnline',
    goals: '',
    userId: 2,
  },
];

const seedTags = [
  { name: 'a11y' },
  { name: 'Agile' },
  { name: 'Agile methodology' },
  { name: 'AJAX' },
  { name: 'algorithms' },
  { name: 'Android' },
  { name: 'Angular' },
  { name: 'Angular 2' },
  { name: 'Angular 4' },
  { name: 'AngularJS' },
  { name: 'APIs' },
  { name: 'architecture' },
  { name: 'AWS' },
  { name: 'AWS Lambda' },
  { name: 'back-end' },
  { name: 'Bayesian analysis' },
  { name: 'BDD' },
  { name: 'biography' },
  { name: 'Bootstrap' },
  { name: 'C#' },
  { name: 'CanJS' },
  { name: 'Canvas' },
  { name: 'Chrome' },
  { name: 'CLI' },
  { name: 'Clojure' },
  { name: 'closure' },
  { name: 'code quality' },
  { name: 'CoffeeScript' },
  { name: 'communication' },
  { name: 'CouchDB' },
  { name: 'CS' },
  { name: 'CSS' },
  { name: 'CSS animations' },
  { name: 'CSS Grid' },
  { name: 'CSS transform' },
  { name: 'CSS transitions' },
  { name: 'D3.js' },
  { name: 'data analysis' },
  { name: 'data science' },
  { name: 'data structures' },
  { name: 'data visualization' },
  { name: 'database' },
  { name: 'debugging' },
  { name: 'deploying' },
  { name: 'design patterns' },
  { name: 'DevOps' },
  { name: 'Digital Ocean' },
  { name: 'Docker' },
  { name: 'Elixir' },
  { name: 'Elm' },
  { name: 'Ember' },
  { name: 'Erlang' },
  { name: 'ES2015' },
  { name: 'ES6' },
  { name: 'exercises' },
  { name: 'Express' },
  { name: 'Factor' },
  { name: 'Fetch API' },
  { name: 'Firebase' },
  { name: 'Flexbox' },
  { name: 'front-end' },
  { name: 'full-stack' },
  { name: 'functional programming' },
  { name: 'git' },
  { name: 'GitHub' },
  { name: 'Golang' },
  { name: 'GraphQL' },
  { name: 'GUI' },
  { name: 'hardware' },
  { name: 'Haskell' },
  { name: 'HBase' },
  { name: 'history' },
  { name: 'HTML' },
  { name: 'Idris' },
  { name: 'Immutant' },
  { name: 'InDesign' },
  { name: 'interview prep' },
  { name: 'interviewing' },
  { name: 'Io' },
  { name: 'iOS' },
  { name: 'IoT' },
  { name: 'Java' },
  { name: 'JavaScript' },
  { name: 'Jekyll' },
  { name: 'job hunting' },
  { name: 'jQuery' },
  { name: 'Julia' },
  { name: 'leadership' },
  { name: 'lean' },
  { name: 'Linux' },
  { name: 'Lua' },
  { name: 'machine learning' },
  { name: 'map/reduce' },
  { name: 'Markdown' },
  { name: 'math' },
  { name: 'Matplotlib' },
  { name: 'MEAN stack' },
  { name: 'Meteor' },
  { name: 'MiniKanren' },
  { name: 'mobile web' },
  { name: 'MongoDB' },
  { name: 'MySQL' },
  { name: 'Natural Language Processing' },
  { name: 'Neo4J' },
  { name: 'networking' },
  { name: 'Node' },
  { name: 'OOP' },
  { name: 'Page Layout' },
  { name: 'penetration testing' },
  { name: 'performance' },
  { name: 'PHP' },
  { name: 'PMP' },
  { name: 'PostgreSQL' },
  { name: 'practice' },
  { name: 'product design' },
  { name: 'product management' },
  { name: 'productivity' },
  { name: 'professional development' },
  { name: 'progressive enhancement' },
  { name: 'progressive web apps' },
  { name: 'project management' },
  { name: 'Prolog' },
  { name: 'public speaking' },
  { name: 'PureCSS' },
  { name: 'Python' },
  { name: 'R' },
  { name: 'Rails' },
  { name: 'Raspberry Pi' },
  { name: 'React' },
  { name: 'React Native' },
  { name: 'React Router' },
  { name: 'reactive programming' },
  { name: 'Redis' },
  { name: 'Redux' },
  { name: 'RegEx' },
  { name: 'responsive design' },
  { name: 'REST' },
  { name: 'Riak' },
  { name: 'Ring' },
  { name: 'Ruby' },
  { name: 'Ruby on Rails' },
  { name: 'RubyMotion' },
  { name: 'Sass' },
  { name: 'Scala' },
  { name: 'scope' },
  { name: 'Scrum' },
  { name: 'security' },
  { name: 'serverless' },
  { name: 'Sinatra' },
  { name: 'soft skills' },
  { name: 'Spark' },
  { name: 'SQL' },
  { name: 'SQLite3' },
  { name: 'static sites' },
  { name: 'study skills' },
  { name: 'SVG' },
  { name: 'Swift' },
  { name: 'TDD' },
  { name: 'testing' },
  { name: 'TypeScript' },
  { name: 'UX' },
  { name: 'version control' },
  { name: 'Vim' },
  { name: 'Vue Router' },
  { name: 'VueJS' },
  { name: 'Vuex' },
  { name: 'waterfall' },
  { name: 'Webmachine' },
  { name: 'Webpack' },
  { name: 'whiteboarding' },
  { name: 'Windows' },
  { name: 'women in tech' },
  { name: 'writing' },
  { name: 'Xamarin' },
  { name: 'Yesod' },
];

async function seed() {
  await db.sync({ force: true });
  console.log('db synced!');
  // Whoa! Because we `await` the promise that db.sync returns, the next line
  // will not be executed until that promise resolves!

  const users = await Promise.all([
    User.create({ email: 'ampersand@indiamos.com', password: '123' }),
    User.create({ email: 'interrobang@indiamos.com', password: '123' }),
  ]);
  // Wowzers! We can even `await` on the right-hand side of the assignment
  // operator and store the result that the promise resolves to in a variable!
  // This is nice!
  console.log(`seeded ${users.length} users`);
  console.log('seeded successfully');
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
