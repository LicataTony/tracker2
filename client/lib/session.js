var clearPersonneError = function(){
  Session.set('personneError', '');
};

var setPersonneError = function(personneError){
  Session.set('personneError', personneError);
};

var getPersonneError = function(){
  return Session.get('personneError');
};

module.exports = {
  clearPersonneError: clearPersonneError,
  setPersonneError: setPersonneError,
  getPersonneError: getPersonneError
};
