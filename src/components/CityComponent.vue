<template>
  <div class="card text-center">
    <div class="card-header">
      {{name}}
    </div>
    <div class="card-body d-flex flex-row">
      <div v-for="weather in conditions" :key="weather.dateTime">
        <WeatherComponent :dateTime="weather.dateTime" :icon="weather.icon" :label="weather.label" :temperature="weather.temperature" :rainProb="weather.rainProb"/>
      </div>
    </div>
    <div class="card-footer text-body-secondary">
      2 days ago
    </div>
  </div>
</template>

<script setup>
import WeatherComponent from './WeatherComponent.vue';

defineProps({
  name: String,
  country: String,
  conditions: Array
})
</script>