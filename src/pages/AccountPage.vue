<template>
  <div class="about text-center">
    <h1>Welcome {{ account.name }}</h1>
    <img class="rounded" :src="account.picture" alt="" />
    <p>{{ account.email }}</p>
    <div>
      <div class="d-flex flex-wrap gap-5 p-5 align-items-center justify-content-center">
        <Events v-for="t in myTickets" :key="t.id" :event="t.event" />
      </div>
    </div>
  </div>
</template>

<script>
import { Popover } from 'bootstrap';
import { computed, onMounted, ref } from 'vue'
import { AppState } from '../AppState'
import Events from '../components/Events.vue';
import { ticketsService } from '../services/TicketsService';
import Pop from '../utils/Pop';
export default {
  setup() {

    async function getMyTickets() {
      try {
        await ticketsService.getMyTickets()
      } catch (error) {
        Pop.error(error, '[GETTING MY TICKETS]')
      }
    }
    onMounted(() => {
      getMyTickets();
    });
    return {
      account: computed(() => AppState.account),
      myTickets: computed(() => AppState.myTickets)
    };
  },
  components: { Events }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
