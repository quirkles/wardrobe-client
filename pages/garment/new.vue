<template>
  <div id="garment-create-page" class="container pt-4">
    <div class="columns is-multiline">
      <div class="column is-full">
        <h1 class="is-size-1">Create Garment</h1>
      </div>
      <div class="column is-full-mobile is-half-desktop">
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
              :selected-value="selectedBrandData"
              placeholder="Search For Brand"
              @select="onBrandSelect"
            ></search-select>
          </b-field>
          <b-field label="Color">
            <search-select
              :get-results="findColors"
              :selected-value="selectedColorData"
              placeholder="Search For Color"
              @select="onColorSelect"
            ></search-select>
          </b-field>
          <b-field label="Category">
            <b-select
              v-model="selectedCategoryId"
              placeholder="Select a category"
              expanded
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
              v-model="selectedSubCategoryId"
              placeholder="Select a sub-category"
              expanded
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
      <div class="column is-full-mobile is-half-desktop">
        <image-grid />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { CREATE_GARMENT_DATA } from '~/queries/createGarmentData'
import {
  Brand,
  Color,
  Garment,
  GarmentCategory,
  GarmentImage,
  GarmentSubCategory,
} from '~/fragmentTypes'
import { SearchSelectItem } from '~/components/searchSelect/searchSelectTypes'
import { CREATE_GARMENT } from '~/queries/createGarment'
import { SEARCH_BRANDS } from '~/queries/findBrands'
import { SEARCH_COLORS } from '~/queries/findColors'

interface DataType {
  categories: GarmentCategory[]
  garmentId: string | null
  garmentData: Garment
  selectedBrandData: SearchSelectItem
  selectedColorData: SearchSelectItem
  selectedCategoryId: string | null
  selectedSubCategoryId: string | null
  images: GarmentImage[]
}

export default Vue.extend({
  middleware: 'loggedIn',
  async asyncData(ctx): Promise<void | Partial<DataType>> {
    try {
      const response = await ctx?.app?.apolloProvider?.defaultClient?.query({
        query: CREATE_GARMENT_DATA,
      })
      const { categories } = response?.data || {}
      return {
        categories,
      }
    } catch (e) {
      return {
        categories: [],
      }
    }
  },
  data(): DataType {
    return {
      selectedCategoryId: null,
      selectedSubCategoryId: null,
      garmentId: null,
      images: [],
      categories: [] as GarmentCategory[],
      garmentData: {} as Garment,
      selectedBrandData: {} as SearchSelectItem,
      selectedColorData: {} as SearchSelectItem
    }
  },
  computed: {
    subcategories(): GarmentSubCategory[] {
      return (
        (
          (this.categories || []).find(
            (category) => category.id === this.selectedCategoryId
          ) || {}
        ).subCategories || []
      )
    },
  },
  methods: {
    async doSaveGarment() {
      const userId = this.$accessor.sessionUser.id
      const { title, description } = this.garmentData as Garment
      const garmentData = {
        title,
        description,
        ownerId: userId,
        brandId: this.selectedBrandData?.value,
        colorId: this.selectedColorData?.value,
        subCategoryId: this.selectedSubCategoryId,
      }
      await this.$apollo.mutate({
        mutation: CREATE_GARMENT,
        variables: {
          garmentData,
        },
      })
    },
    handleFieldChange(field: string, value: string): void {
      this.$set(this.garmentData as Garment, field, value)
    },
    async findBrands(searchTerm: string): Promise<SearchSelectItem[]> {
      const resp = await this.$apollo.query({
        query: SEARCH_BRANDS,
        variables: {
          searchTerm,
        },
      })
      return resp.data.brands
        .map(
          (brand: Brand): SearchSelectItem => ({
            text: brand.name,
            value: brand.id,
          })
        )
        .slice(0, 12)
    },
    async findColors(searchTerm: string): Promise<SearchSelectItem[]> {
      const resp = await this.$apollo.query({
        query: SEARCH_COLORS,
        variables: {
          searchTerm,
        },
      })
      return resp.data.colors
        .map(
          (color: Color): SearchSelectItem => ({
            text: color.name,
            value: color.id,
          })
        )
        .slice(0, 12)
    },
    onBrandSelect(selectedBrand: SearchSelectItem): void {
      this.selectedBrandData = selectedBrand
    },
    onColorSelect(selectedColor: SearchSelectItem): void {
      this.selectedColorData = selectedColor
    },
  },
})
</script>

<style lang="scss"></style>
