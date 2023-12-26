<template>
  <div class="card text-center">
    <div class="card-header bg-dark text-white">
      <div class="d-flex justify-content-between align-items-center">
        <div class="flex-grow-1 text-center">
          <h4 class="m-0">{{ city.name }}, {{ city.country }}</h4>
        </div>
        <div>
          <button class="btn btn-danger" @click="event => modalStore.open(city)" data-bs-toggle="modal" data-bs-target="#deleteModal">
            Remove
          </button>
        </div>
      </div>
    </div>
    <div class="card-body d-flex flex-wrap justify-content-center align-items-center" v-if="loading && cities[0]?.conditions.length === 0">
      <WeatherComponent />
    </div>
    <div class="card-body d-flex flex-wrap justify-content-center align-items-center" v-else>
      <div v-for="weather in city.conditions" :key="weather.dateTime" class="m-2">
        <WeatherComponent
          :dateTime="weather.dateTime"
          :icon="weather.icon"
          :label="weather.label"
          :temperature="weather.temperature"
          :rainProb="weather.rainProb"
        />
      </div>
    </div>
    <div class="card-footer bg-light text-muted">
      2 days weather
    </div>
  </div>
</template>

<script setup>
import City from '@/classes/city';
import WeatherComponent from './WeatherComponent.vue';
import { useWeatherStore } from '../stores/weather';
import { storeToRefs } from 'pinia';
import { useDeleteModalStore } from '@/stores/deleteModal';

const store = useWeatherStore();
const modalStore = useDeleteModalStore();
const { cities, loading } = storeToRefs(store)

defineProps({
  city: City
})
</script>

<style scoped>
.card {
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease-in-out;
}

.card:hover {
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
}

.card-header {
  border-bottom: 1px solid rgba(0, 0, 0, 0.125);
}

.card-footer {
  border-top: 1px solid rgba(0, 0, 0, 0.125);
}

.btn-danger {
  background-color: #dc3545;
  border-color: #dc3545;
}

.btn-danger:hover {
  background-color: #c82333;
  border-color: #bd2130;
}
</style>
