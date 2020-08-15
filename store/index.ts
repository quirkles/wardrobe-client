import {
  getterTree,
  mutationTree,
  actionTree,
  getAccessorType,
} from 'typed-vuex'

import { decode } from 'jsonwebtoken'
import * as unauthenticatedUserCredentials from '~/store/unauthenticatedUserCredentials'
import * as sessionUser from '~/store/sessionUser'
import * as newGarmentData from '~/store/newGarmentData'
import { serverGetCookie } from '~/utils/cookie'
import { DecodedJwtToken } from '~/types/DecodedJwtToken'

const state = () => {}

const getters = getterTree(state, {})

const mutations = mutationTree(state, {
  initialiseStore() {
    console.log('initialised root store')
  },
})

const actions = actionTree(
  { state, getters, mutations },
  {
    async nuxtServerInit({ commit }, context): Promise<void> {
      const token = serverGetCookie(context)
      if (token) {
        const { sub: id, email } = decode(token) as DecodedJwtToken
        console.log(id, email) //eslint-disable-line
        await commit('sessionUser/setSessionUserData' as any, {
          id: String(id),
          email,
        })
      }
    },
  }
)

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
