<template>
  <div id="homepage" class="container pt-4">
    <h1 class="is-size-1">My Wardrobe</h1>
    <h1 class="is-size-1">User id: {{ userId }}</h1>
    <div class="columns mt-4">
      <div
        id="add-garment-button"
        class="column is-one-quarter-desktop is-full-mobile"
      >
        <nuxt-link to="/garment/new">
          <div class="is-size-2 is-bold">
            +
          </div>
          <div>
            Add Garment
          </div>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { decode } from 'jsonwebtoken'

import { clientGetCookie, serverGetCookie } from '~/utils/cookie'
import { GET_GARMENTS_FOR_USER } from '~/queries/getGarmentsForUser'
import { DecodedJwtToken } from '~/types/DecodedJwtToken'
import { GetGarmentsForUser } from '~/queries/__generated__/GetGarmentsForUser'

export default Vue.extend({
  async asyncData(ctx): Promise<object | void> {
    const token = process.server ? serverGetCookie(ctx) : clientGetCookie()
    if (!token) {
      ctx.redirect(`/login`)
    } else {
      try {
        const { sub: userId, email } = decode(token) as DecodedJwtToken
        ctx.app.$accessor.sessionUser.setSessionUserData({
          id: String(userId),
          email,
        })
        const response = await ctx?.app?.apolloProvider?.defaultClient?.query({
          query: GET_GARMENTS_FOR_USER,
          variables: {
            userId: String(userId),
          },
        })
        const { data } = response || {}
        return { getUserByIdResponse: data || {} }
      } catch (e) {
        return {}
      }
    }
  },
  data() {
    return {
      getUserByIdResponse: {} as GetGarmentsForUser,
    }
  },
  computed: {
    userId() {
      return this.$accessor.sessionUser.id
    },
  },
})
</script>

<style lang="scss">
#homepage {
  #add-garment-button {
    cursor: pointer;
    border: 2px dashed $black;
    text-align: center;
  }
}
</style>
