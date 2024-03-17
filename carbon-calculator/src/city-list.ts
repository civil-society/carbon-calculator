import cities from "cities.json" assert { type: "json" };
import { Haversine, UnitOfDistance, DDPoint } from "haversine-ts";
import { DistanceFrom as distFrom } from "distance-from";

export class City {
  name: string = "";
  lat: string = "";
  lng: string = "";
  country: string = "";
  admin1: string = "";
  admin2: string = "";
}

/**
 * INterface for https://www.npmjs.com/package/cities.json
 */
export class CityList {
  _cities: Array<any> = [];

  constructor() {
    this._cities = cities as Array<any>;

    // for(var i = 0; i < cities.length; i++)

    // this._cities = cities as Array<City>;
    // console.log(this._cities);
  }

  findCities(searchTerm: string) {
    let filterCities = this._cities.filter((city) =>
      // city.name.match(searchTerm)
      city.name.toLowerCase().startsWith(searchTerm.toLowerCase())
    );
    filterCities.sort(this.byUSA);
    filterCities.sort(this.byIL);

    return filterCities.slice(0, 5);
  }

  byUSA(a: City, b: City) {
    if (a.country == "US" && b.country != "US") {
      return -1;
    } else if (a.country != "US" && b.country == "US") {
      return 1;
    }
    return 0;
  }

  byIL(a: City, b: City) {
    if (a.admin1 == "IL" && b.admin1 != "IL") {
      return -1;
    } else if (a.admin1 != "IL" && b.admin1 == "IL") {
      return 1;
    }
    return 0;
  }

  static getDistanceBetweenCities(fromCity: City, toCity: City) {
    const lat1 = Number(fromCity.lat);
    const lat2 = Number(toCity.lat);
    const lon1 = Number(fromCity.lng);
    const lon2 = Number(toCity.lng);

    const distance = Math.round(this.calcHaversine(lat1, lon1, lat2, lon2));
    // const distance = Math.round(
    //   Math.acos(
    //     Math.sin(lat1) * Math.sin(lat2) +
    //       Math.cos(lat1) * Math.cos(lat2) * Math.cos(lon2 - lon1)
    //   ) * 3958.8
    // );

    // const cityA = new DDPoint(lat1, lon1);
    // const cityB = new DDPoint(lat2, lon2);
    // const haversine = new Haversine(UnitOfDistance.Mile);
    // const distance = haversine.getDistance(cityA, cityB);

    // const cityA = [lat1, lon1];
    // const cityB = [lat2, lon2];
    // const distance = DistanceFrom(cityA).to(cityB);

    return distance;
  }

  static calcHaversine(lat1: number, lon1: number, lat2: number, lon2: number) {
    // var R = 6371; // km
    var R = 3958.8; // mi

    //has a problem with the .toRad() method below.
    var x1 = lat2 - lat1;
    var dLat = this.toRad(x1);
    var x2 = lon2 - lon1;
    var dLon = this.toRad(x2);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRad(lat1)) *
        Math.cos(this.toRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d;
  }

  static toRad(x: number) {
    return (x * Math.PI) / 180;
  }
}
