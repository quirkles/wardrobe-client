<template>
  <div id="signupPanel">
    <div class="columns is-centered">
      <div class="column is-one-third-desktop">
        <div class="card">
          <header class="card-header">
            <h1 class="card-header-title is-size-3 has-text-info">Sign Up</h1>
          </header>
          <div class="card-content">
            <div class="content">
              <b-field
                label="Email"
                :message="(hasAttemptedSubmit && errors.email) || []"
                :type="
                  hasAttemptedSubmit && errors.email ? 'is-danger' : undefined
                "
              >
                <b-input
                  v-model="credentials.email"
                  required
                  type="email"
                  @input="handleFieldChange('email', $event)"
                ></b-input>
              </b-field>
              <b-field
                label="Password"
                :message="(hasAttemptedSubmit && errors.password) || []"
                :type="
                  hasAttemptedSubmit && errors.password
                    ? 'is-danger'
                    : undefined
                "
              >
                <b-input
                  v-model="credentials.password"
                  required
                  type="password"
                  @input="handleFieldChange('password', $event)"
                ></b-input>
              </b-field>
              <b-field
                label="Confirm Password"
                :message="(hasAttemptedSubmit && errors.passwordConfirm) || []"
                :type="
                  hasAttemptedSubmit && errors.passwordConfirm
                    ? 'is-danger'
                    : undefined
                "
              >
                <b-input
                  v-model="credentials.passwordConfirm"
                  type="password"
                  @input="handleFieldChange('passwordConfirm', $event)"
                ></b-input>
              </b-field>
              <b-field>
                <p class="control">
                  <b-button class="button is-info" @click="doSubmit"
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
import { CreateUserInput } from '~/gqlSchemaTypes/globalTypes'

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
  .card-header-title {
    padding: 1.5rem;
    border-bottom: 2px solid $info;
  }
  @include desktop {
    padding-top: 4rem;
  }
}
</style>
