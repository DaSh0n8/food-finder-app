function searchMap() {
    var requestOptions = {
        method: 'GET',
      };
      if (!locationConfirmed)
      {
          window.alert('Please confirm a centrepoint.');
          return;
      }
      let select = document.getElementById('select').value;
      switch (select)
      {
        case 'Restaurant':
            select = 'catering.restaurant';
            break;
        case 'Fast food':
            select = 'catering.fast_food';
            break;
        case 'Coffee':
            select = 'catering.cafe';
            break;
        case 'Food court':
            select = 'catering.foot_court';
            break;
        case 'Bar':
            select = 'catering.bar';
            break;
        case 'Pub':
            select = 'catering.pub';
            break;
        case 'Ice cream':
            select = 'catering.ice_cream';
            break;
        default:
            window.alert('Please select a category to search.');
            return;
      }
      let searchRadius = document.getElementById('radius').value;
      if (searchRadius == '')
      {
        window.alert('Please enter a search radius.');
        return;
      }
      //fetch(`https://api.geoapify.com/v2/places?categories=${select}&filter=circle:${centrepointLocation.lng},${centrepointLocation.lat},2000&bias=proximity:${centrepointLocation.lng},${centrepointLocation.lat}&limit=5&apiKey=89c1dc776459400bb23c1c7ec8189025`, requestOptions)
      //there is a max 500 limit for search results
      fetch(`https://api.geoapify.com/v2/places?categories=${select}&filter=circle:${centrepointLocation.lng},${centrepointLocation.lat},10000&bias=proximity:${centrepointLocation.lng},${centrepointLocation.lat}&limit=500&apiKey=89c1dc776459400bb23c1c7ec8189025`, requestOptions)
        .then(response => response.json())
        .then(result => filterData(result))
        .catch(error => console.log('error', error));
}

//Adam: filter data (for the project's requirements and show dem marks)
function filterData(results)
{
    let searchRadius = document.getElementById('radius').value;
    filteredList = [];
    //filter categories
    for (let i = 0; i < results.features.length; i++)
    {
        let properties = results.features[i].properties;
        if (!properties.hasOwnProperty('name'))
        {
            properties.name = 'This place has no name. (???)'
        }
        let res = new SearchResult(properties.name,properties.lat,properties.lon,properties.formatted,properties.categories,0);
        if (res.getDistance(centrepointLocation) <= searchRadius)
        {
            filteredList.push(res);
        }
    }
    limitData(filteredList)
}

//Adam: limitData function; O(n^2), yikes!
function limitData(filteredList)
{
    if (filteredList.length == 0)
    {
        window.alert('No nearby places found.');
        return;
    }
    resultInstanceList = [];
    for (let i = 0; i < searchLimit; i++)
    {
        minDistance = filteredList[0].getDistance(centrepointLocation)
        minIndex = 0;
        for (let j = 0; j < filteredList.length; j++)
        {
            distance = filteredList[j].getDistance(centrepointLocation);
            if (distance < minDistance)
            {
                minDistance = distance;
                minIndex = j;
            }
        }
        filteredList[minIndex].position = i;
        if (checkInSearchResultBookmarkList(filteredList[minIndex]))
        {
            filteredList[minIndex].bookmarked = true;
        }
        resultInstanceList.push(filteredList[minIndex]);
        filteredList.splice(minIndex,1);
    }
    drawResult()
}

function checkInSearchResultBookmarkList(searchResult)
{
    for (let i = 0; i < searchResultBookmarkList._list.length; i++)
    {
        if (searchResult.address == searchResultBookmarkList._list[i].address)
        {
            return true;
        }
    }
    return false;
}

function drawResult() {
    //console.log(result);
    //console.log(result.features[0].properties.lat);
    //console.log(result.features[0].properties.lon);
    /*for (let i = 0; i < result.features.length; i++) {
      resultList.push({lat:result.features[i].properties.lat,lng:result.features[i].properties.lon})
      reverseGeocode(result.features[i].properties.lat,result.features[i].properties.lon,true,false)
    }*/
    refreshMap();
    for (let i = 0; i < resultInstanceList.length; i++)
    {
        displaySearchResults(resultInstanceList[i]);
    }
}