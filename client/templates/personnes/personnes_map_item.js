import * as mapCtrl from '/client/lib/map';

Template.personnesMapItem.onRendered(function () {
  initMap();
});

Template.personnesMapItem.helpers({
  mapOptions: function() {
    // Make sure the maps API has loaded
    if (mapCtrl.loaded()) {
      // Map initialization options
      return mapCtrl.fribourg();
    }
  }
});

function initMap() {
  mapCtrl.load();
  var finishInitMap = function(map) {
    // Add a marker to the map once it's ready
    var markers = [];
    var personnes = Personnes.find();
    loadExistingPersonnes(map, markers, personnes);
    Personnes.find().observe({
      added: function(personne) {
        // Create a marker for this document
        pushPersonneOnMap(map, markers, personne);
      },
      removed: function(oldPersonne) {
        // Remove the marker from the map
        deletePersonne(markers, oldPersonne);
      }
    });
  }
  mapCtrl.ready('map', finishInitMap);
}

var loadExistingPersonnes = function(map, markers, personnes){
  personnes.forEach(function(personne){
    pushPersonneOnMap(map, markers, personne);
  });
}

var pushPersonneOnMap = function(map, markers, personne){
  var marker = mapCtrl.addMarker(map, personne);
  markers.push(marker);
}

var deletePersonne = function(markers, oldPersonne){
  markers.forEach(function(marker){
    if(marker._id==oldPersonne._id){
      marker.setMap(null);
      // Remove the reference to this marker instance
      delete marker;
    }
  });
}
