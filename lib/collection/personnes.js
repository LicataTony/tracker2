Personnes = new Mongo.Collection('personnes');

Meteor.methods({
  'personneDelete': function(personneId){
    check(personneId, String);
    Personnes.remove(personneId);
  },
  'personneHidden': function(args){
    check(args, {
      id: String,
      hidden: Boolean
    });
    Personnes.update({_id: args.id}, {$set: {hidden: args.hidden}});
  },
  'personneBlocked': function(args){
    check(args, {
      id: String,
      hidden: Boolean
    });
    Personnes.update({_id: args.id}, {$set: {blocked: args.hidden}});
  },
  'personneAdd': function(args){
    check(args, {
      nom: String,
      prenom: String,
      x: Number,
      y: Number
    });

    var nom = args.nom;
    var prenom = args.prenom;
    var x = args.x;
    var y = args.y;

    Personnes.insert({nom: nom, prenom: prenom, loc: [x , y]});
    return true;
  }
});
