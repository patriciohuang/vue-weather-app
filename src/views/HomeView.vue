<template>
  <section v-for="city in store.cities" :key="city.lat + city.lon">
    <CityComponent :name="city.name" :country="city.country" :conditions="city.conditions"/>
  </section>

</template>

<script setup>
import CityComponent from '@/components/CityComponent.vue';
import { useWeatherStore } from '../stores/weather';
const store = useWeatherStore();
</script>
