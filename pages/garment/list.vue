<template>
  <div id="garment-list-page" class="container pt-4">
    <h1>Garment list</h1>
    <ul id="example-1">
      <li v-for="garment in garments" :key="garment.id">
        {{ garment.title }}: {{ garment.brand.name }} -
        {{ garment.description }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { decode } from 'jsonwebtoken'
import { clientGetCookie, serverGetCookie } from '~/utils/cookie'
import { DecodedJwtToken } from '~/types/DecodedJwtToken'
import { Garment } from '~/fragmentTypes'
import { GET_GARMENTS_FOR_USER } from '~/queries/getGarmentsForUser'

export default Vue.extend({
  async asyncData(ctx): Promise<void | { garments: Garment[] }> {
    const token = process.server ? serverGetCookie(ctx) : clientGetCookie()
    if (!token) {
      return ctx.redirect(`/login`)
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
        const { garments = [] } = response?.data?.getUserById || {}
        console.log(response) //eslint-disable-line
        return { garments }
      } catch (e) {
        return {
          garments: [],
        }
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

<style lang="scss"></style>
