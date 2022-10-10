<template>
  <form @submit.prevent="handleSubmit">

    <div>
      <label for="type">What type of event?</label>
      <select required name="type" v-model="editable.type">
        <option value="concert">Concert</option>
        <option value="convention">Convention</option>
        <option value="sport">Sport</option>
        <option value="digital">Digital</option>
      </select>
    </div>

    <div class="form-group">
      <label for="body">Name:</label>
      <input type="text" v-model="editable.name" placeholder="Name" required class="form-control">
    </div>
    <div class="form-group">
      <label for="model">Cover Image:</label>
      <input type="url" v-model="editable.coverImg" placeholder="https://youknow.com" class="form-control">
    </div>
    <div class="form-group">
      <label for="model">Description:</label>
      <input type="text" v-model="editable.description" placeholder="Description" class="form-control">
    </div>
    <div class="form-group">
      <label for="model">Location:</label>
      <input type="text" v-model="editable.location" placeholder="location" class="form-control">
    </div>
    <div class="form-group">
      <label for="model">Capacity:</label>
      <input type="number" v-model="editable.capacity" placeholder="Capacity" class="form-control">
    </div>
    <div class="form-group">
      <label for="model">Date:</label>
      <input type="date" v-model="editable.startDate" placeholder="Date" class="form-control">
    </div>

    <div class="my-3">
      <button class="btn btn-success" type="submit">SEND IT</button>
    </div>

  </form>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { router } from '../router';
import { eventsService } from '../services/EventsService';
import Pop from '../utils/Pop.js';

export default {
  setup() {
    const editable = ref({})
    const router = useRouter()

    return {
      editable,
      async handleSubmit() {
        try {
          const formData = editable.value
          const towerEvent = await eventsService.createEvent(formData)
          router.push({ name: "Event", params: { id: towerEvent.id } })
        } catch (error) {
          Pop.error(error, '[Submitting Form]')
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>

</style>
