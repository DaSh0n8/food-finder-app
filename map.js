"use strict";

let centrepointLocation = null; //centrepoint instance, initiated as null
let newLocation = {}; //after clicking on the map, but not confirmed
let centrepointSet = false;
let markerList = [];
let resultList = [];
let resultInstanceList = [];
let locationConfirmed = true;
//let searchRadius = 500; //radius in m to search for
let searchLimit = 5; //number of searches to show

const APPDATA_KEY = 'appdatakey';
const INCOMPLETE_KEY = 'incompletekey';

//Mapbox Token
const MAPBOX_TOKEN = "pk.eyJ1IjoiYXlhbjAwMjQiLCJhIjoiY2tvMjlpNmhuMDRvdzJ2cDd0YmEydXlvNyJ9.Z_aXI5F08j46RNFcrDuJfQ";
//Opencage Geocode Token
const OPENCAGE_TOKEN = '616df02868e141878736c00fb6840f26';
//Geoapify Token
const GEOAPIFY_TOKEN = '94fc6b02418d4459b2d161af64dd7d27';

//Places API
const PLACES_API = "89c1dc776459400bb23c1c7ec8189025";

// web service request function
function webServiceRequest(url, data) {
    // Build URL parameters from data object.
    let params = "";
    // For each key in data object...
    for (let key in data) {
        if (data.hasOwnProperty(key)) {
            if (params.length == 0) {
                // First parameter starts with '?'
                params += "?";
            }
            else {
                // Subsequent parameter separated by '&'
                params += "&";
            }

            let encodedKey = encodeURIComponent(key);
            let encodedValue = encodeURIComponent(data[key]);

            params += encodedKey + "=" + encodedValue;
        }
    }
    let script = document.createElement('script');
    script.src = url + params;
    document.body.appendChild(script);
}

function buildURL(url, data) {
    // Build URL parameters from data object.
    let params = "";
    // For each key in data object...
    for (let key in data) {
        if (data.hasOwnProperty(key)) {
            if (params.length == 0) {
                // First parameter starts with '?'
                params += "?";
            }
            else {
                // Subsequent parameter separated by '&'
                params += "&";
            }

            let encodedKey = encodeURIComponent(key);
            let encodedValue = encodeURIComponent(data[key]);

            params += encodedKey + "=" + encodedValue;
        }
    }
    return url + params;
}


//FORWARD GEOCODE
function forwardGeocode() {
    let streetNumber = document.getElementById('street_number').value;
    let street = document.getElementById('street').value;
    let postcode = document.getElementById('postcode').value;
    let state = 'Victoria';
    let region = 'Melbourne';
    let location = `${street}, ${streetNumber}, ${postcode}, ${region}, ${state}`;
    let location_encoded = encodeURI(location);
    let data =
    {
        q: location_encoded,
        key: OPENCAGE_TOKEN,
        countrycode: 'au',
        callback: "showData"
    };
    webServiceRequest('https://api.opencagedata.com/geocode/v1/json', data);
    console.log(location);
}

//Callback function
function getData(result) {
    //console log result
    console.log(result);
    //mapbox token
    mapboxgl.accessToken = MAPBOX_TOKEN;

    //getting data
    let data = result.results[0];

    //editing data
    newLocation =
    {
        lat: data.geometry.lat,
        lng: data.geometry.lng,
        address: data.formatted
    }

    //centre map
    map.setCenter([data.geometry.lng, data.geometry.lat]);

    //set marker position
    let marker = newMarker(data.geometry.lat, data.geometry.lng);
    marker.setLngLat([data.geometry.lng, data.geometry.lat]);

    //popup with formated information
    let popup = new mapboxgl.Popup({ offset: 45 });
    popup.setHTML(`${data.formatted}`);

    //set popup to marker
    marker.setPopup(popup);

    //add marker to map
    marker.addTo(map);

    //add popup to map
    popup.addTo(map);

    let buttonsRef = document.getElementById('buttons');
    let displayButtons = '';
    displayButtons += `<div class="mdl-cell mdl-cell--4-col">`;
    displayButtons += `<button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent" onclick="confirmLocation()">Confirm Centrepoint</button>`;
    displayButtons += `</div>`;
    displayButtons += `<div class="mdl-cell mdl-cell--4-col">`;
    displayButtons += `<button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent" onclick="cancelLocation()">Cancel Centrepoint</button>`;
    displayButtons += `</div>`;
    buttonsRef.innerHTML = displayButtons;
}

function getDataEdit(result) {
    //console log result
    console.log(result);
    //mapbox token
    mapboxgl.accessToken = MAPBOX_TOKEN;

    //getting data
    let data = result.results[0];

    //editing data
    newLocation =
    {
        lat: data.geometry.lat,
        lng: data.geometry.lng,
        address: data.formatted
    }

    //centre map
    map.setCenter([data.geometry.lng, data.geometry.lat]);

    let marker = markerList[markerList.length - 1];
    //set marker position
    marker.setLngLat([data.geometry.lng, data.geometry.lat]);

    //popup with formated information
    let popup = new mapboxgl.Popup({ offset: 45 });
    popup.setHTML(`${data.formatted}`);

    //set popup to marker
    marker.setPopup(popup);

    //add marker to map
    marker.addTo(map);

    //add popup to map
    popup.addTo(map);

    //updateList();
}

//might change or get rid of
function getDataSearch(result) {
    //console log result
    console.log(result);
    //mapbox token
    mapboxgl.accessToken = MAPBOX_TOKEN;

    //getting data
    let data = result.results[0];

    //editing data
    newLocation =
    {
        lat: data.geometry.lat,
        lng: data.geometry.lng,
        address: data.formatted
    }

    //centre map
    map.setCenter([data.geometry.lng, data.geometry.lat]);

    //set marker position
    let marker = resultMarker(data.geometry.lat, data.geometry.lng);
    marker.setLngLat([data.geometry.lng, data.geometry.lat]);

    //popup with formated information
    let popup = new mapboxgl.Popup({ offset: 45 });
    popup.setHTML(`${data.formatted}`);

    //set popup to marker
    marker.setPopup(popup);

    //add marker to map
    marker.addTo(map);

    //add popup to map
    popup.addTo(map);

    let buttonsRef = document.getElementById('buttons');
    let displayButtons = '';
    displayButtons += `<div class="mdl-cell mdl-cell--4-col">`;
    displayButtons += `<button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent" onclick="confirmLocation()">Confirm Centrepoint</button>`;
    displayButtons += `</div>`;
    displayButtons += `<div class="mdl-cell mdl-cell--4-col">`;
    displayButtons += `<button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent" onclick="cancelLocation()">Cancel Centrepoint</button>`;
    displayButtons += `</div>`;
    buttonsRef.innerHTML = displayButtons;
}

//Displaying searach results
function displaySearchResults(result) //result should be an instance of SearchResult
{
    let name = result.name;
    let lat = result.lat;
    let lng = result.lng;
    let address = result.formatted;
    let categories = result.categories;

    //Show Marker
    let geojson = {
        type: 'FeatureCollection',
        features: [
            {
                type: 'Feature',
                geometry: {
                    type: 'Point',
                    coordinates: [lng, lat]
                },
            },
        ]
    };
    for (const { geometry, properties } of geojson.features) {
        // create a HTML element for each feature
        const el = document.createElement('div');
        el.className = 'marker';

        // make a marker for each feature and add to the map
        let marker = new mapboxgl.Marker(el).setLngLat(geometry.coordinates);
        //popup with formated information
        let popup = new mapboxgl.Popup({ offset: 45 });
        popup.setHTML(`<p>${name}</p><button type="button" onclick="bookmarkSearchResult(${result._position})">Bookmark</button>`);

        //set popup to marker
        marker.setPopup(popup);

        //add marker to map
        marker.addTo(map);

        //add popup to map
        popup.addTo(map);
    }
}


//Initialising map
let mapStyle = 'osm-carto'

mapboxgl.accessToken = MAPBOX_TOKEN;
let map = new mapboxgl.Map(
    {
        container: 'map',
        style: `https://maps.geoapify.com/v1/styles/${mapStyle}/style.json?apiKey=${GEOAPIFY_TOKEN}`, // stylesheet location
        center: [144.9626398, -37.8104191], // starting position [lng, lat]
        zoom: 17 // starting zoom
    });
globalThis.map;

//MAP ON CLICK
map.on('style.load', function () {
    map.on('click', function (click) {
        if (locationConfirmed) {
            let coordinates = click.lngLat;
            centrepointLocation = coordinates;
            let x = coordinates.lat;
            let y = coordinates.lng;
            reverseGeocode(x, y);
        }
        locationConfirmed = false;
    });
});

//Initialising buttons
let buttonsRef = document.getElementById('buttons');
let displayButtons = '';
buttonsRef.innerHTML = displayButtons;


//NEW MARKERS
function newMarker(x, y) {
    let marker = new mapboxgl.Marker({ draggable: true, color: '#3FB1CE' });
    marker.setLngLat([y, x]);
    console.log(`New marker at (${x}, ${y}).`)
    marker.on('dragend', onDragEnd);
    markerList.push(marker);
    return marker;
}

//STATIC MARKERS
function staticMarker(x, y) {
    let marker = new mapboxgl.Marker({ draggable: false, color: '#4AE961' });
    marker.setLngLat([y, x]);
    return marker;
}

//RESULT MARKERS
function resultMarker(x, y) {
    let marker = new mapboxgl.Marker({ draggable: false, color: '#e71e28' });
    marker.setLngLat([y, x]);
    return marker;
}

//REVERSE GEOCODE
function reverseGeocode(x, y, search = false, edit = false) {
    let coordinates = `${x}+${y}`;
    let data =
    {
        q: coordinates,
        key: OPENCAGE_TOKEN,
        callback: 'getData'
    }
    if (edit) {
        data.callback = 'getDataEdit'
    }
    if (search) {
        data.callback = 'getDataSearch'
    }
    webServiceRequest('https://api.opencagedata.com/geocode/v1/json', data);
}

function onDragEnd(marker) {
    let coordinates = marker.target._lngLat;
    centrepointLocation = coordinates;
    reverseGeocode(coordinates.lat, coordinates.lng, false, true);
}

//REFRESH MAP
function refreshMap() {
    //refresh map
    let mapCentre = map.getCenter();
    let mapZoom = map.getZoom();
    mapboxgl.accessToken = MAPBOX_TOKEN;
    map = new mapboxgl.Map(
        {
            container: 'map',
            style: `https://maps.geoapify.com/v1/styles/${mapStyle}/style.json?apiKey=${GEOAPIFY_TOKEN}`, // stylesheet location
            center: [mapCentre.lng, mapCentre.lat], // starting position [lng, lat]
            zoom: mapZoom // starting zoom
        });

    globalThis.map;

    map.on('style.load', function () {
        //make sure that the map is clickable if there is no centrepoint
        if (!centrepointSet && locationConfirmed) {
            map.on('click', function (click) {
                locationConfirmed = false;
                let coordinates = click.lngLat;
                let x = coordinates.lat;
                let y = coordinates.lng;
                reverseGeocode(x, y);
            });
        }
        else {
            //recreate centrepoint location
            let marker = staticMarker(centrepointLocation.lat, centrepointLocation.lng); //change based on class

            //add marker to map
            marker.addTo(map);

            //popup with formated information
            let popup = new mapboxgl.Popup({ offset: 45 });
            popup.setHTML(`<p>${centrepointLocation.address}</p><button type="button" onclick="bookmarkCentrepoint()">Bookmark</button>`);

            //set popup to marker
            marker.setPopup(popup);

            //add popup to map
            popup.addTo(map);
        }

        //recreate result locations
        for (let i = 0; i < resultList.length; i++) {
            //initiate marker
            let markerResult = resultMarker(resultList[i].lat, resultList[i].lng);

            //add marker to map
            markerResult.addTo(map);

            //popup with formated information
            let popup = new mapboxgl.Popup({ offset: 45 });
            popup.setHTML('INSERT INFORMATION HERE');

            //set popup to marker
            markerResult.setPopup(popup);

            //add popup to map
            popup.addTo(map);
        }
    });
}

//CONFIRM LOCATION
function confirmLocation() {
    centrepointLocation = newLocation;
    centrepointSet = true;
    locationConfirmed = true;

    //refresh map
    refreshMap();

    //remove buttons
    let buttonsRef = document.getElementById('buttons');
    let displayButtons = '';
    buttonsRef.innerHTML = displayButtons;
}

//CANCEL LOCATION
function cancelLocation() {
    centrepointLocation = {};
    centrepointSet = false;
    locationConfirmed = true;

    //refresh map
    refreshMap();

    //remove buttons
    let buttonsRef = document.getElementById('buttons');
    let displayButtons = '';
    buttonsRef.innerHTML = displayButtons;
}

//Displaying searach results
function displaySearchResults(result) //result should be an instance of SearchResult
{
    let name = result.name;
    let lat = result.lat;
    let lng = result.lng;
    let address = result.formatted;
    let categories = result.categories;
    
    //Show Marker
    //set marker position
    let marker = resultMarker(lat, lng);
    marker.setLngLat([lng, lat]);

    //popup with formated information
    let popup = new mapboxgl.Popup({ offset: 45 });
    popup.setHTML(`<p>${name}</p><button type="button" onclick="bookmarkSearchResult(${result._position})">Bookmark</button>`);

    //set popup to marker
    marker.setPopup(popup);

    //add marker to map
    marker.addTo(map);

    //add popup to map
    popup.addTo(map);
}

//Bookmark Search Result
function bookmarkSearchResult(resultPosition) //result is an instance of SearchResult
{
    resultInstanceList[resultPosition]._bookmarked = true;
    searchResultBookmarkList.addSearchResult(resultInstanceList[resultPosition]);
    setLocalStorage(SEARCH_RESULT_BOOKMARK_LIST_KEY, searchResultBookmarkList);
    console.log(`${resultInstanceList[resultPosition]._address} has been bookmarked.`);
    displaySearchResultBookmark();
}

//Bookmark Centrepoint
function bookmarkCentrepoint()
{
    centrepointLocation.bookmarked = true;
    centrepointBookmarkList.addCentrepoint(centrepointLocation);
    setLocalStorage(CENTREPOINT_LIST_KEY, centrepointBookmarkList);
    console.log(`${centrepointLocation.address} has been bookmarked.`);
}

//Display Search Result Bookmark List
function displaySearchResultBookmark()
{
    let bookmarkRef = document.getElementById('bookmarkList')
    let list = '<span><i class="fas fa-bookmark"></i></span><br><p>Bookmarks:\n</p>';
    for (let i = 0; i < searchResultBookmarkList.list.length; i++)
    {
        list += `<p>${searchResultBookmarkList.list[i].address}</p>`;
    }
    console.log(bookmarkRef);
    bookmarkRef.innerHTML = list;
}

//CURRENT LOCATION
function getCurrentLocation() {
    if ('geolocation' in navigator) {
        console.log('Geolocation is available.')
        locationConfirmed = false;
        navigator.geolocation.getCurrentPosition((position) => {
            reverseGeocode(position.coords.latitude, position.coords.longitude);
        });
    }
    else {
        console.log('Geolocation is not available.')
    }
}

//CHANGE MAP STYLE
function changeMapStyle(style) {
    mapStyle = style;
    refreshMap();
}

//test buttons
function sayTest() {
    console.log('test');
}