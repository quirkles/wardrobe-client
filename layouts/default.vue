<template>
  <div>
    <nuxt />
    <notifications />
  </div>
</template>

<script>
import Notifications from '~/components/notifications/Notifications.vue'

export default {
  components: {
    notifications: Notifications,
  },
}
</script>

<style lang="scss">
@import 'assets/styles/main.scss';
</style>
