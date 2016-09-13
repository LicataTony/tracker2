import * as session from '/client/lib/session';

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
    if(session.get(this._id)) return 'background-color: #FFD0A0;';
  },
  editValue: function(){
    return Session.get("TargetValue" + this._id);
  }
});

Template.personneItem.onRendered(function(){
  session.clear(this._id);
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
  },
  'dbclick #spanY' : function(e,t){
    return Session.set("editX",true)
  },
  'keypress #editX': function(e, t) {
    if (evt.which === 13) {
      var newX = document.getElementById('editX').value;
      var idPersonne = this._id;
      if(newX){
        meteor.call('updateX', parseFloat(newX));
        return Session.set("editX",false);
      }
    }
  },
  'dbclick #spanY' : function(e,t){
    console.log('test');
    return Session.set("editY",true)
  },
  'keypress #editY': function(e, t) {
    if (evt.which === 13) {
      var newY = document.getElementById('editY').value;
      var idPersonne = this._id;
      if(newY){
        meteor.call('updateY', parseFloat(newY));
        return Session.set("editY",false);
      }
    }
  }
});
