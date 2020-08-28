import { ApolloClient } from 'apollo-client'
import { ApolloProvider } from 'vue-apollo'
import { accessorType } from '~/store'

declare module '@nuxt/types' {
  interface NuxtAppOptions {
    $accessor: typeof accessorType
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    // @ts-ignore
    $apollo: ApolloClient<any>
    $apolloHelpers: {
      onLogin(
        token: string,
        apolloClient?: ApolloClient<{}>,
        tokenExpires?: number
      ): Promise<void>
      onLogout(apolloClient?: ApolloClient<{}>): Promise<void>
      getToken(tokenName?: string): string
    }
    apolloProvider: ApolloProvider
    $accessor: typeof accessorType
  }
}

export interface VueRefEl extends Element {
  getElement(): HTMLElement
}
