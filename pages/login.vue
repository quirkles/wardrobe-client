<template>
  <div id="loginPanel">
    <div class="columns is-centered">
      <div class="column is-one-third-desktop">
        <div class="card mt-4">
          <header class="card-header">
            <p class="card-header-title">
              Log in
            </p>
          </header>
          <div class="card-content">
            <div class="content">
              <b-field label="Email">
                <b-input
                  v-model="credentials.email"
                  type="email"
                  @input="handleFieldChange('email', $event)"
                ></b-input>
              </b-field>
              <b-field label="Password">
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
import { UnauthenticatedUserCredentialsState } from '~/store/unauthenticatedUserCredentials'
import { CreateUserInput } from '~/__generated__/globalTypes'
import { LOGIN } from '~/queries/login'

export default {
  computed: {
    credentials(this: Vue)  {
      return this.$accessor.unauthenticatedUserCredentials.creds
    },
    errors(this: Vue): object {
      return this.$accessor.unauthenticatedUserCredentials.errors
    },
  },
  methods: {
    handleFieldChange(
      this: Vue,
      field: 'email' | 'password' | 'passwordConfirm',
      value: string
    ) {
      this.$accessor.unauthenticatedUserCredentials.updateField({
        field,
        value,
      })
    },
    async doSubmit(this: Vue): Promise<void> {
      const isValid: boolean = this.$accessor.unauthenticatedUserCredentials
        .isValid
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
        const { token, reason } = response?.data?.loginUser || {}
        if (token) {
          await this.$apolloHelpers.onLogin(token)
          this.$router.push('home')
        } else {
          console.log(reason) //eslint-disable-line
        }
      }
    },
  },
}
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
