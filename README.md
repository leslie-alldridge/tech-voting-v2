## User Stories

CX Tech Feedback

### Todo
- check out reporting options to Excel
- send doc to mandy

### In progress

Notes: - denotes more work to do on the feature and \* denotes an untouched user story.

- enhanced styling

### Done
- Deploy (done 26/01/2018)
- deploy app and test password reset functionality on heroku (in progress)
- mobile views to be better
- media queries so search doesn't wrap when screen is made smaller
- write code so error msgs are temporarily displayed in to to say (user alr exists etc)
- decided to add badge, just need to change it so badges show on page load, instead of toggle
  to do this i'm thinking about having a seperate action to find admin comments and store them in props, then on render we can
  say 'show this <i> badge if they exist in this.props.adminComment
- write admin functions to remove users by name (since there's no password reset) or add in password reset
- admin should be able to delete comments
- add password reset email, token and logic
- home link visible in nav for end users
- single email for sign up only
- confirmation before deleting in case of missclick
- when suggestion is removed, delete the comments as well (currently they remain)
- style the admin dropdown
- help page completed and added to nav bar
- Search is case sensitive at the moment
- decided to include description search due to simplicity
- filter status doesn't have the option to find 'closed'
- refactored code by 700 lines in main
- Color the comments box different for Laurence and Rob
- create a status for 'closed' and allow admins to delete the idea.
- Leave trophy badge for admin comments
- fixed up navbar styling
- category selection styling needs to maintain when filtering by category (just need to add the ID) and also want to keep current filter as the 'active' dropdown item
- search (starting by name -> looking into search across other features such as completed, in progress). Title search is completed.
- one upvote per suggestion per user - i can use their unique id's for this (ideally not local cache)
- categories for (process updates, new ideas, team improvements) - drop down filter -> popular ideas (top 5) will be the default (could have a link saying 'see more' than will then load up all results.)
- laurence and leads to have a status/banner in progress etc (banners ready just need option set up to flag for leaders)
- increase number of seeds
- comments counter unique to each suggestion <- possibly need more logic in routes/db
- comments toggled
- remove send feedback on the left (removed and placed with confluence link)
- user login for comments (login completed and ideas take the current logged in users name)
- link to confluence page for suggestions (done - just needs the right link)
- renaming send feeback and add improvement button links -- Tech Improvement -- || -- Wider Business Improvement --

## Future Notes

- Spin up profile pictures so we can compare between no profile picture or with a profile picture

- notification for completed ideas -- something like animation a completed idea

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

Deployed at cxtech-wlg.herokuapp.com
