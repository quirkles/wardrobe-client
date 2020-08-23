<template>
  <div id="garment-edit-page" class="container pt-4">
    <h1 class="is-size-1">Edit Garment</h1>
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
      <b-field label="Brand">
        <search-select
          :get-results="findBrands"
          placeholder="Search For Brand"
          @select="onBrandSelect"
        ></search-select>
      </b-field>
      <button class="button is-primary" @click="doSaveGarment">
        Save Garment
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Brand, Garment } from '~/fragmentTypes'
import { GET_GARMENT_DATA } from '~/queries/getGarmentData'
import { UPDATE_GARMENT } from '~/queries/updateGarment'
import { SearchResult } from '~/components/searchSelect/searchSelectTypes'
import { SEARCH_BRANDS } from '~/queries/findBrands'

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
      console.log('garmentData') //eslint-disable-line
      console.log(garmentData) //eslint-disable-line
      return { garmentId, garmentData }
    } catch (e) {
      console.log('err') //eslint-disable-line
      console.log(e.apolloErrors) //eslint-disable-line
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
    async findBrands(searchTerm: string): Promise<SearchResult[]> {
      const resp = await this.$apollo.query({
        query: SEARCH_BRANDS,
        variables: {
          searchTerm,
        },
      })
      return resp.data.brands
        .map(
          (brand: Brand): SearchResult => ({
            text: brand.name,
            value: brand.id,
          })
        )
        .slice(0, 12)
    },
    onBrandSelect(selectedBrand: SearchResult): void {
      this.$accessor.newGarmentData.setBrandId(selectedBrand.value)
    },
  },
})
</script>

<style lang="scss">
#garment-list-page {
  margin: 0 1rem;
}
</style>
