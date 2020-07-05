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
        <b-select
          v-model="newGarmentDataSettableStringFields.brandId"
          placeholder="Select a brand"
          @input="handleFieldChange('brandId', $event)"
        >
          <option v-for="brand in brands" :key="brand.id" :value="brand.id">
            {{ brand.name }}
          </option>
        </b-select>
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
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { decode } from 'jsonwebtoken'
import { clientGetCookie, serverGetCookie } from '~/utils/cookie'
import { DecodedJwtToken } from '~/types/DecodedJwtToken'
import { GET_GARMENT_METADATA } from '~/queries/getGarmentMetaData'
import { Brand, GarmentCategory, GarmentSubCategory } from '~/fragmentTypes'
import { NewGarmentDataState } from '~/store/newGarmentData'

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
        ctx.app.$accessor.newGarmentData.updateStringField({
          ownerId: String(userId),
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
  computed: {
    isSubcategoryDropdownDisabled(): boolean {
      return !this.newGarmentDataSettableStringFields.categoryId
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
