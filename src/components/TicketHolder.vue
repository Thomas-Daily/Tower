<template>
  <div class="collab-card">
    <img :src="ticket.profile?.picture" :alt="ticket.profile.name" :title="ticket.profile?.name" height="65">
  </div>
</template>


<script>
export default {
  props: {
    ticket: {
      type: Object,
      required: true
    }
  },
  setup() {
    return {}
  }
}
</script>


<style lang="scss" scoped>

</style>
