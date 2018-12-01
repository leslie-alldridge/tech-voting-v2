let router = require('express').Router();

let { getSuggestions } = require('../db/suggestions');

router.get('/all', (req, res) => {
  console.log(req.body);

  //   const { user_name, first_name, last_name, password } = req.body;
  //   userExists(user_name, req.app.get('db'))
  //     .then(exists => {
  //       if (exists) return res.status(400).send({ message: 'User Name Taken' });
  //       createUser(user_name, first_name, last_name, password, req.app.get('db'))
  //         .then(() => next())
  //         .catch(err => res.status(500).send({ message: 'Server Error' }));
  //     })
  //     .catch(err => res.status(500).send({ message: 'Server Error' }));
});

module.exports = router;
