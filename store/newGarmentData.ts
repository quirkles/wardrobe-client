import { actionTree, getterTree, mutationTree } from 'nuxt-typed-vuex'
import Vue from 'vue'
import { CreateGarmentInput } from '~/fragmentTypes'

export interface NewGarmentDataState {
  title: string | null
  description: string | null
  ownerId: string | null
  brandId: string | null
  colorId: string | null
  categoryId: string | null
  subCategoryId: string | null
  imageUrls: string[]
}
export const state = (): NewGarmentDataState => ({
  title: null,
  description: null,
  ownerId: null,
  brandId: null,
  colorId: null,
  categoryId: null,
  subCategoryId: null,
  imageUrls: [],
})

const propIsValidKey = (
  prop: string
): prop is keyof Omit<NewGarmentDataState, 'imageUrls'> => {
  return prop in state()
}

export const getters = getterTree(state, {
  createGarmentPayload(state: NewGarmentDataState): CreateGarmentInput {
    return {
      title: state.title || '',
      description: state.description || '',
      brandId: state.brandId || '',
      colorId: state.colorId || '',
      subCategoryId: state.subCategoryId || '',
      ownerId: state.ownerId || '',
    }
  },
  settableStringFields(
    state: NewGarmentDataState
  ): Omit<NewGarmentDataState, 'imageUrls' | 'ownerId'> {
    return {
      title: state.title,
      description: state.description,
      brandId: state.brandId,
      colorId: state.colorId,
      categoryId: state.categoryId,
      subCategoryId: state.subCategoryId,
    }
  },
  isGarmentDataValid(state): boolean {
    return Boolean(
      state.title &&
        state.description &&
        state.brandId &&
        state.categoryId &&
        state.subCategoryId &&
        state.brandId
    )
  },
})

export const mutations = mutationTree(state, {
  updateStringField(
    state: NewGarmentDataState,
    newData: Partial<Omit<NewGarmentDataState, 'imageUrls'>>
  ) {
    for (const prop in newData) {
      if (propIsValidKey(prop) && newData[prop]) {
        Vue.set(state, prop, newData[prop])
      }
    }
  },
  setBrandId(state: NewGarmentDataState, brandId: string) {
    Vue.set(state, 'brandId', brandId)
  },
  setColorId(state: NewGarmentDataState, colorId: string) {
    Vue.set(state, 'colorId', colorId)
  },
  addImageUrl(state: NewGarmentDataState, urlToAdd: string) {
    Vue.set(state.imageUrls, state.imageUrls.length, urlToAdd)
  },
})

export const actions = actionTree({ state, getters, mutations }, {})
