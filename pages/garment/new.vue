<template>
  <div id="create-garment-page" class="container pt-4">
    <h1 class="is-size-1">Add Garment</h1>
    <div class="content">
      <b-field label="Title">
        <b-input
          v-model="newGarmentDataSettableStringFields.title"
          placeholder="Soloist Mickey Mouise Hoodie"
          type="text"
          @input="handleFieldChange('title', $event)"
        ></b-input>
      </b-field>
      <b-field label="Description">
        <b-input
          v-model="newGarmentDataSettableStringFields.description"
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
      <b-field label="Category">
        <b-select
          v-model="newGarmentDataSettableStringFields.categoryId"
          placeholder="Select a category"
          @input="handleFieldChange('categoryId', $event)"
        >
          <option
            v-for="category in categories"
            :key="category.id"
            :value="category.id"
          >
            {{ category.name }}
          </option>
        </b-select>
      </b-field>
      <b-field label="Sub-Category">
        <b-select
          v-model="newGarmentDataSettableStringFields.subCategoryId"
          :disabled="isSubcategoryDropdownDisabled"
          placeholder="Select a sub-category"
          @input="handleFieldChange('subCategoryId', $event)"
        >
          <option
            v-for="subcategory of subcategories"
            :key="subcategory.id"
            :value="subcategory.id"
          >
            {{ subcategory.name }}
          </option>
        </b-select>
      </b-field>
      <button class="button is-primary" @click="doSaveGarment">
        Save Garment
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { GET_GARMENT_METADATA } from '~/queries/getGarmentMetaData'
import { GarmentCategory, GarmentSubCategory } from '~/fragmentTypes'
import { NewGarmentDataState } from '~/store/newGarmentData'
import { SearchResult } from '~/components/searchSelect/searchSelectTypes'
import { SEARCH_BRANDS } from '~/queries/findBrands'
import { GetGarmentMetaData_brands as GetGarmentMetaDataBrand } from '~/queries/__generated__/GetGarmentMetaData'
import { CREATE_GARMENT } from '~/queries/createGarment'

export default Vue.extend({
  middleware: 'loggedIn',
  async asyncData(ctx): Promise<void | { categories: GarmentCategory[] }> {
    try {
      const userId = ctx.app.$accessor.sessionUser.id
      ctx.app.$accessor.newGarmentData.updateStringField({
        ownerId: String(userId),
      })
      const response = await ctx?.app?.apolloProvider?.defaultClient?.query({
        query: GET_GARMENT_METADATA,
        variables: {
          userId: String(userId),
        },
      })
      const { categories } = response?.data || {}
      return { categories }
    } catch (e) {
      return {
        categories: [],
      }
    }
  },
  data() {
    return {
      categories: [] as GarmentCategory[],
    }
  },
  computed: {
    isSubcategoryDropdownDisabled(): boolean {
      return !this.newGarmentDataSettableStringFields.categoryId
    },
    canSubmit(): boolean {
      return this.$accessor.newGarmentData.isGarmentDataValid
    },
    newGarmentDataSettableStringFields(): Omit<
      NewGarmentDataState,
      'imageUrls' | 'ownerId'
    > {
      return this.$accessor.newGarmentData.settableStringFields
    },
    subcategories(): GarmentSubCategory[] {
      const { categoryId } = this.newGarmentDataSettableStringFields
      const categories: GarmentCategory[] = this.categories
      if (!categoryId) {
        return []
      } else {
        return (
          (categories.find((category) => category.id === categoryId) || {})
            .subCategories || []
        )
      }
    },
  },
  methods: {
    async doSaveGarment() {
      if (this.canSubmit) {
        await this.$apollo.mutate({
          mutation: CREATE_GARMENT,
          variables: {
            input: this.$accessor.newGarmentData.createGarmentPayload,
          },
        })
      }
    },
    onBrandSelect(selectedBrand: SearchResult): void {
      this.$accessor.newGarmentData.setBrandId(selectedBrand.value)
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
          (brand: GetGarmentMetaDataBrand): SearchResult => ({
            text: brand.name,
            value: brand.id,
          })
        )
        .slice(0, 12)
    },
    handleFieldChange(
      field: keyof Omit<NewGarmentDataState, 'imageUrls'>,
      value: string
    ) {
      this.$accessor.newGarmentData.updateStringField({ [field]: value })
    },
  },
})
</script>

<style lang="scss"></style>
