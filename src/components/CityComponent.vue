<template>
  <div class="card text-center">
    <div class="card-header">
      {{ city.name }}, {{ city.country }}
      <button class="btn btn-outline-danger" @click="event => store.removeCity(city)">Remove</button>
    </div>
    <div class="card-body d-flex flex-row">
      <div v-for="weather in city.conditions" :key="weather.dateTime">
        <WeatherComponent :dateTime="weather.dateTime" :icon="weather.icon" :label="weather.label" :temperature="weather.temperature" :rainProb="weather.rainProb"/>
      </div>
    </div>
    <div class="card-footer text-body-secondary">
      2 days weather
    </div>
  </div>
</template>

<script setup>
import City from '@/classes/city';
import WeatherComponent from './WeatherComponent.vue';
import { useWeatherStore } from '../stores/weather';
const store = useWeatherStore();

defineProps({
  city: City
})
</script>