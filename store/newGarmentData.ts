import { actionTree, getterTree, mutationTree } from 'nuxt-typed-vuex'
import Vue from 'vue'

export interface NewGarmentDataState {
  title: string | null
  description: string | null
  ownerId: string | null
  brandId: string | null
  categoryId: string | null
  subCategoryId: string | null
  imageUrls: string[]
}
export const state = (): NewGarmentDataState => ({
  title: null,
  description: null,
  ownerId: null,
  brandId: null,
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
  settableStringFields(
    state: NewGarmentDataState
  ): Omit<NewGarmentDataState, 'imageUrls' | 'ownerId'> {
    return {
      title: state.title,
      description: state.description,
      brandId: state.brandId,
      categoryId: state.categoryId,
      subCategoryId: state.subCategoryId,
    }
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
  addImageUrl(state: NewGarmentDataState, urlToAdd: string) {
    Vue.set(state.imageUrls, state.imageUrls.length, urlToAdd)
  },
})

export const actions = actionTree({ state, getters, mutations }, {})
