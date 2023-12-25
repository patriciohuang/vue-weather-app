import City from '@/classes/city'
import Weather from '@/classes/weather'
import axios from 'axios'
import { defineStore } from 'pinia'

const dayAfterTomorrow = new Date();
dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 2);
dayAfterTomorrow.setHours(0, 0, 0, 0);

export const useWeatherStore = defineStore('weather', {
  state: () => ({
    unitSystem: '',
    cities: [new City(52.3727598, 4.8936041, 'Amsterdam', 'NL')],
    loading: false,
    weatherError: false,
    searchText: '',
    searchResults: [],
    searching: false,
    searchError: false
  }),
  actions: {
    async fetchWeather() {
      this.weatherError = false
      try {
        this.cities.forEach(async city => {
          const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${city.lat}&cnt=16&lon=${city.lon}&appid=3d73f7682621c007f0a32e31c44dba02`)
          const cityData = response.data
          city.conditions = cityData.list.filter(item => (new Date(item.dt_txt)).getTime() < dayAfterTomorrow.getTime()).map(item => {
            return new Weather(
              item.dt_txt,
              item.weather[0].icon,
              item.weather[0].description,
              item.temp,
              item.rain?.['3h'] || 0
            );
          })
        })
        console.log(this.cities)
      } catch (error) {
        this.weatherError = true
        console.error(error);
      }
    },
    async updateSearch(searchText) {
      this.searchError = false;
      this.searchText = searchText;
      if (searchText === '') {
        this.searchResults = []
      } else {
        this.searching = true;
        try {
          const response = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${searchText}&limit=5&appid=3d73f7682621c007f0a32e31c44dba02`)
          this.searchResults = response.data.map(item => {
            return new City(
              item.lat,
              item.lon,
              item.name,
              item.country
            )
          })
        } catch (error) {
          this.searchError = true;
          console.error(error);
        } finally {
          this.searching = false;
        }
      }
    },
    addCity(city) {
      if(!this.cities.some(item => city.lat === item.lat && city.lon === item.lon))
      {
        this.cities.push(city)
        this.fetchWeather()
      }
      this.updateSearch('')
    }
  }
})