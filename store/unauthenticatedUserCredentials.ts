import Vue from 'vue'
import { isEmpty } from 'ramda'
import { actionTree, getterTree, mutationTree } from 'nuxt-typed-vuex'
import {
  createValidator,
  fieldRequired,
  fieldMatchesEmailRegex,
  mustMatchField,
} from '~/utils/validations'

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

const mustMatchPassword = mustMatchField('password')
const passwordConfirmMatchesPassword = mustMatchPassword(
  'passwordConfirm',
  'Password and confirm password must match.'
)

const emailIsValid = fieldMatchesEmailRegex('email')
const emailRequired = fieldRequired('email')
const passwordRequired = fieldRequired('password')

const emailNotTaken = ({ knownTakenEmails, email }: { [field: string]: any }) =>
  (knownTakenEmails || []).includes(email || '')
    ? ['email', 'This email is already taken']
    : null

const loginValidator = createValidator([
  emailRequired,
  emailIsValid,
  passwordRequired,
])

const signupValidator = createValidator([
  emailRequired,
  emailIsValid,
  passwordRequired,
  passwordConfirmMatchesPassword,
  emailNotTaken,
])

export const state = (): UnauthenticatedUserCredentialsState => ({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  passwordConfirm: '',
  knownTakenEmails: ['mail@mail.com'],
})

export const getters = getterTree(state, {
  isSignupValid: (_: UnauthenticatedUserCredentialsState, getters): boolean => {
    return isEmpty(getters.signupErrors)
  },
  isLoginValid: (_: UnauthenticatedUserCredentialsState, getters): boolean => {
    return isEmpty(getters.loginErrors)
  },
  signupErrors: (
    state: UnauthenticatedUserCredentialsState
  ): { [field: string]: string[] } => {
    return signupValidator(state)
  },
  loginErrors: (
    state: UnauthenticatedUserCredentialsState
  ): { [field: string]: string[] } => {
    return loginValidator(state)
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
