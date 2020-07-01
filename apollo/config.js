import {
  InMemoryCache,
  IntrospectionFragmentMatcher,
} from 'apollo-cache-inmemory'

import introspectionQueryResultData from '../fragmentTypes.ts'

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData,
})

const cache = new InMemoryCache({ fragmentMatcher })

export default function (ctx) {
  return {
    httpEndpoint: `http://localhost:4000/graphql`,
    getAuth: () => {
      const token = ctx?.app?.$apolloHelpers?.getToken()
      return token ? `Bearer ${token}` : null
    },
    cache,
  }
}
