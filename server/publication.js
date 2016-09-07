Meteor.publish('personnes', function() {
  return Personnes.find();
});
