<template>
  <div id="loginPanel">
    <div class="columns is-centered">
      <div class="column is-one-third-desktop">
        <div class="card mt-4">
          <header class="card-header">
            <p class="card-header-title">Log in</p>
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
                  type="password"
                  :message="errors.password"
                  @input="handleFieldChange('password', $event)"
                ></b-input>
              </b-field>
              <b-field>
                <p class="control">
                  <b-button class="button is-indian-red" @click="doSubmit"
                    >Log in</b-button
                  >
                </p>
              </b-field>
              <div>
                Not a member? <nuxt-link to="/signup">Sign up</nuxt-link>
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
import { LOGIN } from '~/queries/login'
import { Credentials } from '~/store/unauthenticatedUserCredentials'
import { User } from '~/types/Garment'
import { CreateUserInput } from '~/gqlSchemaTypes/globalTypes'

export default Vue.extend({
  data() {
    return {
      isShowingNotFoundError: false,
      hasAttemptedSubmit: false,
    }
  },
  computed: {
    credentials(): Credentials {
      return this.$accessor.unauthenticatedUserCredentials.creds
    },
    errors(): object {
      return this.$accessor.unauthenticatedUserCredentials.loginErrors
    },
  },
  methods: {
    flashNotFoundMessage(this: Vue): void {
      this.$data.isShowingNotFoundError = true
      setTimeout(() => {
        this.$data.isShowingNotFoundError = false
      }, 2000)
    },
    handleFieldChange(
      this: Vue,
      field: 'email' | 'password' | 'passwordConfirm',
      value: string
    ): void {
      this.$accessor.unauthenticatedUserCredentials.updateField({
        field,
        value,
      })
    },
    async doSubmit(): Promise<void> {
      this.$data.hasAttemptedSubmit = true
      const isValid: boolean = this.$accessor.unauthenticatedUserCredentials
        .isLoginValid
      const {
        password,
        email,
      }: CreateUserInput = this.$accessor.unauthenticatedUserCredentials.creds
      if (isValid) {
        const response = await this.$apollo.mutate({
          mutation: LOGIN,
          variables: {
            password,
            email,
          },
        })
        const resp = response?.data?.loginUser || {}
        const { token, __typename, user = {} } = resp
        const { id, email: userEmail } = user as User
        if (token) {
          this.$accessor.sessionUser.setSessionUserData({
            id,
            email: userEmail,
          })
          await this.$apolloHelpers.onLogin(token)
          const { redirect = 'home' } = this.$route?.query
          await this.$router.push(redirect as string)
        } else if (__typename === 'UserNotFoundError') {
          this.flashNotFoundMessage()
        }
      }
    },
  },
})
</script>

<style lang="scss">
#loginPanel {
  width: 100vw;
  height: 100vh;
  padding-top: 0rem;
  @include desktop {
    padding-top: 4rem;
  }
}
</style>
