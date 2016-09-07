Personnes = new Mongo.Collection('personnes');

Meteor.methods({
  'personneDelete': function(personneId){
    check(personneId, String);
    Personnes.remove(personneId);
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
