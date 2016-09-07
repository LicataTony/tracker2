Template.personnesList.helpers({
  personnes: function(){
    return Personnes.find();
  }
});
