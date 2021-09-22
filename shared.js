//<<<<<<< HEAD
"use strict";

//Local Storage Keys
const CENTREPOINT_LIST_KEY = 'centrepointList';
const SEARCH_RESULT_BOOKMARK_LIST_KEY = 'searchResultBookmarkList';



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

    set bookmarked(bookmarked)
    {
        this._bookmarked = bookmarked;
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



//centrepoint test function
function testCentrepoints()
{
    let test = new Centrepoint(1, 2 ,'d');
    centrepointList.addCentrepoint(test);
    test = new Centrepoint(3, 4, '2');
    centrepointList.addCentrepoint(test);
    test = new Centrepoint(8, 5, 'my house');
    centrepointList.addCentrepoint(test);
}



// Constructing Classes
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

    set bookmarked(bookmarked){
        this._bookmarked = bookmarked;
    }

    set position(position){
        this._position = position;
    }

    addReview(review){
        this._review = review
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

//Search Result List Class
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



//Initialises centrepoint list if none exists
let centrepointList = new CentrepointList();
if (typeof Storage !== 'undefined')
{
    if (checkLocalStorage(CENTREPOINT_LIST_KEY) == true)
    {
        let centrepointListData = getLocalStorage(CENTREPOINT_LIST_KEY);
        centrepointList.fromData(centrepointListData);
    }
    else
    {
        setLocalStorage(CENTREPOINT_LIST_KEY, centrepointList);
    }
}

//Initialise search result list if none exists
let searchResultBookmarkList = new SearchResultBookmarkList();
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

//Display bookmarks
let bookmarkRef = document.getElementById('bookmarkList')
let list = '<span><i class="fas fa-bookmark"></i></span><br><p>Bookmarks:\n</p>';
for (let i = 0; i < searchResultBookmarkList.list.length; i++)
{
    list += `<p>${searchResultBookmarkList.list[i].address}</p>`;
}
console.log(bookmarkRef);
bookmarkRef.innerHTML = list;

//>>>>>>> 8c7c1301d9bc431f28317d6b644614957730f726