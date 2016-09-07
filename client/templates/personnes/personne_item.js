Template.personneItem.helpers({
  nom: function(){
    return this.nom;
  },
  prenom: function(){
    return this.prenom;
  },
  x: function(){
    return this.loc[0];
  },
  y: function(){
    return this.loc[1];
  }
});

Template.personneItem.events({
  'click .delete': function(){
    Meteor.call('personneDelete', this._id);
  }
});
