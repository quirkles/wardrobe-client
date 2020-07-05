import {
  getterTree,
  mutationTree,
  actionTree,
  getAccessorType,
} from 'typed-vuex'

import * as unauthenticatedUserCredentials from '~/store/unauthenticatedUserCredentials'
import * as sessionUser from '~/store/sessionUser'
import * as newGarmentData from '~/store/newGarmentData'

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
    newGarmentData,
  },
}

export const accessorType = getAccessorType(storePattern)
