<template>
  <div>
    <div class="p-5">
      <img :src="activeEvent.coverImg" :alt="activeEvent.name">
      <h1>{{activeEvent.name}}</h1>
      <h5>{{activeEvent.description}}</h5>
      <h5>Seats left: {{activeEvent.capacity}}</h5>
      <h5>Location: {{activeEvent.location}}</h5>
    </div>
    <div v-if="activeEvent.isCanceled == false">
      <button class="btn btn-danger text-white" @click="removeTicket()" v-if="isAttending">
        <i class="mdi mdi-ticket fs-4"></i>
        <h4>Stop Attending</h4>
      </button>
      <button class="btn btn-success text-white" @click="addTicket()" v-else>
        <i class="mdi mdi-ticket fs-4"></i>
        <h4>Attend</h4>
      </button>
      <div class="mt-3">
        <div class="bricks">
          <TicketHolder v-for="t in ticketHolders" :ticket="t" />
        </div>
      </div>
      <button class="btn btn-danger text-white" @click="cancelEvent()">
        <i class="mdi mdi-cancel fs-4"></i>
        <h4>Cancel Event</h4>
      </button>
    </div>
    <div v-else class="bg-danger">
      <h6 class="f5">THIS EVENT HAS BEEN CANCLED</h6>
    </div>
    <div class="bg-secondary p-2">
      <form @submit.prevent="handleSubmit" class="p-1">
        <div class="form-group">
          <input type="text" class="form-control" id="comments" placeholder="Enter Comment" v-model="editable.body">
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
      <Comments v-if="activeComments" v-for="c in activeComments" :comment="c" />
    </div>
  </div>





</template>

<script>
import { ref, watchEffect } from 'vue';
import { computed } from '@vue/reactivity';
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { AppState } from '../AppState';
import { eventsService } from '../services/EventsService';
import { commentsService } from '../services/CommentsService'
import Pop from '../utils/Pop';
import Comments from '../components/Comments.vue';
import { AuthService } from '../services/AuthService';
import { ticketsService } from '../services/TicketsService';
import TicketHolder from '../components/TicketHolder.vue';

export default {
  setup() {
    const editable = ref({})
    const route = useRoute();
    async function getEventById() {
      try {
        await eventsService.getEventById(route.params.id);
      }
      catch (error) {
        Pop.error(error, "[GET EVENT]");
      }
    }
    async function getCommentsByEventId() {
      try {
        await commentsService.getCommentsByEventId(route.params.id)
      } catch (error) {
        Pop.error(error, "[GET EVENT BY ID]")
      }
    }
    async function getTicketsByEventId() {
      try {
        await ticketsService.getTicketsByEventId(route.params.id)
      } catch (error) {
        Pop.error(error, '[GETTING TICKETS BY EVENT ID]')
      }
    }


    onMounted(() => {
      getEventById();
      getCommentsByEventId();
      getTicketsByEventId();
    });

    watchEffect(() => {
      getCommentsByEventId()
      getTicketsByEventId()
    });

    return {
      async handleSubmit() {
        try {
          const formData = editable.value
          formData.eventId = route.params.id
          await commentsService.createComment(formData)
          editable.value = {}
        } catch (error) {
          Pop.error(error, '[Submitting Form]')
        }
      },

      async addTicket() {
        try {
          if (!AppState.account.id) {
            return AuthService.loginWithRedirect()
          }
          await ticketsService.addTicket({
            eventId: AppState.activeEvent.id || route.params.id
          })
          Pop.success("Can't wait to see you there!")
        } catch (error) {
          Pop.error(error, '[Adding Ticket]')
        }
      },

      async removeTicket() {
        try {
          const yes = await Pop.confirm('Are you sure you would no longer like to attend this event?')
          if (!yes) { return }
          const ticket = AppState.ticketHolders.find(t => t.accountId == AppState.account.id && t.eventId == AppState.activeEvent.id)
          await ticketsService.removeTicket(ticket.id)
          Pop.success('Sad to see you go')
        } catch (error) {
          Pop.error(error, '[Removing Ticket]')
        }
      },

      async cancelEvent() {
        try {
          const yes = await Pop.confirm("Are you sure you would like to cancel the event?")
          if (!yes) { return }
          await eventsService.cancelEvent(route.params.id)
        } catch (error) {
          Pop.error(error, "[Canceling Event]")
        }

      },

      editable,
      activeEvent: computed(() => AppState.activeEvent),
      activeComments: computed(() => AppState.activeComments),
      isAttending: computed(() => AppState.ticketHolders.find(t => t.accountId == AppState.account.id)),
      ticketHolders: computed(() => AppState.ticketHolders)

    };
  },
  components: { Comments, TicketHolder }
}
</script>
