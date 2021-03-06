import config from './config'

// temporary fix for https://github.com/buefy/nuxt-buefy/issues/72
global.HTMLImageElement =
  typeof window === 'undefined' ? Object : window.HTMLImageElement

const {
  AWS_BUCKET_NAME,
  AWS_BUCKET_REGION,
  AWS_IDENTITY_POOL_ID,
  GQL_SCHEMA_ENDPOINT,
} = config

export default {
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: 'server',
  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '',
      },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:ital,wght@0,400;0,600;1,400;1,600&display=swap',
      },
    ],
  },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: ['~plugins/buefy.ts', '~plugins/eventBus.ts'],
  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  components: true,
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: ['@nuxt/typescript-build', 'nuxt-typed-vuex'],
  /*
   ** Nuxt.js modules
   */
  modules: ['@nuxtjs/apollo', '@nuxtjs/style-resources', '@nuxtjs/fontawesome'],
  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {
    transpile: [/typed-vuex/],
  },
  apollo: {
    clientConfigs: {
      default: '~/apollo/config.js',
    },
  },
  styleResources: {
    scss: ['./assets/styles/main.scss'],
  },
  fontawesome: {
    icons: {
      solid: ['faPlus'],
      regular: [],
      light: [],
      duotone: [],
      brands: [],
    },
  },
  router: {
    extendRoutes(routes) {
      routes.push({
        path: '/',
        redirect: '/login',
      })
    },
  },
  env: {
    AWS_BUCKET_NAME,
    AWS_BUCKET_REGION,
    AWS_IDENTITY_POOL_ID,
    GQL_SCHEMA_ENDPOINT,
  },
}
