Router.configure({
  layoutTemplate: 'layout'
});

Router.route('/', {name: 'personnesList',
  waitOn: function() {
    return Meteor.subscribe('personnes');
  },
  data: function() { return Personnes.find(); }
});

Router.route('/personneAdd', {name: 'personneAdd'});
