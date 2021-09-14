// Constructing Classes


class CentrePoint{
    constructor(lat, lng, address, bookmarked){
        this.lat = lat;
        this.lng = lng;
        this.address = address;
        this.bookmarked = bookmarked;
    }

    getLat(){
        return this.lat;
    }
    getLng(){
        return this.lng;
    }
}


class SearchResult {
    constructor(name, lat, lng, address, category, bookmarked, review){
        this.name = name;
        this.lat = lat;
        this.lng = lng;
        this.address = address;
        this.category = category;
        this.bookmarked = bookmarked = false;
        this.review = review; 

    }

    getName(){
        return this.name 
    }
    
    getLat(){
        return this.lat;
    }

    getLng(){
        return this.lng;
    }

    getAddress(){
        return this.address;
    }

    getCategory(){
        return this.category;
    }
    getBookMarked(){
        return this.bookmarked;
    }
    
    getReview(){
        return this.review;
    }

    setBookmarked(bookmarked){
        this.bookmarked = bookmarked;
    }

    addReview(review){
        this.review = review
    }

    getDistance(CentrePoint){
        // Calculates the distance between the search reseult and a centrePoint
        const R = 6371e3; // metres
        const φ1 = CentrePoint.getLat() * Math.PI/180; // φ, λ in radians 
        const φ2 = this.getLat() * Math.PI/180;
        const Δφ = (this.getLat() - CentrePoint.getLat()) * Math.PI/180;
        const Δλ = (this.getLng() - CentrePoint.getLng()) * Math.PI/180;

        const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
          Math.cos(φ1) * Math.cos(φ2) *
          Math.sin(Δλ/2) * Math.sin(Δλ/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

        const d = R * c; // in metres
  
        return d

    }

}

