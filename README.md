# Learnwitch

Learnwitch is based on https://github.com/FullstackAcademy/boilermaker

Merge in the latest updates by entering:

```
git fetch boilermaker
git merge boilermaker/master
```

## Setup

* `npm install`, or `yarn install` - whatever you're into
* Create two postgres databases: `learnwitch` and `learnwitch-test`
  * By default, running `npm test` will use `learnwitch-test`, while regular development uses `learnwitch`
* Create a file called `secrets.js` in the project root
  * This file is `.gitignore`'d, and will *only* be required in your *development* environment
  * Its purpose is to attach the secret env variables that you'll use while developing. **Do not** push it to Github, or you will make your API keys public.
  * It might look like this:

  ```
    process.env.GOOGLE_CLIENT_ID = 'hush hush'
    process.env.GOOGLE_CLIENT_SECRET = 'pretty secret'
    process.env.GOOGLE_CALLBACK = '/auth/google/callback'
  ```

* To use OAuth with Google, complete the step above with a real client ID and client secret from Google
  * You can get them here: https://console.developers.google.com/apis/credentials
* Finally, complete the section below to set up your linter

## Linting

This project comes with the Airbnb linter (ESLint, with `eslint-config-airbnb`) "out of the box." Any linter rule that you object to can be overridden in `.eslintrc.json`. You may also choose an entirely different config if you don't like this one:

* [Standard style guide](https://standardjs.com/)
* [Google style guide](https://google.github.io/styleguide/jsguide.html)

## Start

Build with webpack and start the server in one step:

`npm run start-dev` will make great things happen!

To run the server or webpack separately, use
`npm run start-server`
`npm run build-client`

## Deployment to Heroku

### Prep
1. Set up the [Heroku command line tools](https://devcenter.heroku.com/articles/heroku-cli)
2. `heroku login`
3. Add a git remote for heroku:
  - **If you're creating a new app...**
    1. `heroku create` or `heroku create your-app-name` if you have a name in mind.
    2. `heroku addons:create heroku-postgresql:hobby-dev` to add ("provision") a postgres database to your heroku dyno

  - **If you already have a Heroku app...**
    1.  `heroku git:remote your-app-name` You'll need to be a collaborator on the app.

### When you're ready to deploy

1. Make sure that all your work is fully committed and pushed to your master branch on Github.
2. If you currently have an existing branch called "deploy", delete it now (`git branch -d deploy`). We're going to use a dummy branch with the name "deploy" (see below), so if you have one lying around, the script below will error
3. `npm run deploy` - this will cause the following commands to happen in order:
  - `git checkout -b deploy`: checks out a new branch called "deploy". Note that the name "deploy" here isn't magical, but it needs to match the name of the branch we specify when we push to our heroku remote.
  - `webpack -p`: webpack will run in "production mode"
  - `git add -f public/bundle.js public/bundle.js.map`: "force" add the otherwise gitignored build files
  - `git commit --allow-empty -m 'Deploying'`: create a commit, even if nothing changed
  - `git push --force heroku deploy:master`: push your local "deploy" branch to the "master" branch on heroku
  - `git checkout master`: return to your master branch
  - `git branch -D deploy`: remove the deploy branch

Now, you should be deployed!

Why do all of these steps? The big reason is because we don't want our production server to be cluttered up with dev dependencies like webpack, but at the same time we don't want our development git-tracking to be cluttered with production build files like bundle.js! By doing these steps, we make sure our development and production environments both stay nice and clean!
