<template>
  <div class="add-city-container">
    <h1>Add City</h1>
    <div class="search-input">
      <div class="input-group">
        <input
          class="form-control border-end-0"
          placeholder="Search city"
          aria-label="Search city"
          v-model.trim.lazy="store.searchText"
          autofocus
          @input="event => store.updateSearch(event.target.value)"
        />
        <button
          type="button"
          v-if="store.searchText"
          @click="event => store.updateSearch('')"
          class="btn bg-transparent border-0"
          style="margin-left: -40px; z-index: 5;">
          <i class="fa fa-times"></i>
        </button>
        <RouterLink to="/" class="btn btn-secondary" @click="event => store.updateSearch('')">
          Cancel
        </RouterLink>
      </div>
    </div>
    <div>
      <p v-if="store.searchError" class="text-secondary font-weight-bold text-center text-danger">
        Error loading results
      </p>
      <p  v-else-if="store.searching">Searching...</p>
      <p v-else-if="store.searchText?.length > 0 && store.searchResults.length === 0 && !store.searching" class="text-secondary font-weight-bold text-center">
        No results for this search
      </p>
      <ul v-else class="list-group">
        <li
          class="list-group-item list-group-item-action"
          @click="event => {weatherStore.addCity(city); store.updateSearch(''); $router.push({ path: '/'})}"
          v-for="city in store.searchResults"
          :key="city.lat + city.lon"
        >
          {{ city.name }}, {{ city.country }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { useWeatherStore } from '@/stores/weather';
import { useSearchStore } from '../stores/search';
const store = useSearchStore();
const weatherStore = useWeatherStore();
</script>

<style scoped>
.add-city-container {
  max-width: 50vw;
  margin: auto;
  padding: 20px;
}

.search-input {
  margin-bottom: 15px;
}

.input-group {
  display: flex;
  align-items: center;
}

.list-group-item {
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
}

.list-group-item:hover {
  background-color: #f8f9fa;
}
</style>
