Meteor.publish('personnesAdmin', function() {
  return Personnes.find();
});

Meteor.publish('personnesList', function() {
  var argRequest =    {$and: [
        {$or: [{hidden: {$exists: false}},{hidden: false}]},
        {$or: [{blocked: {$exists: false}},{blocked: false}]}
  ]};
  var fields  = {fields: {nom: false}};
  var publication = Personnes.find(argRequest, fields);
  return publication;
});
