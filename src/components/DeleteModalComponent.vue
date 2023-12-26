<template>
  <div class="modal fade" id="deleteModal" tabindex="-1" aria-labelledby="deleteModal" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Delete city</h5>
        </div>
        <div class="modal-body">
          <p>Are you sure you want to delete <b>{{city?.name}}, {{city?.country}}</b>?<br>This action cannot be undone.</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
          <button type="button" class="btn btn-danger" data-bs-dismiss="modal" @click="store.removeCity(city)">Yes, delete</button>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
import { storeToRefs } from 'pinia';
import { useDeleteModalStore } from '../stores/deleteModal';
import { useWeatherStore } from '@/stores/weather';

const store = useWeatherStore();
const modalStore = useDeleteModalStore();
const { city } = storeToRefs(modalStore)
</script>
