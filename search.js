function searchMap() {
    console.log('abc');
    var requestOptions = {
        method: 'GET',
      };
      
      fetch("https://api.geoapify.com/v2/places?categories=commercial.supermarket&filter=rect%3A10.716463143326969%2C48.755151258420966%2C10.835314015356737%2C48.680903341613316&limit=20&apiKey=89c1dc776459400bb23c1c7ec8189025", requestOptions)
        .then(response => response.json())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
}