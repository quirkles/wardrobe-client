<template>
  <div class="columns is-centered">
    <div class="column is-full">
      <h1>Home</h1>
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
        const { sub: userId } = decode(token) as DecodedJwtToken
        const response = await ctx?.app?.apolloProvider?.defaultClient?.query({
          query: GET_GARMENTS_FOR_USER,
          variables: {
            userId: String(userId),
          },
        })
        const { data, errors } = response || {}
        if (errors && errors.length) {
        }
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
})
</script>

<style></style>
