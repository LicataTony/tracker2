Template.personneItem.helpers({
  nom: function(){
    return this.nom;
  },
  prenom: function(){
    return this.prenom;
  }
});

Template.personneItem.events({
  'click .delete': function(){
    Meteor.call('personneDelete', this._id);
  }
});
