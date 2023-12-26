<template>
  <div class="city-list">
    <div v-if="store.weatherError" class="alert alert-danger" role="alert">
      Error loading weather data. Please try again later.
    </div>
    <div v-else-if="store.cities.length === 0" class="empty-message">
      <i class="fa-solid fa-smog fa-10x"></i>
      <p>It seems like you haven't added any cities yet. Discover and add your favorite cities to see their weather updates!</p>
    </div>
    <div v-else>
      <section v-for="city in store.cities" :key="city.lat + city.lon" class="city-section">
        <CityComponent :city="city" />
      </section>
    </div>
  </div>
  <DeleteModalComponent />
</template>

<script setup>
import CityComponent from '@/components/CityComponent.vue';
import { useWeatherStore } from '../stores/weather';
import DeleteModalComponent from '@/components/DeleteModalComponent.vue';
const store = useWeatherStore();
</script>

<style scoped>
.city-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 20px;
}

.empty-message {
  text-align: center;
  color: #6c757d;
}

.empty-message i {
  margin: 100px 0;
}

.city-section {
  width: 50vw;
  margin: 10px;
  border: 1px solid #ddd;
  border-radius: 10px;
  overflow: hidden;
  transition: transform 0.3s ease-in-out;
}
</style>
