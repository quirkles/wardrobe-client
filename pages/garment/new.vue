<template>
  <div id="create-garment-page" class="container pt-4">
    <h1 class="is-size-1">Add Garment</h1>
    <div class="content"></div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { decode } from 'jsonwebtoken'
import { clientGetCookie, serverGetCookie } from '~/utils/cookie'
import { DecodedJwtToken } from '~/types/DecodedJwtToken'
import { GET_GARMENT_METADATA } from '~/queries/getGarmentMetaData'
import { Brand, GarmentCategory } from '~/fragmentTypes'

export default Vue.extend({
  async asyncData(
    ctx
  ): Promise<void | { brands: Brand[]; categories: GarmentCategory[] }> {
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
          query: GET_GARMENT_METADATA,
          variables: {
            userId: String(userId),
          },
        })
        const { brands, categories } = response?.data || {}
        return { brands, categories }
      } catch (e) {
        return {
          brands: [],
          categories: [],
        }
      }
    }
  },
  data() {
    return {
      brands: [] as Brand[],
      categories: [] as GarmentCategory[],
    }
  },
})
</script>

<style lang="scss"></style>
