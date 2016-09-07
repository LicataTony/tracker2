import * as session from '/client/lib/session';

Template.personneAdd.onCreated(function(){
  session.clearPersonneError();
});

Template.personneAdd.helpers({
  errorMessage: function(field){
    var personneError = session.getPersonneError();
    if(personneError!=null){
      if(personneError[field]!=null){
        return personneError[field];
      }
    }
    return '';
  }
});

Template.personneAdd.events({
  'submit form': function(e) {
    e.preventDefault();
    var nom = $(e.target).find('[id=nom]').val();
    var prenom = $(e.target).find('[id=prenom]').val();

    if((nom!=''&&prenom!='')){
      Meteor.call('personneAdd', {nom: nom, prenom: prenom}, function(returnBool) {
        if(returnBool){
          Router.go('personnesList');
        }else{
          console.log('error');
        }
      });
    }else{
      var personneError = {nom: '', prenom: ''};
      if(nom==''){
        personneError.nom = 'Veuillez entrer un nom!';
      }
      if(prenom==''){
        personneError.prenom = 'Veuillez entrer un prénom!';
      }
      session.setPersonneError(personneError);
    }
  }
});
