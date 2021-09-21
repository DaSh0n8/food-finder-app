function searchMap() {
    var requestOptions = {
        method: 'GET',
      };
      let select = document.getElementById('select').value;
      if (select == "Restaurant") {
        select = "catering.restaurant"
      }
      else if (select == "Coffee") {
        select = "catering.cafe";	
      }
      else {
        window.alert("Please select what you want to search!");
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
    for (let i = 0; i < searchLimit; i++)
    {
        minDistance = filteredList[0].getDistance(centrepointLocation)
        minIndex = 0;
        for (let j = 0; j< filteredList.length; j++)
        {
            distance = filteredList[j].getDistance(centrepointLocation);
            if (distance < minDistance)
            {
                minDistance = distance;
                minIndex = j;
            }
        }
        resultInstanceList.push(filteredList[minIndex]);
        filteredList.splice(minIndex,1);
    }
    drawResult()
}

function drawResult() {
    //console.log(result);
    //console.log(result.features[0].properties.lat);
    //console.log(result.features[0].properties.lon);
    /*for (let i = 0; i < result.features.length; i++) {
      resultList.push({lat:result.features[i].properties.lat,lng:result.features[i].properties.lon})
      reverseGeocode(result.features[i].properties.lat,result.features[i].properties.lon,true,false)
    }*/
    for (let i = 0; i < resultInstanceList.length; i++)
    {
        displaySearchResults(resultInstanceList[i]);
    }
}