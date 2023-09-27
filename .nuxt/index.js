import Vue from 'vue'
import Vuex from 'vuex'
import Meta from 'vue-meta'
import ClientOnly from 'vue-client-only'
import NoSsr from 'vue-no-ssr'
import { createRouter } from './router.js'
import NuxtChild from './components/nuxt-child.js'
import NuxtError from '..\\layouts\\error.vue'
import Nuxt from './components/nuxt.js'
import App from './App.js'
import { setContext, getLocation, getRouteData, normalizeError } from './utils'
import { createStore } from './store.js'

/* Plugins */

import nuxt_plugin_plugin_661bb298 from 'nuxt_plugin_plugin_661bb298' // Source: .\\components\\plugin.js (mode: 'all')
import nuxt_plugin_bootstrapvue_5d512006 from 'nuxt_plugin_bootstrapvue_5d512006' // Source: .\\bootstrap-vue.js (mode: 'all')
import nuxt_plugin_pluginutils_63194e77 from 'nuxt_plugin_pluginutils_63194e77' // Source: .\\nuxt-i18n\\plugin.utils.js (mode: 'all')
import nuxt_plugin_pluginrouting_8fffcbfc from 'nuxt_plugin_pluginrouting_8fffcbfc' // Source: .\\nuxt-i18n\\plugin.routing.js (mode: 'all')
import nuxt_plugin_pluginmain_7da4e0ad from 'nuxt_plugin_pluginmain_7da4e0ad' // Source: .\\nuxt-i18n\\plugin.main.js (mode: 'all')
import nuxt_plugin_nuxtsvgsprite_4cb5f996 from 'nuxt_plugin_nuxtsvgsprite_4cb5f996' // Source: .\\nuxt-svg-sprite.js (mode: 'all')
import nuxt_plugin_axios_43c708d7 from 'nuxt_plugin_axios_43c708d7' // Source: .\\axios.js (mode: 'all')
import nuxt_plugin_socketio_e8b8b66c from 'nuxt_plugin_socketio_e8b8b66c' // Source: ..\\plugins\\socket.io.js (mode: 'all')
import nuxt_plugin_vuetextareaautosize_83554d30 from 'nuxt_plugin_vuetextareaautosize_83554d30' // Source: ..\\plugins\\vue-textarea-autosize (mode: 'all')
import nuxt_plugin_vuescroll_1abdb05f from 'nuxt_plugin_vuescroll_1abdb05f' // Source: ..\\plugins\\vuescroll (mode: 'all')
import nuxt_plugin_pluralize_46c85fdc from 'nuxt_plugin_pluralize_46c85fdc' // Source: ..\\plugins\\pluralize (mode: 'all')
import nuxt_plugin_socketuploader_3cbc51d8 from 'nuxt_plugin_socketuploader_3cbc51d8' // Source: ..\\plugins\\socket-uploader (mode: 'all')
import nuxt_plugin_numberformat_2d17e074 from 'nuxt_plugin_numberformat_2d17e074' // Source: ..\\plugins\\numberformat (mode: 'all')
import nuxt_plugin_vueflickity_30928c56 from 'nuxt_plugin_vueflickity_30928c56' // Source: ..\\plugins\\vueflickity (mode: 'client')
import nuxt_plugin_vuesparklines_68554ed4 from 'nuxt_plugin_vuesparklines_68554ed4' // Source: ..\\plugins\\vuesparklines (mode: 'all')
import nuxt_plugin_directioncontrol_2966d19b from 'nuxt_plugin_directioncontrol_2966d19b' // Source: ..\\plugins\\direction-control (mode: 'all')
import nuxt_plugin_Constants_b9ea1366 from 'nuxt_plugin_Constants_b9ea1366' // Source: ..\\plugins\\trading\\Constants (mode: 'all')
import nuxt_plugin_CopyTrading_2372ed6a from 'nuxt_plugin_CopyTrading_2372ed6a' // Source: ..\\plugins\\trading\\CopyTrading (mode: 'all')
import nuxt_plugin_Format_1194388e from 'nuxt_plugin_Format_1194388e' // Source: ..\\plugins\\trading\\Format (mode: 'all')
import nuxt_plugin_Instrument_1dc39ea9 from 'nuxt_plugin_Instrument_1dc39ea9' // Source: ..\\plugins\\trading\\Instrument (mode: 'all')
import nuxt_plugin_Portfolio_01d92b74 from 'nuxt_plugin_Portfolio_01d92b74' // Source: ..\\plugins\\trading\\Portfolio (mode: 'all')
import nuxt_plugin_Quotes_0a4e7d39 from 'nuxt_plugin_Quotes_0a4e7d39' // Source: ..\\plugins\\trading\\Quotes (mode: 'all')
import nuxt_plugin_Trade_5b548562 from 'nuxt_plugin_Trade_5b548562' // Source: ..\\plugins\\trading\\Trade (mode: 'all')
import nuxt_plugin_Trading_4f6e5cc2 from 'nuxt_plugin_Trading_4f6e5cc2' // Source: ..\\plugins\\trading\\Trading (mode: 'all')
import nuxt_plugin_Form_9289c650 from 'nuxt_plugin_Form_9289c650' // Source: ..\\plugins\\Form (mode: 'all')
import nuxt_plugin_Analytics_99d3101c from 'nuxt_plugin_Analytics_99d3101c' // Source: ..\\plugins\\Analytics (mode: 'all')
import nuxt_plugin_vmask_42ab70d7 from 'nuxt_plugin_vmask_42ab70d7' // Source: ..\\plugins\\v-mask (mode: 'all')

// Component: <ClientOnly>
Vue.component(ClientOnly.name, ClientOnly)

// TODO: Remove in Nuxt 3: <NoSsr>
Vue.component(NoSsr.name, {
  ...NoSsr,
  render (h, ctx) {
    if (process.client && !NoSsr._warned) {
      NoSsr._warned = true

      console.warn('<no-ssr> has been deprecated and will be removed in Nuxt 3, please use <client-only> instead')
    }
    return NoSsr.render(h, ctx)
  }
})

// Component: <NuxtChild>
Vue.component(NuxtChild.name, NuxtChild)
Vue.component('NChild', NuxtChild)

// Component NuxtLink is imported in server.js or client.js

// Component: <Nuxt>
Vue.component(Nuxt.name, Nuxt)

Object.defineProperty(Vue.prototype, '$nuxt', {
  get() {
    return this.$root.$options.$nuxt
  },
  configurable: true
})

Vue.use(Meta, {"keyName":"head","attribute":"data-n-head","ssrAttribute":"data-n-head-ssr","tagIDKeyName":"hid"})

const defaultTransition = {"name":"page","mode":"out-in","appear":true,"appearClass":"appear","appearActiveClass":"appear-active","appearToClass":"appear-to"}

const originalRegisterModule = Vuex.Store.prototype.registerModule

function registerModule (path, rawModule, options = {}) {
  const preserveState = process.client && (
    Array.isArray(path)
      ? !!path.reduce((namespacedState, path) => namespacedState && namespacedState[path], this.state)
      : path in this.state
  )
  return originalRegisterModule.call(this, path, rawModule, { preserveState, ...options })
}

async function createApp(ssrContext, config = {}) {
  const router = await createRouter(ssrContext, config)

  const store = createStore(ssrContext)
  // Add this.$router into store actions/mutations
  store.$router = router

  // Create Root instance

  // here we inject the router and store to all child components,
  // making them available everywhere as `this.$router` and `this.$store`.
  const app = {
    head: {"title":"LiteFinance Global LLC","htmlAttrs":{"lang":"en"},"meta":[{"charset":"utf-8"},{"name":"viewport","content":"width=device-width, initial-scale=1"},{"hid":"description","name":"description","content":""}],"link":[{"rel":"icon","type":"image\u002Fx-icon","href":"\u002Ffavicon.ico"}],"style":[],"script":[]},

    store,
    router,
    nuxt: {
      defaultTransition,
      transitions: [defaultTransition],
      setTransitions (transitions) {
        if (!Array.isArray(transitions)) {
          transitions = [transitions]
        }
        transitions = transitions.map((transition) => {
          if (!transition) {
            transition = defaultTransition
          } else if (typeof transition === 'string') {
            transition = Object.assign({}, defaultTransition, { name: transition })
          } else {
            transition = Object.assign({}, defaultTransition, transition)
          }
          return transition
        })
        this.$options.nuxt.transitions = transitions
        return transitions
      },

      err: null,
      dateErr: null,
      error (err) {
        err = err || null
        app.context._errored = Boolean(err)
        err = err ? normalizeError(err) : null
        let nuxt = app.nuxt // to work with @vue/composition-api, see https://github.com/nuxt/nuxt.js/issues/6517#issuecomment-573280207
        if (this) {
          nuxt = this.nuxt || this.$options.nuxt
        }
        nuxt.dateErr = Date.now()
        nuxt.err = err
        // Used in src/server.js
        if (ssrContext) {
          ssrContext.nuxt.error = err
        }
        return err
      }
    },
    ...App
  }

  // Make app available into store via this.app
  store.app = app

  const next = ssrContext ? ssrContext.next : location => app.router.push(location)
  // Resolve route
  let route
  if (ssrContext) {
    route = router.resolve(ssrContext.url).route
  } else {
    const path = getLocation(router.options.base, router.options.mode)
    route = router.resolve(path).route
  }

  // Set context to app.context
  await setContext(app, {
    store,
    route,
    next,
    error: app.nuxt.error.bind(app),
    payload: ssrContext ? ssrContext.payload : undefined,
    req: ssrContext ? ssrContext.req : undefined,
    res: ssrContext ? ssrContext.res : undefined,
    beforeRenderFns: ssrContext ? ssrContext.beforeRenderFns : undefined,
    ssrContext
  })

  function inject(key, value) {
    if (!key) {
      throw new Error('inject(key, value) has no key provided')
    }
    if (value === undefined) {
      throw new Error(`inject('${key}', value) has no value provided`)
    }

    key = '$' + key
    // Add into app
    app[key] = value
    // Add into context
    if (!app.context[key]) {
      app.context[key] = value
    }

    // Add into store
    store[key] = app[key]

    // Check if plugin not already installed
    const installKey = '__nuxt_' + key + '_installed__'
    if (Vue[installKey]) {
      return
    }
    Vue[installKey] = true
    // Call Vue.use() to install the plugin into vm
    Vue.use(() => {
      if (!Object.prototype.hasOwnProperty.call(Vue.prototype, key)) {
        Object.defineProperty(Vue.prototype, key, {
          get () {
            return this.$root.$options[key]
          }
        })
      }
    })
  }

  // Inject runtime config as $config
  inject('config', config)

  if (process.client) {
    // Replace store state before plugins execution
    if (window.__NUXT__ && window.__NUXT__.state) {
      store.replaceState(window.__NUXT__.state)
    }
  }

  // Add enablePreview(previewData = {}) in context for plugins
  if (process.static && process.client) {
    app.context.enablePreview = function (previewData = {}) {
      app.previewData = Object.assign({}, previewData)
      inject('preview', previewData)
    }
  }
  // Plugin execution

  if (typeof nuxt_plugin_plugin_661bb298 === 'function') {
    await nuxt_plugin_plugin_661bb298(app.context, inject)
  }

  if (typeof nuxt_plugin_bootstrapvue_5d512006 === 'function') {
    await nuxt_plugin_bootstrapvue_5d512006(app.context, inject)
  }

  if (typeof nuxt_plugin_pluginutils_63194e77 === 'function') {
    await nuxt_plugin_pluginutils_63194e77(app.context, inject)
  }

  if (typeof nuxt_plugin_pluginrouting_8fffcbfc === 'function') {
    await nuxt_plugin_pluginrouting_8fffcbfc(app.context, inject)
  }

  if (typeof nuxt_plugin_pluginmain_7da4e0ad === 'function') {
    await nuxt_plugin_pluginmain_7da4e0ad(app.context, inject)
  }

  if (typeof nuxt_plugin_nuxtsvgsprite_4cb5f996 === 'function') {
    await nuxt_plugin_nuxtsvgsprite_4cb5f996(app.context, inject)
  }

  if (typeof nuxt_plugin_axios_43c708d7 === 'function') {
    await nuxt_plugin_axios_43c708d7(app.context, inject)
  }

  if (typeof nuxt_plugin_socketio_e8b8b66c === 'function') {
    await nuxt_plugin_socketio_e8b8b66c(app.context, inject)
  }

  if (typeof nuxt_plugin_vuetextareaautosize_83554d30 === 'function') {
    await nuxt_plugin_vuetextareaautosize_83554d30(app.context, inject)
  }

  if (typeof nuxt_plugin_vuescroll_1abdb05f === 'function') {
    await nuxt_plugin_vuescroll_1abdb05f(app.context, inject)
  }

  if (typeof nuxt_plugin_pluralize_46c85fdc === 'function') {
    await nuxt_plugin_pluralize_46c85fdc(app.context, inject)
  }

  if (typeof nuxt_plugin_socketuploader_3cbc51d8 === 'function') {
    await nuxt_plugin_socketuploader_3cbc51d8(app.context, inject)
  }

  if (typeof nuxt_plugin_numberformat_2d17e074 === 'function') {
    await nuxt_plugin_numberformat_2d17e074(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_vueflickity_30928c56 === 'function') {
    await nuxt_plugin_vueflickity_30928c56(app.context, inject)
  }

  if (typeof nuxt_plugin_vuesparklines_68554ed4 === 'function') {
    await nuxt_plugin_vuesparklines_68554ed4(app.context, inject)
  }

  if (typeof nuxt_plugin_directioncontrol_2966d19b === 'function') {
    await nuxt_plugin_directioncontrol_2966d19b(app.context, inject)
  }

  if (typeof nuxt_plugin_Constants_b9ea1366 === 'function') {
    await nuxt_plugin_Constants_b9ea1366(app.context, inject)
  }

  if (typeof nuxt_plugin_CopyTrading_2372ed6a === 'function') {
    await nuxt_plugin_CopyTrading_2372ed6a(app.context, inject)
  }

  if (typeof nuxt_plugin_Format_1194388e === 'function') {
    await nuxt_plugin_Format_1194388e(app.context, inject)
  }

  if (typeof nuxt_plugin_Instrument_1dc39ea9 === 'function') {
    await nuxt_plugin_Instrument_1dc39ea9(app.context, inject)
  }

  if (typeof nuxt_plugin_Portfolio_01d92b74 === 'function') {
    await nuxt_plugin_Portfolio_01d92b74(app.context, inject)
  }

  if (typeof nuxt_plugin_Quotes_0a4e7d39 === 'function') {
    await nuxt_plugin_Quotes_0a4e7d39(app.context, inject)
  }

  if (typeof nuxt_plugin_Trade_5b548562 === 'function') {
    await nuxt_plugin_Trade_5b548562(app.context, inject)
  }

  if (typeof nuxt_plugin_Trading_4f6e5cc2 === 'function') {
    await nuxt_plugin_Trading_4f6e5cc2(app.context, inject)
  }

  if (typeof nuxt_plugin_Form_9289c650 === 'function') {
    await nuxt_plugin_Form_9289c650(app.context, inject)
  }

  if (typeof nuxt_plugin_Analytics_99d3101c === 'function') {
    await nuxt_plugin_Analytics_99d3101c(app.context, inject)
  }

  if (typeof nuxt_plugin_vmask_42ab70d7 === 'function') {
    await nuxt_plugin_vmask_42ab70d7(app.context, inject)
  }

  // Lock enablePreview in context
  if (process.static && process.client) {
    app.context.enablePreview = function () {
      console.warn('You cannot call enablePreview() outside a plugin.')
    }
  }

  // If server-side, wait for async component to be resolved first
  if (process.server && ssrContext && ssrContext.url) {
    await new Promise((resolve, reject) => {
      router.push(ssrContext.url, resolve, (err) => {
        // https://github.com/vuejs/vue-router/blob/v3.4.3/src/util/errors.js
        if (!err._isRouter) return reject(err)
        if (err.type !== 2 /* NavigationFailureType.redirected */) return resolve()

        // navigated to a different route in router guard
        const unregister = router.afterEach(async (to, from) => {
          ssrContext.url = to.fullPath
          app.context.route = await getRouteData(to)
          app.context.params = to.params || {}
          app.context.query = to.query || {}
          unregister()
          resolve()
        })
      })
    })
  }

  return {
    store,
    app,
    router
  }
}

export { createApp, NuxtError }
