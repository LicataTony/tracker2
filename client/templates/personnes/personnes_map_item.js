import * as mapCtrl from '/client/lib/map';
import * as session from '/client/lib/session';

var mapKey;

Template.personnesMapItem.onRendered(function () {
  mapKey = 'mapPersonnes';
  initMap();
});

Template.personnesMapItem.helpers({
  mapOptions: function() {
    // Make sure the maps API has loaded
    if (mapCtrl.loaded()) {
      // Map initialization options
      return  mapCtrl.build(46.830,7.17,4);;
    }
  }
});

function initMap() {
  mapCtrl.load();
  //initMarkers();
  mapCtrl.ready(mapKey, finishInitMap);
};

var finishInitMap = function(map) {
  // Add a marker to the map once it's ready
  mapCtrl.setMap(mapKey, map);
  var personnes = Personnes.find({$or: [{hidden: {$exists: false}},{hidden: false}]});
  loadExistingPersonnes(personnes);
  Personnes.find().observe({
    added: function(personne) {
      // Create a marker for this document
      pushPersonneOnMap(personne);
      // mapCtrl.addMarker();
    },
    removed: function(oldPersonne) {
      // Remove the marker from the map
      deletePersonneOnMap(oldPersonne);
    }
  });
  Personnes.find().observeChanges({
    changed: function(id, fieldsChanged){
      personnesChanged(id, fieldsChanged);
    }
  });
};

var loadExistingPersonnes = function(personnes){
  personnes.forEach(function(personne){
    pushPersonneOnMap(personne);
  });
};

var pushPersonneOnMap = function(personne){
  var exist = false;
  if((personne.hidden==false||typeof personne.hidden=='undefined') && !exist){
    var label = personne.nom.charAt(0);
    var lat = personne.loc[0];
    var lng = personne.loc[1];
    var idref = personne._id;
    var title = personne.nom+' '+personne.prenom;

    var marker = mapCtrl.addMarker(mapKey, lat , lng , idref , title);

    var listener = function() {
      session.set(personne._id, 'orange');
    };

    mapCtrl.addClickListener(personne._id, listener);
  }
};

var deletePersonneOnMap = function(oldPersonne){
  mapCtrl.deleteMarker(oldPersonne._id);
};

var personnesChanged = function(id, fieldsChanged){
  var personneChanged;
  if(fieldsChanged.loc) {
    mapCtrl.updateSettingMarker(id,'loc',fieldsChanged.loc);
  }
};
