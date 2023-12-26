import { defineStore } from 'pinia'
import City from '@/classes/city'
import axios from 'axios'

export const useSearchStore = defineStore('search', {
  state: () => ({
    searchText: '',
    searchResults: [],
    searching: false,
    searchError: false
  }),
  actions: {
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
        } finally {
          this.searching = false;
        }
      }
    }
  }
});
