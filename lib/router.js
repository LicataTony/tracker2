Router.configure({
  layoutTemplate: 'layout'
});

Router.route('/', {name: 'personnesListe',
  waitOn: function() {
    return Meteor.subscribe('personnes');
  },
  data: function() { return Personnes.find(); }
});
