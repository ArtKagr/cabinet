export default {
  server: {
    host: '0.0.0.0',
    port: 3000
  },
  ssr: false,
  head: {
    title: 'LiteFinance Global LLC',
    htmlAttrs: { lang: 'en' },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  css: [
  ],
  plugins: [
    '@/plugins/socket.io.js',
    '@/plugins/vue-textarea-autosize',
    '@/plugins/vuescroll',
    '@/plugins/pluralize',
    '@/plugins/socket-uploader',
    '@/plugins/numberformat',
    { src: '@/plugins/vueflickity', ssr: false },
    '@/plugins/vuesparklines',
    '@/plugins/direction-control',
    '@/plugins/trading/Constants',
    '@/plugins/trading/CopyTrading',
    '@/plugins/trading/Format',
    '@/plugins/trading/Instrument',
    '@/plugins/trading/Portfolio',
    '@/plugins/trading/Quotes',
    '@/plugins/trading/Trade',
    '@/plugins/trading/Trading',
    '@/plugins/Form',
    '@/plugins/Analytics',
    '@/plugins/v-mask'
  ],
  components: true,
  buildModules: [
    '@nuxtjs/eslint-module'
  ],
  modules: [
    'bootstrap-vue/nuxt',
    '@nuxtjs/axios',
    '@nuxtjs/svg-sprite',
    [
      '@nuxtjs/i18n',
      {
        langDir: '~/static/locales',
        locales: [
          { code: 'ar', file: 'cabinet.json', dir: 'rtl' },
          { code: 'zh', file: 'cabinet.json', dir: 'ltr' },
          { code: 'en', file: 'cabinet.json', dir: 'ltr' },
          { code: 'fr', file: 'cabinet.json', dir: 'ltr' },
          { code: 'de', file: 'cabinet.json', dir: 'ltr' },
          { code: 'id', file: 'cabinet.json', dir: 'ltr' },
          { code: 'it', file: 'cabinet.json', dir: 'ltr' },
          { code: 'km', file: 'cabinet.json', dir: 'ltr' },
          { code: 'ko', file: 'cabinet.json', dir: 'ltr' },
          { code: 'my', file: 'cabinet.json', dir: 'ltr' },
          { code: 'ms', file: 'cabinet.json', dir: 'ltr' },
          { code: 'ps', file: 'cabinet.json', dir: 'ltr' },
          { code: 'fa', file: 'cabinet.json', dir: 'rtl' },
          { code: 'pt', file: 'cabinet.json', dir: 'ltr' },
          { code: 'pl', file: 'cabinet.json', dir: 'ltr' },
          { code: 'ru', file: 'cabinet.json', dir: 'ltr' },
          { code: 'es', file: 'cabinet.json', dir: 'ltr' },
          { code: 'sw', file: 'cabinet.json', dir: 'ltr' },
          { code: 'th', file: 'cabinet.json', dir: 'ltr' },
          { code: 'ur', file: 'cabinet.json', dir: 'rtl' },
          { code: 'vi', file: 'cabinet.json', dir: 'ltr' }
        ],
        defaultLocale: 'ru',
        vueI18n: {
          fallbackLocale: 'en',
          silentTranslationWarn: true
        },
        strategy: 'prefix'
      }
    ]
  ],
  svgSprite: {
    input: '~/assets/svg/'
  },
  axios: {
    baseURL: process.env.API_URL || 'https://api.liteforex.com'
  },
  bootstrapVue: {
    icons: true,
    bootstrapCSS: false,
    bootstrapVueCSS: false
  },
  build: {
    vendor: ['socket.io-client']
  },
  loadingIndicator: '~/static/spinner.html',
  loading: false
}
