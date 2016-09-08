Template.personnesMapItem.onRendered(function () {
  GoogleMaps.load();
});

Template.personnesMapItem.helpers({
  mapOptions: function() {
    // Make sure the maps API has loaded
    if (GoogleMaps.loaded()) {
      // Map initialization options
      return {
        center: new google.maps.LatLng(46.8080851,7.1622555),
        zoom: 12
      };
    }
  }
});

Template.personnesMapItem.onCreated(function(){
  // We can use the `ready` callback to interact with the map API once the map is ready.
  GoogleMaps.ready('map', function(map) {
    // Add a marker to the map once it's ready
    console.log(map.options.center);
    var marker = new google.maps.Marker({
      position: map.options.center,
      map: map.instance
    });
  });
});
