<template>
  <div class="col-12 bg-light">
    <button class="btn btn-danger mdi mdi-close" @click="deleteComment(comment.id)"></button>
    <img :src="comment.creator.picture" alt="Commenter Picture">
    <h3>{{comment.creator.name}}</h3>
    <h5>{{comment.body}}</h5>
  </div>

</template>
<!--
  Should go on the delete button, ask about later
  v-if="account.id == comment.creator.id"
-->
<script>
import { computed } from '@vue/reactivity';
import { AppState } from '../AppState';
import { commentsService } from '../services/CommentsService';
import Pop from '../utils/Pop';

export default {
  props: {
    account: { type: Object, required: true },
    comment: { type: Object, required: true }
  },

  setup() {
    return {
      async deleteComment(id) {
        try {
          await commentsService.deleteComment(id)
        } catch (error) {
          Pop.error('error', error)
        }
      },

      activeComments: computed(() => AppState.activeComments),
      account: computed(() => AppState.account)
    }
  }
}

</script>