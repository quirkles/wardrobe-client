<template>
  <div id="garment-edit-page" class="container pt-4">
    <div class="columns is-multiline">
      <div class="column is-full-mobile is-half-desktop">
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
        <image-grid :images="garmentImages" @fileChange="onImageSelect" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { ManagedUpload } from 'aws-sdk/clients/s3'
import {
  Brand,
  Color,
  Garment,
  GarmentCategory,
  GarmentImage,
  GarmentSubCategory,
} from '~/types/Garment'
import { UPDATE_GARMENT } from '~/queries/updateGarment'
import { SearchSelectItem } from '~/types/SearchSelect'
import { SEARCH_BRANDS } from '~/queries/findBrands'
import { SEARCH_COLORS } from '~/queries/findColors'
import { EDIT_GARMENT_DATA } from '~/queries/editGarmentData'
import { doUpload } from '~/utils/aws'
import { CREATE_GARMENT_IMAGE } from '~/queries/createGarmentImage'
import { CreateGarmentImageInput } from '~/gqlSchemaTypes/globalTypes'

interface DataType {
  categories: GarmentCategory[]
  garmentId: string | null
  garmentData: Garment
  selectedBrandData: SearchSelectItem
  selectedColorData: SearchSelectItem
  selectedCategoryId: string | null
  selectedSubCategoryId: string | null
  garmentImages: GarmentImage[]
}

export default Vue.extend({
  async asyncData(ctx): Promise<void | DataType> {
    let garmentId = null
    try {
      garmentId = ctx.params.id
      const response = await ctx?.app?.apolloProvider?.defaultClient?.query({
        query: EDIT_GARMENT_DATA,
        variables: {
          garmentId: String(garmentId),
        },
      })
      const { garmentData, categories } = response?.data || {}
      const {
        brand: selectedBrand,
        color: selectedColor,
        category: selectedCategory,
        subCategory: selectedSubCategory,
        images = [],
      } = garmentData as Garment

      return {
        categories,
        garmentId,
        garmentData,
        garmentImages: images,
        selectedCategoryId: selectedCategory?.id || null,
        selectedSubCategoryId: selectedSubCategory?.id || null,
        selectedBrandData: {
          text: selectedBrand.name,
          value: selectedBrand.id,
        },
        selectedColorData: {
          text: selectedColor.name,
          value: selectedColor.id,
        },
      }
    } catch (e) {
      console.log(e) //eslint-disable-line
      return {
        categories: [] as GarmentCategory[],
        garmentId,
        garmentImages: [] as GarmentImage[],
        garmentData: {} as Garment,
        selectedBrandData: {} as SearchSelectItem,
        selectedColorData: {} as SearchSelectItem,
        selectedCategoryId: null,
        selectedSubCategoryId: null,
      }
    }
  },
  data(): DataType {
    return {
      selectedCategoryId: null,
      selectedSubCategoryId: null,
      garmentId: null,
      garmentImages: [] as GarmentImage[],
      categories: [] as GarmentCategory[],
      garmentData: {} as Garment,
      selectedBrandData: {} as SearchSelectItem,
      selectedColorData: {} as SearchSelectItem,
    }
  },
  computed: {
    subcategories(): GarmentSubCategory[] {
      return (
        (
          this.categories.find(
            (category) => category.id === this.selectedCategoryId
          ) || {}
        ).subCategories || []
      )
    },
  },
  methods: {
    async doSaveGarment() {
      const { title, description, brand, color, subCategory } = this.garmentData
      const garmentData = {
        title,
        description,
        garmentId: this.garmentId,
        brandId: this.selectedBrandData?.value || brand.id,
        colorId: this.selectedColorData?.value || color.id,
        subCategoryId: this.selectedSubCategoryId || subCategory?.id || null,
      }
      await this.$apollo.mutate({
        mutation: UPDATE_GARMENT,
        variables: {
          garmentData,
        },
      })
    },
    handleFieldChange(field: string, value: string): void {
      this.$set(this.garmentData, field, value)
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
    async onImageSelect(imageFiles: File[]): Promise<void> {
      const awsResponses = await Promise.all(
        imageFiles.map(async (file) => await doUpload(file))
      )
      const gqlResults = await Promise.all(
        await awsResponses.map((awsResult: ManagedUpload.SendData) =>
          this.$apollo.mutate({
            mutation: CREATE_GARMENT_IMAGE,
            variables: {
              garmentImageData: {
                garmentId: this.garmentId,
                imageName: awsResult.Key,
                imageUrl: awsResult.Location,
              } as CreateGarmentImageInput,
            },
          })
        )
      )
      gqlResults.forEach((gqlResult) => {
        const imageData = gqlResult.data.createGarmentImage
        this.garmentImages.push({
          id: imageData.id,
          url: imageData.url,
          name: imageData.name,
        })
      })
    },
  },
})
</script>

<style lang="scss">
#garment-list-page {
  margin: 0 1rem;
}
</style>
