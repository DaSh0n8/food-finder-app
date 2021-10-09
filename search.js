var searchCenter = document.getElementById('addDest');
searchCenter.addEventListener("keydown", function (e) {
    if (e.code === "Enter") {  //checks whether the pressed key is "Enter"
        searchCenterPoint();
    }
});

function searchMap() {
    var requestOptions = {
        method: 'GET',
      };
      if (!locationConfirmed)
      {
          window.alert('Please confirm a centrepoint.');
          return;
      }
      if (!centrepointSet)
      {
          window.alert('Please select a centrepoint by clicking on the map interface.')
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
      searchRadius = document.getElementById('myRadius').value;
      searchRadius = parseInt(searchRadius);
      /*if (searchRadius == '')
      {
        window.alert('Please enter a search radius.');
        return;
      }*/
      //fetch(`https://api.geoapify.com/v2/places?categories=${select}&filter=circle:${centrepointLocation.lng},${centrepointLocation.lat},2000&bias=proximity:${centrepointLocation.lng},${centrepointLocation.lat}&limit=5&apiKey=89c1dc776459400bb23c1c7ec8189025`, requestOptions)
      //there is a max 500 limit for search results
      fetch(`https://api.geoapify.com/v2/places?categories=${select}&filter=circle:${centrepointLocation.lng},${centrepointLocation.lat},10000&bias=proximity:${centrepointLocation.lng},${centrepointLocation.lat}&limit=500&apiKey=89c1dc776459400bb23c1c7ec8189025`, requestOptions)
        .then(response => response.json())
        .then(result => filterData(result))
        .catch(error => console.log('error', error));
}

function searchCenterPointData(result){
    // Get the first result (this will be the most relevant result)
    let properties = result.features[0].properties
    // Obtain the information for the new center point
    let newCenterPoint = new Centrepoint(properties.lat, properties.lon, properties.formatted)
    // Call reverse geocode to put the marker on the map 
    reverseGeocode(newCenterPoint.lat, newCenterPoint.lng)

}

function searchCenterPoint(){
    // First make sure no centerpoint has been confirmed before searching
    cancelLocation()
    var requestOptions = {
        method: 'GET',
      };
    // Obtain the text entered by the user
    var searchCenterPoint =  document.getElementById('addDest').value;
    // Valids the input, ensure it is not empty string
    if (searchCenterPoint == ""){
        window.alert('Please enter a destination');
        return;
    }
    
    // need to encode the query 
    searchCenterPoint = encodeURIComponent(searchCenterPoint);
    fetch(`https://api.geoapify.com/v1/geocode/search?text=${searchCenterPoint}}&limit=5&apiKey=89c1dc776459400bb23c1c7ec8189025`, requestOptions)
        .then(response => response.json())
        .then(result => searchCenterPointData(result))
        .catch(error => console.log('error', error));
}

// limit radius
var slideRadius = document.getElementById("myRadius");
var outputRadius = document.getElementById("demoRadius");
outputRadius.innerHTML = slideRadius.value; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
slideRadius.oninput = function() {
  outputRadius.innerHTML = this.value;
  searchRadius = this.value;
}

//Adam: filter data (for the project's requirements and show dem marks)
function filterData(results)
{
    searchRadius = document.getElementById('myRadius').value;
    searchRadius = parseInt(searchRadius);
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

// limit data
var slider = document.getElementById("myRange");
var output = document.getElementById("demo");
output.innerHTML = slider.value; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
  output.innerHTML = this.value;
  searchLimit = this.value;
}

// set vehicle
let vehicleSpeed = 60; //km h^-1
function setWalk() 
{
    vehicleSpeed = 5; //km h^-1
}
function setBike() 
{
    vehicleSpeed = 24; //km h^-1
}
function setCar() 
{
    vehicleSpeed = 60; //km h^-1
}

// travel distance based on vehicle speed
function travelDistance()
{
    let distance = 0;
    console.log(distance);
}

//comparison function for sorting
function compare(inst1,inst2)
{
    let dist1 = inst1.getDistance(centrepointLocation);
    let dist2 = inst2.getDistance(centrepointLocation);
    
    let comparison = 0;
    if (dist1 > dist2)
    {
        comparison = 1;
    }
    else if (dist2 > dist1)
    {
        comparison = -1;
    }
    return comparison;
}

//Adam: limitData function
function limitData(filteredList)
{
    if (filteredList.length == 0)
    {
        window.alert('No nearby places found.');
        return;
    }
    resultInstanceList = [];
    filteredList.sort(compare);
    let limit = searchLimit;
    //in the event there are less results than the search limit
    if (searchLimit > filteredList.length)
    {
        limit = filteredList.length;
    }
    for (let i = 0; i < limit; i++)
    {
        filteredList[i].position = i;
        filteredList[i].getRoadDistance(centrepointLocation);
        if (checkInSearchResultBookmarkList(filteredList[i]))
        {
            filteredList[i].bookmarked = true;
        }
        let reviewVal = checkInReviewList(filteredList[i]);
        if (reviewVal != 0)
        {
            filteredList[i].review = reviewVal;
        }
        resultInstanceList.push(filteredList[i]);
    }
    /*for (let i = 0; i < searchLimit; i++)
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
    }*/
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

function checkInReviewList(searchResult)
{
    for (let i = 0; i < reviewList.list.length; i++)
    {
        if (searchResult.address == reviewList.list[i].address)
        {
            return reviewList.list[i].review;
        }
    }
    return 0
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
