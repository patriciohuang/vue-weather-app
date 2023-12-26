import { defineStore } from 'pinia'

export const useDeleteModalStore = defineStore('deleteModal', {
  state: () => ({
    city: undefined,
  }),
  actions: {
    close () {
      this.city = undefined;
    },
    open (city) {
      this.city = city;
    }
  }
});