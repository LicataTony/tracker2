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
  },
  hidden: function(){
    if(this.hidden) return 'checked';
    return '';
  },
  blocked: function(){
    if(this.blocked) return 'checked';
    return '';
  },
  isNotPublic: function(){
    return (Router.current().route.getName().indexOf('personnesList') === -1);
  },
  isHidden: function(){
    var isAdmin = (Router.current().route.getName().indexOf('personnesAdmin') !== -1);
    if(isAdmin) return true;
    if(this.hidden) return false;
    if(this.blocked) return false;
    return true;
  },
  selected: function(){
    

  }
});

Template.personneItem.events({
  'click .delete': function(){
    Meteor.call('personneDelete', this._id);
  },
  'change .hidden2': function(e){
    Meteor.call('personneHidden', {id: this._id, hidden: ($(event.target).is(":checked"))});
  },
  'change .blocked': function(e){
    Meteor.call('personneBlocked', {id: this._id, hidden: ($(event.target).is(":checked"))});
  }
});
