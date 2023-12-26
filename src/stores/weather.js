import City from '@/classes/city'
import Weather from '@/classes/weather'
import axios from 'axios'
import { defineStore } from 'pinia'

const dayAfterTomorrow = new Date();
dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 2);
dayAfterTomorrow.setHours(0, 0, 0, 0);

export const useWeatherStore = defineStore('weather', {
  state: () => ({
    unitSystem: 'metric',
    cities: [new City(52.3727598, 4.8936041, 'Amsterdam', 'NL')],
    loading: false,
    weatherError: false
  }),
  actions: {
    async fetchWeather() {
      this.weatherError = false
      this.loading = true
      try {
        const allCitiesPromises = this.cities.map(async city => {
          const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${city.lat}&cnt=16&lon=${city.lon}&units=${this.unitSystem}&appid=3d73f7682621c007f0a32e31c44dba02`);
          const cityData = response.data;
          city.conditions = cityData.list.filter(item => (new Date(item.dt_txt)).getTime() < dayAfterTomorrow.getTime()).map(item => {
            return new Weather(
              item.dt_txt,
              item.weather[0].icon,
              item.weather[0].description,
              Math.round(item.main.temp),
              Math.round(item.pop * 100)
            );
          });
        });
        // Use Promise.all to wait for all API calls to complete
        await Promise.all(allCitiesPromises)
      } catch (error) {
        this.weatherError = true
      } finally {
        this.loading = false
      }
    },
    addCity(city) {
      if(!this.cities.some(item => city.lat === item.lat && city.lon === item.lon))
      {
        this.cities.push(city)
        this.fetchWeather()
      }
    },
    toggleUnitSystem() {
      if (this.unitSystem === 'metric') {
        this.unitSystem = 'imperial';
      } else {
        this.unitSystem = 'metric';
      }
      this.fetchWeather()
    },
    removeCity(city) {
      const index = this.cities.indexOf(city);

      if (index !== -1) {
        this.cities.splice(index, 1);
      }
    }
  }
})