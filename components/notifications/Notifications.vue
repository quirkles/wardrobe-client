<template><div /></template>

<script lang="ts">
import Vue from 'vue'
import { Unsubscribable } from 'rxjs'
import { AppNotification, Payload } from '~/plugins/eventBus'
export default Vue.extend({
  data() {
    return {
      notifications: [
        { type: 'warning', content: 'Something happened!' },
      ] as AppNotification[],
      subscription: {} as Unsubscribable,
    }
  },
  mounted() {
    this.subscription = this.$eventBus.subscribe(
      'notification',
      this.handleNewNotification
    )
  },
  destroyed() {
    this.subscription && this.subscription.unsubscribe()
  },
  methods: {
    handleNewNotification(notification: Payload): void {
      this.$buefy.notification.open({
        queue: false,
        duration: 100000,
        message: notification.content,
        position: 'is-top-right',
        type: this.getNotificationType(notification.type),
      })
    },
    getNotificationType(type: AppNotification['type']) {
      switch (type) {
        case 'warning':
          return 'is-warning'
        case 'info':
          return 'is-info'
        case 'danger':
          return 'is-danger'
        case 'success':
          return 'is-success'
        default:
          return 'is-info'
      }
    },
  },
})
</script>

<style lang="scss">
@import '~assets/styles/main.scss';
.notices {
  article {
    &.notification {
      border-radius: $radius-small;
    }
  }
}
</style>
