Personnes = new Mongo.Collection('personnes');

Meteor.methods({
  'personneDelete': function(personneId){
    check(personneId, String);
    Personnes.remove(personneId);
  },
  'personneAdd': function(args){
    check(args, {
      nom: String,
      prenom: String
    });
    var nom = args.nom;
    var prenom = args.prenom;

    Personnes.insert({nom: nom, prenom: prenom});
    return true;
  }
});
