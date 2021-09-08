"use strict";

let centrepointLocation = {};
let newLocation = {};
let centrepointSet = false;
let markerList = [];
let resultList = [];
let locationConfirmed = true;

const APPDATA_KEY = 'appdatakey';
const INCOMPLETE_KEY = 'incompletekey';

//Mapbox Token
const MAPBOX_TOKEN = "pk.eyJ1IjoiYXlhbjAwMjQiLCJhIjoiY2tvMjlpNmhuMDRvdzJ2cDd0YmEydXlvNyJ9.Z_aXI5F08j46RNFcrDuJfQ";
//Opencage Geocode Token
const OPENCAGE_TOKEN = '616df02868e141878736c00fb6840f26';
//Geoapify Token
const GEOAPIFY_TOKEN = '94fc6b02418d4459b2d161af64dd7d27';

// web service request function
function webServiceRequest(url, data)
{
    // Build URL parameters from data object.
    let params = "";
    // For each key in data object...
    for (let key in data)
    {
        if (data.hasOwnProperty(key))
        {
            if (params.length == 0)
            {
                // First parameter starts with '?'
                params += "?";
            }
            else
            {
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

function buildURL(url, data)
{
    // Build URL parameters from data object.
    let params = "";
    // For each key in data object...
    for (let key in data)
    {
        if (data.hasOwnProperty(key))
        {
            if (params.length == 0)
            {
                // First parameter starts with '?'
                params += "?";
            }
            else
            {
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

function forwardGeocode()
{
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
function getData(result)
{
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

function getDataEdit(result)
{
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


//Initialising map
let mapStyle = 'osm-carto'

mapboxgl.accessToken = MAPBOX_TOKEN;
let map = new mapboxgl.Map(
    {
        container: 'map',
        style: `https://maps.geoapify.com/v1/styles/${mapStyle}/style.json?apiKey=${GEOAPIFY_TOKEN}`, // stylesheet location
        center: [144.9626398, -37.8104191], // starting position [lng, lat]
        zoom: 9 // starting zoom
    });
globalThis.map;

//MAP ON CLICK
map.on('style.load', function ()
{
    map.on('click', function (click)
    {
        if (locationConfirmed)
        {
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
function newMarker(x, y)
{
    let marker = new mapboxgl.Marker({ draggable: true, color: '#3FB1CE' });
    marker.setLngLat([y, x]);
    console.log(`New marker at (${x}, ${y}).`)
    marker.on('dragend', onDragEnd);
    markerList.push(marker);
    return marker;
}

//STATIC MARKERS
function staticMarker(x, y)
{
    let marker = new mapboxgl.Marker({ draggable: false, color: '#4AE961' });
    marker.setLngLat([y, x]);
    return marker;
}

//RESULT MARKERS
function resultMarker(x, y)
{
    let marker = new mapboxgl.Marker({ draggable: false, color: '#e71e28' });
    marker.setLngLat([y, x]);
    return marker;
}

//REVERSE GEOCODE
function reverseGeocode(x, y, edit = false)
{
    let coordinates = `${x}+${y}`;
    let data =
    {
        q: coordinates,
        key: OPENCAGE_TOKEN,
        callback: 'getData'
    }
    if (edit)
    {
        data.callback = 'getDataEdit'
    }
    webServiceRequest('https://api.opencagedata.com/geocode/v1/json', data);
}

function onDragEnd(marker)
{
    let coordinates = marker.target._lngLat;
    centrepointLocation = coordinates;
    reverseGeocode(coordinates.lat, coordinates.lng, true);
}

//REFRESH MAP
function refreshMap()
{
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

    map.on('style.load', function ()
    {
        //make sure that the map is clickable if there is no centrepoint
        if (!centrepointSet && locationConfirmed)
        {
            map.on('click', function (click)
            {
                locationConfirmed = false;
                let coordinates = click.lngLat;
                let x = coordinates.lat;
                let y = coordinates.lng;
                reverseGeocode(x, y);
            });
        }
        else
        {
            //recreate centrepoint location
            let marker = staticMarker(centrepointLocation.lat, centrepointLocation.lng); //change based on class

            //add marker to map
            marker.addTo(map);

            //popup with formated information
            let popup = new mapboxgl.Popup({ offset: 45 });
            popup.setHTML('INSERT INFORMATION HERE');

            //set popup to marker
            marker.setPopup(popup);

            //add popup to map
            popup.addTo(map);
        }

        //recreate result locations
        for (let i = 0; i < resultList.length; i++)
        {
            let markerResult = resultMarker(resultList[i].lat,resultList[i].lng);
            markerResult.addTo(map);
        }
    });
}

//CONFIRM LOCATION
function confirmLocation()
{
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
function cancelLocation()
{
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

//CHANGE MAP STYLE
function changeMapStyle(style)
{
    mapStyle = style;
    refreshMap();
}

//Test location markers
function testResults()
{
    resultList.push(
        {
            lat: -37.8337851,
            lng: 145.0059866
        }, 
        {
            lat: -37.8349175,
            lng: 145.018526
        },
        {
            lat: -37.8405046,
            lng: 145.0245795
        }
    )
    refreshMap();
}