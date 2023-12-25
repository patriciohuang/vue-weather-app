export default class City {
  lat;
  lon;
  name;
  country;
  conditions = [];
  constructor(lat, lon, name, country) {
    this.lat = lat;
    this.lon = lon;
    this.name = name;
    this.country = country;
  }

}