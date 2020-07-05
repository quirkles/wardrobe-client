import { actionTree, getterTree, mutationTree } from 'nuxt-typed-vuex'
import Vue from 'vue'

export interface SessionUserState {
  id: string
  email: string
}
export const state = (): SessionUserState => ({
  id: '',
  email: '',
})

const propIsValidKey = (prop: string): prop is keyof SessionUserState => {
  return prop in state()
}

export const getters = getterTree(state, {})

export const mutations = mutationTree(state, {
  setSessionUserData(
    state: SessionUserState,
    newData: Partial<SessionUserState>
  ) {
    for (const prop in newData) {
      if (propIsValidKey(prop) && newData[prop]) {
        Vue.set(state, prop, newData[prop])
      }
    }
    console.log(state) //eslint-disable-line
  },
})

export const actions = actionTree({ state, getters, mutations }, {})
