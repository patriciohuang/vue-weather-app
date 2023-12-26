<template>
  <div class="weather-card" v-if="loading">
    <p class="date placeholder-glow">
      <span class="placeholder col-6"></span>
    </p>
    <p class="time placeholder-glow">
      <span class="placeholder col-4"></span>
    </p>
    <div class="mt-4">
      <i class="fa-solid fa-cloud-sun-rain fa-fade fa-2xl" style="color: #969696;"></i>
    </div>
    <div class="card-body">
      <p class="rain-prob placeholder-glow">
        <span class="placeholder col-7"></span>
      </p>
      <p class="temperature placeholder-glow">
        <span class="placeholder col-6"></span>
      </p>
      <p class="condition placeholder-glow">
        <span class="placeholder col-8"></span>
      </p>
    </div>
  </div>
  <div class="weather-card" v-else>
    <p class="date">{{ formattedDateTime }}</p>
    <p class="time">{{ formattedTime }}</p>
    <img :src="`https://openweathermap.org/img/wn/${icon}@2x.png`" class="weather-icon" :alt="`${label}`">
    <div class="card-body">
      <p v-if="rainProb > 0" class="rain-prob">{{ rainProb }}%</p>
      <p v-else class="rain-prob">No Rain</p>
      <p class="temperature">
        {{ temperature }}
        <span v-if="unitSystem === 'metric'">°C</span>
        <span v-else>°F</span>
      </p>
      <p class="condition text-capitalize">{{ label }}</p>
    </div>
  </div>

</template>

<script setup>
import { computed } from 'vue';
import { useWeatherStore } from '../stores/weather';
import { storeToRefs } from 'pinia';
const store = useWeatherStore();
const { loading, unitSystem } = storeToRefs(store)
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

<style scoped>
.weather-card {
  width: 10rem;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease-in-out;
  background-color: #fff;
  text-align: center;
}

.weather-card:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.date {
  font-size: 1.2em;
  font-weight: bold;
  margin-bottom: 5px;
}

.time {
  font-size: 1.2em;
  color: #666;
  margin-bottom: 5px;
}

.weather-icon {
  width: 60px;
  height: 60px;
}

.card-body {
  margin-top: 10px;
}

.rain-prob {
  font-size: 1em;
  color: #007bff;
  margin-bottom: 5px;
}

.temperature {
  font-size: 1.5em;
  font-weight: bold;
  margin-bottom: 5px;
}

.condition {
  text-transform: capitalize;
}
</style>
