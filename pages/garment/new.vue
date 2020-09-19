<template>
  <div id="garment-create-page" class="container pt-4">
    <div class="columns is-multiline">
      <div class="column is-full">
        <h1 class="is-size-1">Create Garment</h1>
      </div>
      <div class="column is-full">
        <nuxt-link to="/garment/list">My garments</nuxt-link>
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
        <image-grid :images="garmentImages" @fileChange="onImageSelect" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { ManagedUpload } from 'aws-sdk/clients/s3'
import { CREATE_GARMENT_DATA } from '~/queries/createGarmentData'
import {
  Brand,
  Color,
  Garment,
  GarmentCategory,
  GarmentImage,
  GarmentSubCategory,
} from '~/types/Garment'
import { SearchSelectItem } from '~/types/SearchSelect'
import { CREATE_GARMENT } from '~/queries/createGarment'
import { SEARCH_BRANDS } from '~/queries/findBrands'
import { SEARCH_COLORS } from '~/queries/findColors'
import { doUpload } from '~/utils/aws'
import { CREATE_GARMENT_IMAGE } from '~/queries/createGarmentImage'
import { UPDATE_GARMENT } from '~/queries/updateGarment'
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
      garmentImages: [],
      categories: [] as GarmentCategory[],
      garmentData: {} as Garment,
      selectedBrandData: {} as SearchSelectItem,
      selectedColorData: {} as SearchSelectItem,
    }
  },
  computed: {
    canSaveGarment(): boolean {
      return false
    },
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
    doSaveGarment() {
      if (this.canSaveGarment) {
        if (this.garmentId) {
          this.editGarment()
        } else {
          this.createGarment()
        }
      } else {
        this.$eventBus.publish('notification', {
          type: 'danger',
          content: `Can't save garment!`,
        })
      }
    },
    async editGarment() {
      const userId = this.$accessor.sessionUser.id
      const { title, description } = this.garmentData as Garment
      const garmentData = {
        garmentId: this.garmentId,
        title,
        description,
        ownerId: userId,
        brandId: this.selectedBrandData?.value,
        colorId: this.selectedColorData?.value,
        subCategoryId: this.selectedSubCategoryId,
        garmentImageIds: this.garmentImages.map(({ id }) => id),
      }
      const createGarmentResponse = await this.$apollo.mutate({
        mutation: UPDATE_GARMENT,
        variables: {
          garmentData,
        },
      })
      this.garmentId = createGarmentResponse.data.createGarment.id
    },
    async createGarment() {
      const userId = this.$accessor.sessionUser.id
      const { title, description } = this.garmentData as Garment
      const garmentData = {
        title,
        description,
        ownerId: userId,
        brandId: this.selectedBrandData?.value,
        colorId: this.selectedColorData?.value,
        subCategoryId: this.selectedSubCategoryId,
        garmentImageIds: this.garmentImages.map(({ id }) => id),
      }
      const createGarmentResponse = await this.$apollo.mutate({
        mutation: CREATE_GARMENT,
        variables: {
          garmentData,
        },
      })
      this.garmentId = createGarmentResponse.data.createGarment.id
      this.$eventBus.publish('notification', {
        type: 'success',
        content: `Garment created!`,
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

<style lang="scss"></style>
