<template>
  <section v-for="city in store.cities" :key="city.lat + city.lon">
    <CityComponent :city="city"/>
  </section>

</template>

<script setup>
import CityComponent from '@/components/CityComponent.vue';
import { useWeatherStore } from '../stores/weather';
const store = useWeatherStore();
</script>
