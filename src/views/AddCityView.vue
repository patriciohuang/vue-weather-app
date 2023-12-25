<template>
  <h1>Add city</h1>
  <div class="row g-2">
    <div class="col">
      <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Search city" aria-label="Search city" aria-describedby="cancel" v-model.trim.lazy="store.searchText" @input="event => store.updateSearch(event.target.value)">
        <button type="button" class="btn btn-outline-secondary" id="clear" v-if="store.searchText" @click="event => store.updateSearch('')">X</button>
      </div>
    </div>
    <div class="col-auto">
      <RouterLink to="/">
        <button class="btn btn-secondary" type="button" id="cancel" @click="event => store.updateSearch('')">Cancel</button>
      </RouterLink>
    </div>
  </div>
  <div>
    <ul class="list-group">
      <li class="list-group-item" @click="event => {store.addCity(city); $router.push({ path: '/'})}" v-for="city in store.searchResults" :key="city.lat + city.lon">{{ city.name }}, {{ city.country }}</li>
    </ul>
  </div>
</template>

<script setup>
import { useWeatherStore } from '../stores/weather';
const store = useWeatherStore();
</script>