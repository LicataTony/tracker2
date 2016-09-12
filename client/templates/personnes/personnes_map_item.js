import * as mapCtrl from '/client/lib/map';

var markers;

Template.personnesMapItem.onRendered(function () {
  markers = [];
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
  //mapCtrl.ready('map', finishInitMap);
};

var finishInitMap = function(map) {
  // Add a marker to the map once it's ready

  var personnes = Personnes.find({$or: [{hidden: {$exists: false}},{hidden: false}]});
  loadExistingPersonnes(map, markers, personnes);
  Personnes.find().observe({
    added: function(personne) {
      // Create a marker for this document
      pushPersonneOnMap(map, markers, personne);
      // mapCtrl.addMarker();
    },
    removed: function(oldPersonne) {
      // Remove the marker from the map
      deletePersonneOnMap(markers, oldPersonne);
      // mapCtrl.removeMarker(oldPersonne._id);
    }
  });
  Personnes.find().observeChanges({
    changed: function(id, fieldsChanged){
      personnesChanged(id, fieldsChanged, markers, personnes, map);
    }
  });
};

var loadExistingPersonnes = function(map, markers, personnes){
  personnes.forEach(function(personne){
    pushPersonneOnMap(map, markers, personne);
  });
};

var pushPersonneOnMap = function(map, markers, personne){
  var exist = false;
  markers.forEach(function(marker){
    if(marker._id == personne._id) {
      exist=true
    };
  });
  if((personne.hidden==false||typeof personne.hidden=='undefined') && !exist){
    var label = personne.nom.charAt(0);
    var lat = personne.loc[0];
    var lng = personne.loc[1];
    var idref = personne._id;
    var title = personne.nom+' '+personne.prenom;

    var marker = mapCtrl.addMarker(map, lat , lng , idref , title);

    var listener = function() {
      marker.setLabel({color: 'cyan', text: personne.nom.charAt(0)});
    };

    map.addActionOnMarker(marker,listener);

    markers.push(marker);
  }
};

var deletePersonneOnMap = function(markers, oldPersonne){
  markers.forEach(function(marker){
    if(marker._id==oldPersonne._id){
      marker.setMap(null);
      // Remove the reference to this marker instance
      var index = markers.indexOf(marker);
      if(index!==-1){
        markers.splice(index, 1);
      }
    }
  });
};

var personnesChanged = function(id, fieldsChanged, markers, personnes, map){
  var personneChanged;
  personnes = Personnes.find();
  personnes.forEach(function(personne){
    if(id == personne._id) personneChanged=personne;
  });
  if(fieldsChanged.hidden == false || typeof fieldsChanged.hidden == 'undefined'){
    pushPersonneOnMap(map, markers, personneChanged);
  }else{
    deletePersonneOnMap(markers, personneChanged);
  }
  personnes = Personnes.find({$or: [{hidden: {$exists: false}},{hidden: false}]});
};
