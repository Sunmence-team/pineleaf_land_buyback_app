export const mapJsonStyle = [
  // 1. GLOBAL BASE LANDSCAPE
  {
    "elementType": "geometry",
    "stylers": [{ "color": "#F4F6F1" }] // Main background land color
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [{ "color": "#4A4A4A" }] // Global text color (city names, etc.)
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [{ "color": "#F4F6F1" }] // Text outline (set same as land for no outline)
  },

  // 2. WATER BODIES (Rivers, Oceans, Lakes)
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [{ "color": "#E1E6DC" }] // Water body color
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [{ "color": "#757575" }]
  },

  // 3. ROADS & HIGHWAYS
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [{ "color": "#FFFFFF" }] // Minor/Local roads color
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [{ "color": "#154A22" }] // Main Highways/Expressways (Your Brand Dark Green)
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry.stroke",
    "stylers": [{ "color": "#0F3518" }] // Highway borders
  },
  {
    "featureType": "road",
    "elementType": "labels.text.fill",
    "stylers": [{ "color": "#616161" }] // Street names color
  },

  // 4. GREENERY & PARKS (Points of Interest)
  {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [{ "color": "#F4F6F1" }] // Park backgrounds
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [{ "color": "#3B5E43" }]
  },

  // 5. BULIDINGS & URBAN AREAS
  {
    "featureType": "landscape.man_made",
    "elementType": "geometry",
    "stylers": [{ "color": "#EDEDED" }] // Built-up metropolitan city blocks
  },
  {
    "featureType": "building",
    "elementType": "geometry",
    "stylers": [{ "color": "#E0E0E0" }] // 3D/2D Building footprint color
  },

  // 6. TRANSIT SYSTEMS (Airports, Train lines)
  {
    "featureType": "transit",
    "elementType": "geometry",
    "stylers": [{ "color": "#EAEAEA" }]
  },
  {
    "featureType": "transit.station.airport",
    "elementType": "geometry",
    "stylers": [{ "color": "#DCDCDC" }] // Airport fields
  },

  // 7. CLEAN UP CONTROLS (Toggles)
  {
    "featureType": "poi",
    "elementType": "labels.icon",
    "stylers": [{ "visibility": "off" }] // Turns off business icons (restaurants, shops)
  },
  {
    "featureType": "transit",
    "elementType": "labels.icon",
    "stylers": [{ "visibility": "off" }] // Turns off bus/train icons
  }
];