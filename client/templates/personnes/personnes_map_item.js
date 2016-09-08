Template.personnesMapItem.onRendered(function () {
  GoogleMaps.load();
  GoogleMaps.ready('map', function(map) {
    // Add a marker to the map once it's ready
    var markers = [];
    var personnes = Personnes.find();
    personnes.forEach(function(personne){
      markers.push(new google.maps.Marker({
        position: new google.maps.LatLng(personne.loc[0],personne.loc[1]),
        map: map.instance,
        _id: personne._id
      }));
    });
    Personnes.find().observe({
      added: function(personne) {
        // Create a marker for this document
        markers.push(new google.maps.Marker({
          position: new google.maps.LatLng(personne.loc[0], personne.loc[1]),
          map: map.instance,
          _id: personne._id
        }))
      },
      removed: function(oldPersonne) {
        // Remove the marker from the map
        markers.forEach(function(marker){
          if(marker._id==oldPersonne._id){
            marker.setMap(null);
            // Remove the reference to this marker instance
            delete marker;
          }
        });
      }
    });
  });
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

Template.personnesMapItem.onCreated(function(){
  // We can use the `ready` callback to interact with the map API once the map is ready.

});
