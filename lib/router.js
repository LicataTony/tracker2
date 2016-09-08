Router.configure({
  layoutTemplate: 'layout'
});

Router.route('/', {name: 'personnesList',
  waitOn: function() {
    return Meteor.subscribe('personnes');
  },
  data: function() { return Personnes.find(); }
});

Router.route('/personnesAdmin', {name: 'personnesAdmin',
  waitOn: function() {
    return Meteor.subscribe('personnes');
  },
  data: function() { return Personnes.find(); }
});

Router.route('/personneAdd', {name: 'personneAdd'});
