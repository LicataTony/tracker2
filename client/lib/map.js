var load = function(){
  return GoogleMaps.load();
};

var loaded = function(){
  return GoogleMaps.loaded();
};

var fribourg = function(){
  return {
    center: new google.maps.LatLng(46.8080851,7.1622555),
    zoom: 4
  };
};

var ready = function(map, mapFunction){
  GoogleMaps.ready(map, mapFunction);
};

var addMarker = function(map, personne){
  var marker = new google.maps.Marker({
    position: new google.maps.LatLng(personne.loc[0], personne.loc[1]),
    map: map.instance,
    _id: personne._id,
    label: personne.nom.charAt(0),
    title: personne.nom+' '+personne.prenom
  });
  marker.addListener('click', function() {
    marker.setLabel({color: 'cyan', text: personne.nom.charAt(0)});
  });
  return marker;
};

module.exports = {
  load: load,
  loaded: loaded,
  fribourg: fribourg,
  ready: ready,
  addMarker: addMarker
};
