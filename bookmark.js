centrepointSortBy = 'name';
searchResultSortBy = 'name';

//Bookmark Search Result
function bookmarkSearchResult(resultPosition) //result is an instance of SearchResult
{
    for (let i = 0; i < searchResultBookmarkList.list.length; i++) {
        if (searchResultBookmarkList.list[i].address == resultInstanceList[resultPosition].address) {
            window.alert('Place already bookmarked.');
            return;
        }
    }
    resultInstanceList[resultPosition]._bookmarked = true;
    searchResultBookmarkList.addSearchResult(resultInstanceList[resultPosition]);
    setLocalStorage(SEARCH_RESULT_BOOKMARK_LIST_KEY, searchResultBookmarkList);
    console.log(`${resultInstanceList[resultPosition]._address} has been bookmarked.`);
    displaySearchResultBookmark();
}

//Bookmark Centrepoint
function bookmarkCentrepoint() {
    for (let i = 0; i < centrepointBookmarkList.list.length; i++) {
        if (centrepointBookmarkList.list[i].address == centrepointLocation.address) {
            window.alert('Centrepoint already bookmarked.');
            return;
        }
    }
    centrepointLocation.bookmarked = true;
    centrepointBookmarkList.addCentrepoint(centrepointLocation);
    setLocalStorage(CENTREPOINT_LIST_KEY, centrepointBookmarkList);
    console.log(`${centrepointLocation.address} has been bookmarked.`);
    displayCentrepointBookmark();
}

//Display Centrepoint Bookmark List
function displayCentrepointBookmark() {
    let bookmarkCentrepointRef = document.getElementById('bookmarkCentrepointList')
    //Display Bookmarked Centrepoints
    let listCentrepoints = '<h4 style="border-block: 10px;font-style: italic;border: black;border-style: solid;width: 30%;padding: 5px;">Bookmarked Centrepoints:\n</h4>';
    for (let i = 0; i < centrepointBookmarkList._list.length; i++) {
        listCentrepoints += `
                            <span style="display:flex; flex-flow:row;">
                            <p>(${i + 1}) ${centrepointBookmarkList._list[i].address} &nbsp; &nbsp;</p>
                            <button onClick='selectCentrepointBookmark(${i})' class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent"
                            id="buttonCancel" style="position:absolute; right:150px; background:green;">
                                Select Centrepoint
                            </button>           

                            <button onClick="removeCentrepointBookmark(${i})" 
                            class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent"
                            id="buttonCancel" style="position:absolute; right:50px; background:red;">
                                Delete
                            </button> </span>
                            `;
    }
    //console.log(bookmarkRef);
    bookmarkCentrepointRef.innerHTML = listCentrepoints;
}

//Display Search Result Bookmark List
function displaySearchResultBookmark() {
    let bookmarkRef = document.getElementById('bookmarkListDisplay')
    let list = '<h4 style="border-block: 10px;font-style: italic;border: black;border-style: solid;width: 30%;padding: 5px;">Bookmarked Places:\n</h4>';
    for (let i = 0; i < searchResultBookmarkList.list.length; i++) {
        let name = i
        list += `<span style="display:flex; flex-flow:row;"><p>(${i + 1}) ${searchResultBookmarkList.list[i].address} &nbsp; &nbsp;</p>
                 <button onClick="removeSearchResultBookmark(${name})" 
                    class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent"
                    id="buttonCancel" style="position:absolute; right:250px; background:red;">
                            Delete
                 </button> </span>
                 `;
    }
    console.log(bookmarkRef);
    bookmarkRef.innerHTML = list;
}

function removeCentrepointBookmark(itemIndex) {
    //console.log(itemIndex)
    centrepointBookmarkList.list.splice(itemIndex, 1);
    /*for (let n = 0; n < searchResultBookmarkList.list.length; n++)
    /{
        searchResultBookmarkList.addSearchResult(searchResultBookmarkList.list[n]);
        
    }
    */
    setLocalStorage(CENTREPOINT_LIST_KEY, centrepointBookmarkList);

    displayCentrepointBookmark()
}

function removeCentrepointBookmark(itemIndex) {
    console.log(itemIndex)
    centrepointBookmarkList.list.splice(itemIndex, 1)
    /*for (let n = 0; n < searchResultBookmarkList.list.length; n++)
    /{
        searchResultBookmarkList.addSearchResult(searchResultBookmarkList.list[n]);
        
    }
    */
    setLocalStorage(CENTREPOINT_LIST_KEY, centrepointBookmarkList);
    displayCentrepointBookmark()
}

function removeSearchResultBookmark(itemIndex) {
    console.log(itemIndex)
    searchResultBookmarkList.list.splice(itemIndex, 1);
    /*for (let n = 0; n < searchResultBookmarkList.list.length; n++)
    /{
        searchResultBookmarkList.addSearchResult(searchResultBookmarkList.list[n]);
        
    }
    */
    setLocalStorage(SEARCH_RESULT_BOOKMARK_LIST_KEY, searchResultBookmarkList);
    displaySearchResultBookmark()
}

let sortBy = {
    name: function (a, b) {
        if (a.name < b.name) {
            return -1;
        }
        if (a.name > b.name) {
            return 1;
        }
        return 0;
    },
    address: function (a, b) {
        if (a.address < b.address) {
            return -1;
        }
        if (a.address > b.address) {
            return 1;
        }
        return 0;
    },
    review: function (a, b) {
        if (a.review < b.review) {
            return -1;
        }
        if (a.review > b.review) {
            return 1;
        }
        return 0;
    },
    distance: function (a, b) {
        if (a.getDistance(centrepointLocation) < b.getDistance(centrepointLocation)) {
            return -1;
        }
        if (a.getDistance(centrepointLocation) > b.getDistance(centrepointLocation)) {
            return 1;
        }
        return 0;
    }
}

function sortBookMark() {
    let value = document.getElementById('Sortselect').value;
    if (value == "Name") {
        searchResultBookmarkList.sort("name");
    }
    else
        if (value == "Address") {
            searchResultBookmarkList.sort("address");
        }
        else
            if (value == "Review") {
                searchResultBookmarkList.sort("review");
            }
            else
                if (value == "Distance") {
                    if (centrepointLocation == {} || centrepointLocation == null) {
                        window.alert("Please choose the Centre point to use this service !");
                    }
                    else {
                        searchResultBookmarkList.sort("distance");
                    }
                }
    displaySearchResultBookmark();
}

//Function to run sorting algorithm and display it to the user
function sortSearchResultBookmarks()
{
    let category = document.getElementById('Sortselect').value;

    if (category == 'Distance' && centrepointSet == 'False')
    {
        window.alert('Please place down and confirm a centrepoint before sorting by distance');
        return;
    }

    searchResultBookmarkList.sort(category);

    displaySearchResultBookmark()

}
/*function sortCentrepointBookmark(a, b, property)
{
    if (centrepointSortBy == "name")
    {
        if (a.name < b.name)
        {
            return -1;
        }
        if (a.name > b.name)
        {
            return 1;
        }
        return 0;
    }
    else if (centrepointSortBy == "address")
    {
        if (a.address < b.address)
        {
            return -1;
        }
        if (a.address > b.address)
        {
            return 1;
        }
        return 0;
    }
}

function sortSearchResultBookmarks(a, b)
{
    if (searchResultSortBy == "name")
    {
        if (a.name < b.name)
        {
            return -1;
        }
        if (a.name > b.name)
        {
            return 1;
        }
        return 0;
    }
    else if (searchResultSortBy == "address")
    {
        if (a.address < b.address)
        {
            return -1;
        }
        if (a.address > b.address)
        {
            return 1;
        }
        return 0;
    }
}*/