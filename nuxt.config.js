export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Balchivist',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {hid: 'description', name: 'description', content: ''}
    ],
    link: [{rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['@fortawesome/fontawesome-svg-core/styles.css'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['~/plugins/fontawesome.js'],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    '@nuxtjs/i18n'
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    proxy: true
  },

  proxy: {
    '/api/v1/': {
      target: 'http://localhost:8000/api/v1/',
      pathRewrite: {
        '^/api/v1/': ''
      }
    }
  },

  auth: {
    strategies: {
      cookie: {
        cookie: {
          name: 'XSRF-TOKEN'
        },
        endpoints: {
          csrf: {
            url: 'http://localhost:8000'
          }
        }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  // i18n module configuration: https://i18n.nuxtjs.org/options-reference/
  i18n: {
    strategy: 'no_prefix',
    locales: [
      {
        code: 'en',
        name: 'English',
        file: 'en.json'
      },
      {
        code: 'es',
        name: 'Español',
        file: 'es.json'
      },
      {
        code: 'fr',
        name: 'Français',
        file: 'fr.json'
      },
      {
        code: 'zh-hans',
        name: '简体中文',
        file: 'zh-hans.json'
      }
    ],
    lazy: true,
    langDir: 'locales/',
    defaultLocale: 'en',
    vueI18n: {
      dateTimeFormats: {
        en: {
          short: {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          }
        }
      },
      fallbackLocale: 'en'
    }
  }
};
