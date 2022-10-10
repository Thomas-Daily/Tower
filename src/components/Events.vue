<template>
  <div class="card my-4 rounded p-0 col-2">
    <router-link :to="{name: 'Event', params: {id: event.id}}">
      <img class="rounded-top eventImg" :src="event.coverImg" :alt="event.title" :title="event.title">
    </router-link>
    <div class="rounded-bottom card-body text-center">
      <h3><b>{{event.name}}</b></h3>
      <h5>{{event.location}}</h5>
      <h5>{{new Date(event.startDate).toLocaleDateString()}}</h5>
      <h5>There are {{event.capacity}} seats left</h5>
    </div>
  </div>
</template>


<script>

import { Event } from '../models/Event';

export default {
  props: {
    event: { type: Object, required: true }
  }
}
</script>

<style scoped>
.eventImg {
  height: 100%;
  width: 100%
}
</style>