import locale683a7498 from '../..\\static\\locales\\cabinet.json'

export const Constants = {
  COMPONENT_OPTIONS_KEY: "nuxtI18n",
  STRATEGIES: {"PREFIX":"prefix","PREFIX_EXCEPT_DEFAULT":"prefix_except_default","PREFIX_AND_DEFAULT":"prefix_and_default","NO_PREFIX":"no_prefix"},
  REDIRECT_ON_OPTIONS: {"ALL":"all","ROOT":"root","NO_PREFIX":"no prefix"},
}
export const nuxtOptions = {
  isUniversalMode: false,
  trailingSlash: undefined,
}
export const options = {
  vueI18n: {"fallbackLocale":"en","silentTranslationWarn":true},
  vueI18nLoader: false,
  locales: [{"code":"ar","file":"cabinet.json","dir":"rtl"},{"code":"zh","file":"cabinet.json","dir":"ltr"},{"code":"en","file":"cabinet.json","dir":"ltr"},{"code":"fr","file":"cabinet.json","dir":"ltr"},{"code":"de","file":"cabinet.json","dir":"ltr"},{"code":"id","file":"cabinet.json","dir":"ltr"},{"code":"it","file":"cabinet.json","dir":"ltr"},{"code":"km","file":"cabinet.json","dir":"ltr"},{"code":"ko","file":"cabinet.json","dir":"ltr"},{"code":"my","file":"cabinet.json","dir":"ltr"},{"code":"ms","file":"cabinet.json","dir":"ltr"},{"code":"ps","file":"cabinet.json","dir":"ltr"},{"code":"fa","file":"cabinet.json","dir":"rtl"},{"code":"pt","file":"cabinet.json","dir":"ltr"},{"code":"pl","file":"cabinet.json","dir":"ltr"},{"code":"ru","file":"cabinet.json","dir":"ltr"},{"code":"es","file":"cabinet.json","dir":"ltr"},{"code":"sw","file":"cabinet.json","dir":"ltr"},{"code":"th","file":"cabinet.json","dir":"ltr"},{"code":"ur","file":"cabinet.json","dir":"rtl"},{"code":"vi","file":"cabinet.json","dir":"ltr"}],
  defaultLocale: "ru",
  defaultDirection: "ltr",
  routesNameSeparator: "___",
  defaultLocaleRouteNameSuffix: "default",
  sortRoutes: true,
  strategy: "prefix",
  lazy: false,
  langDir: "C:\\Users\\kagra\\Desktop\\Frontend\\liteforex-cabinet-frontend\\static\\locales",
  rootRedirect: null,
  detectBrowserLanguage: {"alwaysRedirect":false,"cookieCrossOrigin":false,"cookieDomain":null,"cookieKey":"i18n_redirected","cookieSecure":false,"fallbackLocale":"","redirectOn":"root","useCookie":true},
  differentDomains: false,
  baseUrl: "",
  vuex: {"moduleName":"i18n","syncRouteParams":true},
  parsePages: true,
  pages: {},
  skipSettingLocaleOnNavigate: false,
  onBeforeLanguageSwitch: () => {},
  onLanguageSwitched: () => null,
  normalizedLocales: [{"code":"ar","file":"cabinet.json","dir":"rtl"},{"code":"zh","file":"cabinet.json","dir":"ltr"},{"code":"en","file":"cabinet.json","dir":"ltr"},{"code":"fr","file":"cabinet.json","dir":"ltr"},{"code":"de","file":"cabinet.json","dir":"ltr"},{"code":"id","file":"cabinet.json","dir":"ltr"},{"code":"it","file":"cabinet.json","dir":"ltr"},{"code":"km","file":"cabinet.json","dir":"ltr"},{"code":"ko","file":"cabinet.json","dir":"ltr"},{"code":"my","file":"cabinet.json","dir":"ltr"},{"code":"ms","file":"cabinet.json","dir":"ltr"},{"code":"ps","file":"cabinet.json","dir":"ltr"},{"code":"fa","file":"cabinet.json","dir":"rtl"},{"code":"pt","file":"cabinet.json","dir":"ltr"},{"code":"pl","file":"cabinet.json","dir":"ltr"},{"code":"ru","file":"cabinet.json","dir":"ltr"},{"code":"es","file":"cabinet.json","dir":"ltr"},{"code":"sw","file":"cabinet.json","dir":"ltr"},{"code":"th","file":"cabinet.json","dir":"ltr"},{"code":"ur","file":"cabinet.json","dir":"rtl"},{"code":"vi","file":"cabinet.json","dir":"ltr"}],
  localeCodes: ["ar","zh","en","fr","de","id","it","km","ko","my","ms","ps","fa","pt","pl","ru","es","sw","th","ur","vi"],
  additionalMessages: [],
}

export const localeMessages = {
  'cabinet.json': () => Promise.resolve(locale683a7498),
}
