<template>
  <div class="card" style="width: 10rem;">
    <p>{{ formattedDateTime }}</p>
    <p>{{ formattedTime }}</p>
    <img :src="`https://openweathermap.org/img/wn/${icon}@2x.png`" class="img-fluid rounded-start" :alt="`${label}`">
    <div class="card-body">
      <p v-if="rainProb > 0">{{ rainProb }}%</p>
      <p v-else>-</p>
      <p>
        {{ temperature }}
        <span v-if="store.unitSystem === 'metric'">°C</span>
        <span v-else>°F</span>
      </p>
      <p class="text-capitalize">{{ label }}</p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useWeatherStore } from '../stores/weather';
const store = useWeatherStore();
const props = defineProps({
  dateTime: String,
  icon: String,
  label: String,
  temperature: Number,
  rainProb: Number
})

const formattedDateTime = computed(() => {
  const currentDate = new Date();
  const cardDate = new Date(props.dateTime);

  if (isSameDay(currentDate, cardDate)) {
    return "Today";
  } else {
    return "Tomorrow";
  }
});

const formattedTime = computed(() => {
  const cardDate = new Date(props.dateTime);
  const hours = cardDate.getHours().toString().padStart(2, '0');
  const minutes = cardDate.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
});

function isSameDay(date1, date2) {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}
</script>
