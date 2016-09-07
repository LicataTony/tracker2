import * as session from '/client/lib/session';

Template.personneAdd.onCreated(function(){
  session.clearPersonneError();
});

Template.personneAdd.helpers({
  errorMessage: function(field){
    return printErrorMessage(field);
  }
});

Template.personneAdd.events({
  'submit form': function(e) {
    e.preventDefault();
    // ---- get data
    var data = getData(e);
    // --- control data
    if( data.nom != '' && data.prenom!=''  && data.x!='' && data.y!=''){
      // send data
      personneAdd(data);
    }else{
      // display errorMessage
      displayErrorMessage(data);
    }
  }
});

var printErrorMessage = function(field){
  var personneError = session.getPersonneError();
  if(personneError!=null){
    if(personneError[field]!=null){
      return personneError[field];
    }
  }
}

var getData = function(e){
  var nom = $(e.target).find('[id=nom]').val();
  var prenom = $(e.target).find('[id=prenom]').val();
  var x = parseFloat($(e.target).find('[id=x]').val());
  if(isNaN(x)){
    x='';
  }
  var y = parseFloat($(e.target).find('[id=y]').val());
  if(isNaN(y)){
    y='';
  }
  return {nom: nom, prenom: prenom, x: x, y: y};
}

var personneAdd = function(data){
  Meteor.call('personneAdd', {nom: data.nom, prenom: data.prenom, x: data.x, y: data.y}, function(e){
    if(typeof e !== undefined){
      Router.go('personnesList');
    }else{
      console.log(e);
    }
  });
}

var displayErrorMessage = function(data){
  var personneError = {nom: '', prenom: '', x: '', y: ''};
  if(data.nom==''){
    personneError.nom = 'Veuillez entrer un nom!';
  }
  if(data.prenom==''){
    personneError.prenom = 'Veuillez entrer un prénom!';
  }
  if(data.x==''){
    personneError.x = 'Veuillez entrer une coordonée X valide!';
  }
  if(data.y==''){
    personneError.y = 'Veuillez entrer une coordonée Y valide!';
  }
  session.setPersonneError(personneError);
}
