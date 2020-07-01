import {
  getterTree,
  mutationTree,
  actionTree,
  getAccessorType,
} from 'typed-vuex'

import * as unauthenticatedUserCredentials from '~/store/unauthenticatedUserCredentials'

const state = () => {}

const getters = getterTree(state, {})

const mutations = mutationTree(state, {
  initialiseStore() {
    console.log('initialised root store')
  },
})

const actions = actionTree({ state, getters, mutations }, {})

const storePattern = {
  state,
  getters,
  mutations,
  actions,
  modules: {
    unauthenticatedUserCredentials,
  },
}

export const accessorType = getAccessorType(storePattern)
