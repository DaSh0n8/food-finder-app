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
function displayCentrepointBookmark()
{
    let bookmarkCentrepointRef = document.getElementById('bookmarkCentrepointList')
    //Display Bookmarked Centrepoints
    let listCentrepoints = '<p>Bookmarked Centrepoints:\n</p>';
    for (let i = 0; i < centrepointBookmarkList._list.length; i++)
    {
        listCentrepoints += `<p>(${i+1}) ${centrepointBookmarkList._list[i].address}</p>
                            <button onClick='selectCentrepointBookmark(${i})'>Select Centrepoint</button>
                            <button onClick="removeCentrepointBookmark(${i})" class="delete">Delete</button>`;
    }
    //console.log(bookmarkRef);
    bookmarkCentrepointRef.innerHTML = listCentrepoints;
}

//Display Search Result Bookmark List
function displaySearchResultBookmark()
{
    let bookmarkRef = document.getElementById('bookmarkListDisplay')
    let list = '<p>Bookmarked Places:\n</p>';
    for (let i = 0; i < searchResultBookmarkList.list.length; i++)
    {
        let name = i
        list += `<p>${searchResultBookmarkList.list[i].address}</p>
                 <a onClick="removeSearchResultBookmark(${name})" class="delete">Delete</a>`;
    }
    console.log(bookmarkRef);
    bookmarkRef.innerHTML = list;
}

function removeCentrepointBookmark(itemIndex)
{
    //console.log(itemIndex)
    centrepointBookmarkList.list.splice(itemIndex,1);
    /*for (let n = 0; n < searchResultBookmarkList.list.length; n++)
    /{
        searchResultBookmarkList.addSearchResult(searchResultBookmarkList.list[n]);
        
    }
    */
    setLocalStorage(CENTREPOINT_LIST_KEY, centrepointBookmarkList);

    displayCentrepointBookmark()
}

function removeCentrepointBookmark(itemIndex)
{
    console.log(itemIndex)
    centrepointBookmarkList.list.splice(itemIndex,1)
    /*for (let n = 0; n < searchResultBookmarkList.list.length; n++)
    /{
        searchResultBookmarkList.addSearchResult(searchResultBookmarkList.list[n]);
        
    }
    */
    setLocalStorage(CENTREPOINT_LIST_KEY, centrepointBookmarkList);
    displayCentrepointBookmark()
}

function removeSearchResultBookmark(itemIndex)
{
    console.log(itemIndex)
    searchResultBookmarkList.list.splice(itemIndex,1);
    /*for (let n = 0; n < searchResultBookmarkList.list.length; n++)
    /{
        searchResultBookmarkList.addSearchResult(searchResultBookmarkList.list[n]);
        
    }
    */
    setLocalStorage(SEARCH_RESULT_BOOKMARK_LIST_KEY, searchResultBookmarkList);
    displaySearchResultBookmark()   
}

let sortBy = {
    name: function(a,b)
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
    },
    address: function(a,b)
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
    },
    review: function(a,b)
    {
        if (a.review < b.review)
        {
            return -1;
        }
        if (a.review > b.review)
        {
            return 1;
        }
        return 0;
    },
    distance: function(a,b)
    {
        if (a.getDistance(centrepointLocation) < b.getDistance(centrepointLocation))
        {
            return -1;
        }
        if (a.getDistance(centrepointLocation) > b.getDistance(centrepointLocation))
        {
            return 1;
        }
        return 0;
    }
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