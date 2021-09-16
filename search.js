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
      fetch(`https://api.geoapify.com/v2/places?categories=${select}&filter=circle:${centrepointLocation.lng},${centrepointLocation.lat},2000&bias=proximity:${centrepointLocation.lng},${centrepointLocation.lat}&limit=5&apiKey=89c1dc776459400bb23c1c7ec8189025`, requestOptions)
        .then(response => response.json())
        .then(result => drawResult(result))
        .catch(error => console.log('error', error));
}

function drawResult(result) {
    //console.log(result);
    //console.log(result.features[0].properties.lat);
    //console.log(result.features[0].properties.lon);
    for (let i = 0; i < result.features.length; i++) {
      resultList.push({lat:result.features[i].properties.lat,lng:result.features[i].properties.lon})
      reverseGeocode(result.features[i].properties.lat,result.features[i].properties.lon,true,false)
    }
}