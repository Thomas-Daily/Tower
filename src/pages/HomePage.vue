<template>
  <div class="container">
    <div class="row">
      <div class="col-8 my-3 m-auto">

        <div class="d-flex justify-content-around my-3">
          <button @click="getEventsByType('')" class="btn btn-danger">All</button>
          <button @click="getEventsByType('concert')" class="btn btn-danger">Concerts</button>
          <button @click="getEventsByType('convention')" class="btn btn-danger">Conventions</button>
          <button @click="getEventsByType('sport')" class="btn btn-danger">Sports</button>
          <button @click="getEventsByType('digital')" class="btn btn-danger">Digital</button>
        </div>
        <div>
          <button class="btn" data-bs-target="#eventsCanvas" data-bs-toggle="offcanvas" v-if="account.id">
            <span class="text-danger selectable text-uppercase">
              Add an Event
            </span>
          </button>
        </div>
      </div>
    </div>
    <div class="row justify-content-center gap-4">
      <Events v-for="e in events" :key="e.id" :event="e" />
    </div>
  </div>

  <div class="offcanvas offcanvas-end" data-bs-scroll="true" data-bs-backdrop="false" tabindex="-1" id="eventsCanvas"
    aria-labelledby="eventsCanvasLabel">
    <div class="offcanvas-header">
      <h5 class="offcanvas-title" id="eventsCanvasLabel">Add your Event</h5>
      <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div class="offcanvas-body">
      <EventForm />
    </div>
  </div>
</template>

<script>
import { computed, ref } from '@vue/reactivity';
import { AppState } from '../AppState';
import Events from '../components/Events.vue';
import Pop from '../utils/Pop';
import { eventsService } from '../services/EventsService.js';
import { onMounted, watchEffect } from 'vue';
import EventForm from '../components/EventForm.vue';


export default {
  setup() {

    const editable = ref('')

    async function getEvents() {
      try {
        await eventsService.getEvents()
      } catch (error) {
        Pop.error(error, "[GET EVENTS]")
      }
    }

    onMounted(() => {
      getEvents();
    })

    watchEffect(() => {
      getEvents()
    })

    return {
      account: computed(() => AppState.account),
      editable,
      events: computed(() => AppState.events),

      async getEventsByType(type) {
        try {
          await eventsService.getEvents(type)
        } catch (error) {
          Pop.error(error, '[GetEventsByType]')
        }
      }

    };
  },
  components: { Events, EventForm }
}
</script>

<style scoped lang="scss">
.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;

  .home-card {
    width: 50vw;

    >img {
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }

  .event {
    height: 2vh;
    width: 2vw
  }
}
</style>
