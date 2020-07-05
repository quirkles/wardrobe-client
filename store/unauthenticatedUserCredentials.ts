import Vue from 'vue'
import { actionTree, getterTree, mutationTree } from 'nuxt-typed-vuex'

const mustMatch = (
  a: string | number,
  b: string | number,
  message: string
): null | string => (a === b ? null : message)

const stripNulls = (val: string | null): val is string => !!val

export interface UnauthenticatedUserCredentialsState {
  firstName: string
  lastName: string
  email: string
  password: string
  passwordConfirm: string
  knownTakenEmails: string[]
}

export type Credentials = Omit<
  UnauthenticatedUserCredentialsState,
  'knownTakenEmails'
>

interface UpdateFieldPayload {
  field: keyof Credentials
  value: string
}

export const state = (): UnauthenticatedUserCredentialsState => ({
  firstName: 'alex',
  lastName: 'quirk',
  email: 'email1@mail.com',
  password: '',
  passwordConfirm: '',
  knownTakenEmails: [],
})

export const getters = getterTree(state, {
  isSignupValid: (state: UnauthenticatedUserCredentialsState): boolean => {
    const passwordsMatch = state.password === state.passwordConfirm
    const emailTaken = state.knownTakenEmails.includes(state.email)
    if (!passwordsMatch || emailTaken) {
      return false
    }
    return true
  },
  isLoginValid: (state: UnauthenticatedUserCredentialsState): boolean => {
    return !!(state.email.length && state.password.length)
  },
  signupErrors: (
    state: UnauthenticatedUserCredentialsState
  ): { [field: string]: string[] } => {
    return {
      email: [
        state.knownTakenEmails.includes(state.email)
          ? 'Email address already taken'
          : null,
      ].filter(stripNulls),
      password: [
        mustMatch(
          state.password,
          state.passwordConfirm,
          'Password and confirm password do not match'
        ),
      ].filter(stripNulls),
      passwordConfirm: [
        mustMatch(
          state.password,
          state.passwordConfirm,
          'Password and confirm password do not match'
        ),
      ].filter(stripNulls),
    }
  },
  loginErrors: (
    state: UnauthenticatedUserCredentialsState
  ): { [field: string]: string[] } => {
    return {
      password: [
        mustMatch(
          state.password,
          state.passwordConfirm,
          'Password and confirm password do not match'
        ),
      ].filter(stripNulls),
      passwordConfirm: [
        mustMatch(
          state.password,
          state.passwordConfirm,
          'Password and confirm password do not match'
        ),
      ].filter(stripNulls),
    }
  },
  creds: (state: UnauthenticatedUserCredentialsState): Credentials => ({
    firstName: state.firstName,
    lastName: state.lastName,
    email: state.email,
    password: state.password,
    passwordConfirm: state.passwordConfirm,
  }),
})

export const mutations = mutationTree(state, {
  initialiseStore() {
    console.log('initialised unauthenticatedUserCredentials store')
  },
  updateField(
    state: UnauthenticatedUserCredentialsState,
    { field, value }: UpdateFieldPayload
  ) {
    state[field] = value
  },
  addKnownTakenEmail(
    state: UnauthenticatedUserCredentialsState,
    email: string
  ): void {
    Vue.set(state.knownTakenEmails, state.knownTakenEmails.length, email)
  },
})

export const actions = actionTree({ state, getters, mutations }, {})
