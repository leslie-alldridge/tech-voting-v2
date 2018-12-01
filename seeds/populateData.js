exports.seed = function(knex, Promise) {
  return knex('ideas')
    .del()
    .then(function() {
      return knex('ideas').insert([
        {
          id: 1,
          title: 'Stop Salesforce from freezing',
          description:
            'To help us serve our current customers better and scale to five million users we will need a support interface that allows us to handle multiple cases with ease. Our current set up freezes often, causing our agents to wait a long time before then can send an email.',
          votes: 20,
          category: 'idea',
          user: 'Vinh'
        },
        {
          id: 2,
          title: 'New wording for Status Page',
          description:
            "Provide a #human experience for our users. We've received multiple complaints about our status page wording being a copy paste effort between outages.",
          votes: 10,
          category: 'improvement',
          user: 'Leslie'
        },
        {
          id: 3,
          title: 'Morning sit down sessions with the team',
          description:
            'Provide a safe place for the team to relax with each other away from the stress of work.',
          votes: 3,
          category: 'team',
          user: 'Hayley'
        }
      ]);
    });
};
