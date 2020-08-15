<template>
  <div id="garment-list-page" class="container pt-4">
    <div class="columns is-multiline is-mobile">
      <garment-list-item
        v-for="garment in garments"
        :key="garment.id"
        :garment-data="garment"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Garment } from '~/fragmentTypes'
import { GET_GARMENTS_FOR_USER } from '~/queries/getGarmentsForUser'

export default Vue.extend({
  middleware: 'loggedIn',
  async asyncData(ctx): Promise<void | { garments: Garment[] }> {
    try {
      const userId = ctx.app.$accessor.sessionUser.id
      const response = await ctx?.app?.apolloProvider?.defaultClient?.query({
        query: GET_GARMENTS_FOR_USER,
        variables: {
          userId: String(userId),
        },
      })
      const { garments = [] } = response?.data?.getUserById || {}
      return { garments }
    } catch (e) {
      console.error(e)
      return {
        garments: [],
      }
    }
  },
  data() {
    return {
      garments: [] as Garment[],
    }
  },
  computed: {},
  methods: {},
})
</script>

<style lang="scss">
#garment-list-page {
  margin: 0 1rem;
}
</style>
