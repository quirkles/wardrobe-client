import {
  IntrospectionFragmentMatcher,
  InMemoryCache,
} from 'apollo-cache-inmemory'
import introspectionQueryResultData from '../fragmentTypes.json'
const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData,
})

export default function (ctx) {
  return {
    httpEndpoint: process.env.GQL_SCHEMA_ENDPOINT,
    getAuth: () => {
      const token = ctx?.app?.$apolloHelpers?.getToken()
      return token ? `Bearer ${token}` : null
    },
    cache: new InMemoryCache({ fragmentMatcher }),
    fetchOptions: {
      mode: 'no-cors',
    },
  }
}
