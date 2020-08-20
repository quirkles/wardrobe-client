<template>
  <div id="garment-list-page" class="container pt-4">
    <div class="content">
      <b-field label="Title">
        <b-input
          v-model="garmentData.title"
          placeholder="Soloist Mickey Mouise Hoodie"
          type="text"
          @input="handleFieldChange('title', $event)"
        ></b-input>
      </b-field>
      <b-field label="Description">
        <b-input
          v-model="garmentData.description"
          placeholder="Oversized lightweight hoodie in black"
          type="textarea"
          @input="handleFieldChange('description', $event)"
        ></b-input>
      </b-field>
      <button class="button is-primary" @click="doSaveGarment">
        Save Garment
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Garment } from '~/fragmentTypes'
import { GET_GARMENT_DATA } from '~/queries/getGarmentData'
import { UPDATE_GARMENT } from '~/queries/updateGarment'

export default Vue.extend({
  async asyncData(
    ctx
  ): Promise<void | {
    garmentId: string | null
    garmentData: Garment
  }> {
    let garmentId = null
    try {
      garmentId = ctx.params.id
      const response = await ctx?.app?.apolloProvider?.defaultClient?.query({
        query: GET_GARMENT_DATA,
        variables: {
          garmentId: String(garmentId),
        },
      })
      const { garmentData } = response?.data || {}
      return { garmentId, garmentData }
    } catch (e) {
      return {
        garmentId,
        garmentData: {} as Garment,
      }
    }
  },
  data() {
    return {
      garmentId: '',
      garmentData: {} as Garment,
    }
  },
  methods: {
    async doSaveGarment() {
      await this.$apollo.mutate({
        mutation: UPDATE_GARMENT,
        variables: {
          garmentId: this.$data.garmentId,
          garmentData: this.$data.garmentData,
        },
      })
    },
    handleFieldChange(field: string, value: string): void {
      console.log(field, value) //eslint-disable-line
    },
  },
})
</script>

<style lang="scss">
#garment-list-page {
  margin: 0 1rem;
}
</style>
