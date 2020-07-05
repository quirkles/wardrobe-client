import {
  getterTree,
  mutationTree,
  actionTree,
  getAccessorType,
} from 'typed-vuex'

import * as unauthenticatedUserCredentials from '~/store/unauthenticatedUserCredentials'
import * as sessionUser from '~/store/sessionUser'

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
    sessionUser,
  },
}

export const accessorType = getAccessorType(storePattern)
