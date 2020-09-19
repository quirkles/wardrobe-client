<template>
  <div id="signupPanel">
    <div class="columns is-centered">
      <div class="column is-one-third-desktop">
        <div class="card">
          <header class="card-header">
            <p class="card-header-title">Sign Up</p>
          </header>
          <div class="card-content">
            <div class="content">
              <b-field label="Email" :message="errors.email">
                <b-input
                  v-model="credentials.email"
                  type="email"
                  @input="handleFieldChange('email', $event)"
                ></b-input>
              </b-field>
              <b-field label="Password" :message="errors.password">
                <b-input
                  v-model="credentials.password"
                  type="password"
                  @input="handleFieldChange('password', $event)"
                ></b-input>
              </b-field>
              <b-field
                label="Confirm Password"
                :message="errors.passwordConfirm"
              >
                <b-input
                  v-model="credentials.passwordConfirm"
                  type="password"
                  @input="handleFieldChange('passwordConfirm', $event)"
                ></b-input>
              </b-field>
              <b-field>
                <p class="control">
                  <b-button class="button is-indian-red" @click="doSubmit"
                    >Sign up</b-button
                  >
                </p>
              </b-field>
              <div>
                Already a member? <nuxt-link to="/login">Log in</nuxt-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { SIGNUP } from '~/queries/signup'
import { Credentials } from '~/store/unauthenticatedUserCredentials'
import { CreateUserInput } from '~/fragmentTypes'

export default Vue.extend({
  data() {
    return {
      hasAttemptedSubmit: false,
    }
  },
  computed: {
    credentials(): Credentials {
      return this.$accessor.unauthenticatedUserCredentials.creds
    },
    errors(): object {
      return this.$accessor.unauthenticatedUserCredentials.signupErrors
    },
  },
  methods: {
    handleFieldChange(
      field: 'email' | 'password' | 'passwordConfirm',
      value: string
    ) {
      this.$accessor.unauthenticatedUserCredentials.updateField({
        field,
        value,
      })
    },
    async doSubmit(): Promise<void> {
      this.$data.hasAttemptedSubmit = true
      const isValid: boolean = this.$accessor.unauthenticatedUserCredentials
        .isSignupValid
      const {
        password,
        email,
      }: CreateUserInput = this.$accessor.unauthenticatedUserCredentials.creds
      if (isValid) {
        const response = await this.$apollo.mutate({
          mutation: SIGNUP,
          variables: {
            createUserInput: {
              password,
              email,
            },
          },
        })
        const { token, __typename } = response?.data?.createUser || {}
        if (token) {
          await this.$apolloHelpers.onLogin(token)
          this.$router.push('home')
        } else if (__typename === 'DuplicateUserError') {
          this.$accessor.unauthenticatedUserCredentials.addKnownTakenEmail(
            email
          )
        }
      }
    },
  },
})
</script>
<style lang="scss">
#signupPanel {
  width: 100vw;
  height: 100vh;
  padding-top: 0rem;
  @include desktop {
    padding-top: 4rem;
  }
}
</style>
