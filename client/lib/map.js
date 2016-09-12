var load = function(){
  return GoogleMaps.load();
};

var loaded = function(){
  return GoogleMaps.loaded();
};

var build = function(lat,lng,zoom){
  formateOptions(lat,lng,zoom);
  return options;
};

var options;

var formateOptions = function(lat,lng,zoom) {
  options = {
    center: new google.maps.LatLng(lat, lng),
    zoom: zoom
  };
};

var getOptions = function(){
  return options;
};

var ready = function(action){
  GoogleMaps.ready('map', action);
};

var addMarker = function(map, lat , lng , idref , title){
  var label = "X";
  var marker = new google.maps.Marker({
    position: new google.maps.LatLng(lat,lng),
    map: map.instance,
    _id: idref,
    label: label,
    title: title
  });
  return marker;
};

var addActionOnMarker = function(marker, listener) {
  marker.addListener('click', listener);
}

module.exports = {
  load: load,
  loaded: loaded,
  build: build,
  getOptions: getOptions,
  ready: ready,
  addMarker: addMarker,
  addActionOnMarker: addActionOnMarker
};
