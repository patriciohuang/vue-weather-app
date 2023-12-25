<script setup>
import { onMounted } from 'vue';
import { RouterLink, RouterView } from 'vue-router'
import { useWeatherStore } from './stores/weather';

const store = useWeatherStore();

onMounted(() => {
  store.fetchWeather();
})
</script>
<template>
  <header>
    <nav class="navbar bg-body-tertiary">
      <div class="container">
        <button class="btn btn-outline-secondary" :class="{ invisible: $route.path === '/add-city' }" @click="event => store.toggleUnitSystem()">
          System:
          <span class="text-capitalize">{{ store.unitSystem }}</span>
        </button>
        <RouterLink to="/">
          <img src="./assets/logo.png" alt="Logo weather" width="50" height="50">
        </RouterLink>
        <RouterLink to="/add-city" class="btn btn-dark" :class="{ invisible: $route.path === '/add-city' }">
          <span class="text">Add city</span>
        </RouterLink>
      </div>
    </nav>
  </header>
  <main>
    <RouterView />
  </main>
</template>