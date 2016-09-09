Template.personnesMapItem.onRendered(function () {
  initMap();
});

Template.personnesMapItem.helpers({
  mapOptions: function() {
    // Make sure the maps API has loaded
    if (GoogleMaps.loaded()) {
      // Map initialization options
      return {
        center: new google.maps.LatLng(46.8080851,7.1622555),
        zoom: 4
      };
    }
  }
});

function initMap() {
  GoogleMaps.load();
  var finishInitMap = function(map) {
    // Add a marker to the map once it's ready
    var markers = [];
    var personnes = Personnes.find();
    loadExistingPersonnes(map, markers, personnes);
    Personnes.find().observe({
      added: function(personne) {
        // Create a marker for this document
        pushPersonne(map, markers, personne);
      },
      removed: function(oldPersonne) {
        // Remove the marker from the map
        deletePersonne(markers, oldPersonne);
      }
    });
  }
  GoogleMaps.ready('map', finishInitMap);
}

var loadExistingPersonnes = function(map, markers, personnes){
  personnes.forEach(function(personne){
    pushPersonneOnMap(map, markers, personne);
  });
}

var pushPersonneOnMap = function(map, markers, personne){
  markers.push(new google.maps.Marker({
    position: new google.maps.LatLng(personne.loc[0], personne.loc[1]),
    map: map.instance,
    _id: personne._id,
    label: personne.nom.charAt(0),
    title: personne.nom+' '+personne.prenom
  }));
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
