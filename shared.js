//<<<<<<< HEAD
"use strict";

//Local Storage Keys
const CENTREPOINT_LIST_KEY = 'centrepointList';
const SEARCH_RESULT_BOOKMARK_LIST_KEY = 'searchResultBookmarkList';
const REVIEW_LIST_KEY = 'reviewList';



//LOCAL STORAGE FUNCTIONS
//check if local storage is available
function checkLocalStorage(key)
{
    if (typeof (Storage) !== "undefined")
    {
        if (localStorage.getItem(key) !== null)
        {
            return true;
        }
        else
        {
            return false;
        }
    }
    else
    {
        return false;
    }
}

//set local storage
function setLocalStorage(key, data)
{
    data = JSON.stringify(data);
    localStorage.setItem(key, data);
}

//get data
function getLocalStorage(key)
{
    let data = localStorage.getItem(key);
    try
    {
        data = JSON.parse(data);
    }
    catch (e)
    {
        console.log(e);
    }
    finally
    {
        return data;
    }
}



//CLASSES
//Centrepoint class
class Centrepoint
{
    constructor(lat, lng, address)
    {
        this._lat = lat;
        this._lng = lng;
        this._address = address;
        this._bookmarked = false;
        this._position = 0;
    }

    get lat()
    {
        return this._lat;
    }

    get lng()
    {
        return this._lng;
    }

    get address()
    {
        return this._address;
    }

    get bookmarked()
    {
        return this._bookmarked;
    }

    get position()
    {
        return this.position;
    }

    set bookmarked(bookmarked)
    {
        this._bookmarked = bookmarked;
    }

    set position(position)
    {
        this._position = position;
    }

    fromData(dataObject)
    {
        this._lat = dataObject._lat;
        this._lng = dataObject._lng;
        this._address = dataObject._address;
        this._bookmarked = dataObject._bookmarked;
    }
}

//Centrepoint List Class
class CentrepointList
{
    constructor()
    {
        this._list = [];
    }

    get list()
    {
        return this._list;
    }

    addCentrepoint(centrepointInstance)
    {
        this._list.push(centrepointInstance);
        this._list[this._list.length-1].position = this._list.length-1;
    }

    assignPosition()
    {
        for (let i = 0; i < this._list.length; i++)
        {
            this._list[i].position = i;
        }
    }

    fromData(dataObject)
    {
        for (let i = 0; i < dataObject._list.length; i++)
        {
            let centrepointInstance = new Centrepoint;
            centrepointInstance.fromData(dataObject._list[i]);
            this.addCentrepoint(centrepointInstance);
        }
    }
}

//Review List Class
class ReviewList
{
    constructor()
    {
        this._list = [];
    }

    get list()
    {
        return this._list;
    }

    addReview(searchResult)
    {
        this._list.push(searchResult);
    }

    fromData(dataObject)
    {
        for (let i = 0; i < dataObject._list.length; i++)
        {
            let searchResultInstance = new SearchResult;
            searchResultInstance.fromData(dataObject._list[i]);
            this.addReview(searchResultInstance);
        }
    }
}

//Search result class
class SearchResult {
    constructor(name, lat, lng, address, category, position, bookmarked = false, review = 0){
        this._name = name;
        this._lat = lat;
        this._lng = lng;
        this._address = address;
        this._category = category;
        this._bookmarked = bookmarked;
        this._review = review;
        this._position = position;
        this._roadDistance = 0;
        this._showReview = false;
    }

    get name(){
        return this._name 
    }
    
    get lat(){
        return this._lat;
    }

    get lng(){
        return this._lng;
    }

    get address(){
        return this._address;
    }

    get category(){
        return this._category;
    }

    get bookmarked(){
        return this._bookmarked;
    }
    
    get review(){
        return this._review;
    }

    get position(){
        return this._position;
    }

    get roadDistance()
    {
        return this._roadDistance;
    }

    get showReview()
    {
        return this._showReview;
    }

    set bookmarked(bookmarked){
        this._bookmarked = bookmarked;
    }

    set roadDistance(distance)
    {
        this._roadDistance = distance;
    }

    set review(review)
    {
        this._review = review;
    }

    set position(position){
        this._position = position;
    }

    set showReview(showReview)
    {
        this._showReview = showReview;
    }

    addReview(review){
        this._review = review;
        updateReviewBookmarkList(this);
        updateReviewLocalStorage(this);
    }

    displayReview()
    {
        if (this._showReview)
        {
            hideSearchResultReview(this._position);
        }
        else
        {
            showSearchResultReview(this._position);
        }
    }

    getDistance(centrepoint){
        // Calculates the distance between the search reseult and a centrePoint
        const R = 6371e3; // metres
        const φ1 = centrepoint.lat * Math.PI/180; // φ, λ in radians 
        const φ2 = this.lat * Math.PI/180;
        const Δφ = (this.lat - centrepoint.lat) * Math.PI/180;
        const Δλ = (this.lng - centrepoint.lng) * Math.PI/180;

        const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
          Math.cos(φ1) * Math.cos(φ2) *
          Math.sin(Δλ/2) * Math.sin(Δλ/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

        const d = R * c; // in metres
  
        return d
    }

    //Function to receive result from road distance request
    dataRoadDistance(result)
    {
        this._roadDistance = result.routes[0].distance;
    }

    getTimeTaken()
    {
        return (this._roadDistance/vehicleSpeed)*60;
    }

    //(name, lat, lng, address, category, position, bookmarked = false, review = 0)
    fromData(dataObject)
    {
        this._name = dataObject._name;
        this._lat = dataObject._lat;
        this._lng = dataObject._lng;
        this._address = dataObject._address;
        this._category = dataObject._category;
        this._bookmarked = dataObject._bookmarked;
        this._review = dataObject._review;
    }
}

//Search result list class
class SearchResultBookmarkList
{
    constructor()
    {
        this._list = [];
    }

    get list()
    {
        return this._list;
    }

    addSearchResult(searchResultInstance)
    {
        this._list.push(searchResultInstance);
    }

    sort(property)
    {
        if (property == 'name')
        {
            this._list.sort(sortBy.name);
        }
        if (property == 'address')
        {
            this._list.sort(sortBy.address);
        }
        if (property == 'review')
        {
            this._list.sort(sortBy.review);
            this._list.reverse();
        }
        if (property == 'distance')
        {
            this._list.sort(sortBy.distance);
        }
    }

    fromData(dataObject)
    {
        for (let i = 0; i < dataObject._list.length; i++)
        {
            let searchResultInstance = new SearchResult;
            searchResultInstance.fromData(dataObject._list[i]);
            this.addSearchResult(searchResultInstance);
        }
    }
}

//Road distance
async function requestRoadDistance(searchResult, centrepoint)
{
    let url = `https://api.mapbox.com/directions/v5/mapbox/driving/${centrepoint.lng},${centrepoint.lat};${searchResult.lng},${searchResult.lat}?access_token=${MAPBOX_TOKEN}`
    let response = await fetch(url);
    let result = await response.json();
    let distance = result.routes[0].distance;
    resultInstanceList[searchResult.position].roadDistance = distance;
    return resultInstanceList[searchResult.position];
    /*fetch(url)
        .then(response => response.json())
        .then(result => this.dataRoadDistance(result))
        .catch(error => console.log('error', error));*/
}



//INITIALISATION

//Initialises centrepoint list if none exists
let centrepointBookmarkList = new CentrepointList();
if (typeof Storage !== 'undefined')
{
    if (checkLocalStorage(CENTREPOINT_LIST_KEY) == true)
    {
        let centrepointBookmarkListData = getLocalStorage(CENTREPOINT_LIST_KEY);
        centrepointBookmarkList.fromData(centrepointBookmarkListData);
    }
    else
    {
        setLocalStorage(CENTREPOINT_LIST_KEY, centrepointBookmarkList);
    }
}

//Initialise search result list if none exists
let searchResultBookmarkList = new SearchResultBookmarkList();
if (typeof Storage !== 'undefined')
{
    if (checkLocalStorage(SEARCH_RESULT_BOOKMARK_LIST_KEY) == true)
    {
        let searchResultBookmarkListData = getLocalStorage(SEARCH_RESULT_BOOKMARK_LIST_KEY);
        searchResultBookmarkList.fromData(searchResultBookmarkListData);
    }
    else
    {
        setLocalStorage(SEARCH_RESULT_BOOKMARK_LIST_KEY, searchResultBookmarkList);
    }
}

//Initialise review list if none
let reviewList = new ReviewList();
if (typeof Storage !== 'undefined')
{
    if (checkLocalStorage(REVIEW_LIST_KEY) == true)
    {
        let reviewData = getLocalStorage(REVIEW_LIST_KEY);
        reviewList.fromData(reviewData);
    }
    else
    {
        setLocalStorage(REVIEW_LIST_KEY, reviewList);
    }
}

//Update local storage for reviews
function updateReviewLocalStorage(searchResult)
{
    if (!checkReviewList(searchResult))
    {
        reviewList.list.push(searchResult);
    }
    setLocalStorage(REVIEW_LIST_KEY, reviewList);
}

function checkReviewList(searchResult)
{
    for (let i = 0; i < reviewList.list.length; i++)
    {
        if (searchResult.address == reviewList.list[i].address)
        {
            reviewList.list[i]._review = searchResult.review;
            return true;
        }
    }
    return false;
}



//OTHER FUNCTIONS

//Update search result bookmark list for reviews
function updateReviewBookmarkList(searchResult)
{
    for (let i = 0; i < searchResultBookmarkList.list.length; i++)
    {
        if (searchResultBookmarkList.list[i].address == searchResult.address)
        {
            searchResultBookmarkList.list[i].review = searchResult.review;
            setLocalStorage(SEARCH_RESULT_BOOKMARK_LIST_KEY, searchResultBookmarkList);
        }
    }
}

//Display centrepoint bookmarks
displayCentrepointBookmark();

displaySearchResultBookmark();


//>>>>>>> 8c7c1301d9bc431f28317d6b644614957730f726