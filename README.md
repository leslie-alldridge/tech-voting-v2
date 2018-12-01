## User Stories

CX Tech Feedback

### In progress

- comments counter unique to each suggestion
- laurence and leads to have a status/banner in progress etc
- one upvote per suggestion - i can use their unique id's for this
- categories for (process updates, new ideas, team improvements) - drop down filter -> popular ideas (top 5) will be the default
- options will be categories or top 10.
- search (starting by name -> looking into search across other features such as completed, in progress).
- enhanced styling

### Done

- comments toggled
- remove send feedback on the left (removed and placed with confluence link)
- user login for comments (login completed and ideas take the current logged in users name)
- link to confluence page for suggestions (done - just needs the right link)

## Setup

Spin up .env file with the secret

Run the following commands in your terminal:

```sh
yarn install
yarn knex migrate:latest
yarn knex seed:run
mv .env_example .env
```

To run in development:

```sh
yarn dev
 - or -
npm run dev

```

To run in production:

```sh
yarn start
  - or -
npm start
```

## Heroku!!!

### Creating your app

Create your app with `heroku create [name]`

You can check that this was successful by running `heroku apps` to view a list of your apps

### Adding postgres

Add postgresql (hobby dev) to your app at `https://dashboard.heroku.com/apps/[APP NAME HERE]/resources`

Check that pg has been added by running `heroku addons` to ensure the postgresql db is on your app

### Deploying!

I have created several npm scripts that will be useful for deploying your app to heroku easily.

To push your local master branch to your heroku app:

```sh
yarn h:deploy
  - or -
npm run h:deploy
```

Run heroku migrations:

```sh
yarn h:migrate
  - or -
npm run h:migrate
```

Run heroku seeds:

```sh
yarn h:seed
  - or -
npm run h:seed
```

If ever you need to rollback, you can also:

```sh
yarn h:rollback
  - or -
npm run h:rollback
```

### Ta-Da!

Your app should be deployed!
