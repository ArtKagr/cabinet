import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const VUEX_PROPERTIES = ['state', 'getters', 'actions', 'mutations']

let store = {};

(function updateModules () {
  store = normalizeRoot(require('..\\store\\index.js'), 'store/index.js')

  // If store is an exported method = classic mode (deprecated)

  if (typeof store === 'function') {
    return console.warn('Classic mode for store/ is deprecated and will be removed in Nuxt 3.')
  }

  // Enforce store modules
  store.modules = store.modules || {}

  resolveStoreModules(require('..\\store\\socket.js'), 'socket.js')
  resolveStoreModules(require('..\\store\\analytics\\actions\\handler.js'), 'analytics/actions/handler.js')
  resolveStoreModules(require('..\\store\\analytics\\getters\\handler.js'), 'analytics/getters/handler.js')
  resolveStoreModules(require('..\\store\\analytics\\mutations\\handler.js'), 'analytics/mutations/handler.js')
  resolveStoreModules(require('..\\store\\analytics\\state\\handler.js'), 'analytics/state/handler.js')
  resolveStoreModules(require('..\\store\\chat\\actions\\handler.js'), 'chat/actions/handler.js')
  resolveStoreModules(require('..\\store\\chat\\getters\\handler.js'), 'chat/getters/handler.js')
  resolveStoreModules(require('..\\store\\chat\\mutations\\handler.js'), 'chat/mutations/handler.js')
  resolveStoreModules(require('..\\store\\chat\\state\\handler.js'), 'chat/state/handler.js')
  resolveStoreModules(require('..\\store\\dictionaries\\actions\\auth.js'), 'dictionaries/actions/auth.js')
  resolveStoreModules(require('..\\store\\dictionaries\\actions\\handler.js'), 'dictionaries/actions/handler.js')
  resolveStoreModules(require('..\\store\\dictionaries\\getters\\handler.js'), 'dictionaries/getters/handler.js')
  resolveStoreModules(require('..\\store\\dictionaries\\getters\\user.js'), 'dictionaries/getters/user.js')
  resolveStoreModules(require('..\\store\\dictionaries\\mutations\\handler.js'), 'dictionaries/mutations/handler.js')
  resolveStoreModules(require('..\\store\\dictionaries\\mutations\\user.js'), 'dictionaries/mutations/user.js')
  resolveStoreModules(require('..\\store\\dictionaries\\state\\handler.js'), 'dictionaries/state/handler.js')
  resolveStoreModules(require('..\\store\\dictionaries\\state\\language.js'), 'dictionaries/state/language.js')
  resolveStoreModules(require('..\\store\\dictionaries\\state\\user.js'), 'dictionaries/state/user.js')
  resolveStoreModules(require('..\\store\\education\\actions\\handler.js'), 'education/actions/handler.js')
  resolveStoreModules(require('..\\store\\education\\getters\\handler.js'), 'education/getters/handler.js')
  resolveStoreModules(require('..\\store\\education\\mutations\\handler.js'), 'education/mutations/handler.js')
  resolveStoreModules(require('..\\store\\education\\state\\handler.js'), 'education/state/handler.js')
  resolveStoreModules(require('..\\store\\finance\\actions\\handler.js'), 'finance/actions/handler.js')
  resolveStoreModules(require('..\\store\\finance\\getters\\handler.js'), 'finance/getters/handler.js')
  resolveStoreModules(require('..\\store\\finance\\mutations\\handler.js'), 'finance/mutations/handler.js')
  resolveStoreModules(require('..\\store\\finance\\state\\handler.js'), 'finance/state/handler.js')
  resolveStoreModules(require('..\\store\\forms\\actions\\handler.js'), 'forms/actions/handler.js')
  resolveStoreModules(require('..\\store\\forms\\getters\\handler.js'), 'forms/getters/handler.js')
  resolveStoreModules(require('..\\store\\forms\\mutations\\handler.js'), 'forms/mutations/handler.js')
  resolveStoreModules(require('..\\store\\forms\\state\\handler.js'), 'forms/state/handler.js')
  resolveStoreModules(require('..\\store\\metatrader\\actions\\handler.js'), 'metatrader/actions/handler.js')
  resolveStoreModules(require('..\\store\\metatrader\\getters\\handler.js'), 'metatrader/getters/handler.js')
  resolveStoreModules(require('..\\store\\metatrader\\mutations\\handler.js'), 'metatrader/mutations/handler.js')
  resolveStoreModules(require('..\\store\\metatrader\\state\\handler.js'), 'metatrader/state/handler.js')
  resolveStoreModules(require('..\\store\\partners\\actions\\handler.js'), 'partners/actions/handler.js')
  resolveStoreModules(require('..\\store\\partners\\getters\\handler.js'), 'partners/getters/handler.js')
  resolveStoreModules(require('..\\store\\partners\\mutations\\handler.js'), 'partners/mutations/handler.js')
  resolveStoreModules(require('..\\store\\partners\\state\\handler.js'), 'partners/state/handler.js')
  resolveStoreModules(require('..\\store\\profile\\actions\\handler.js'), 'profile/actions/handler.js')
  resolveStoreModules(require('..\\store\\profile\\getters\\handler.js'), 'profile/getters/handler.js')
  resolveStoreModules(require('..\\store\\profile\\mutations\\handler.js'), 'profile/mutations/handler.js')
  resolveStoreModules(require('..\\store\\profile\\state\\handler.js'), 'profile/state/handler.js')
  resolveStoreModules(require('..\\store\\symbols\\getters\\handler.js'), 'symbols/getters/handler.js')
  resolveStoreModules(require('..\\store\\symbols\\state\\all.js'), 'symbols/state/all.js')
  resolveStoreModules(require('..\\store\\symbols\\state\\commodities.js'), 'symbols/state/commodities.js')
  resolveStoreModules(require('..\\store\\symbols\\state\\country.js'), 'symbols/state/country.js')
  resolveStoreModules(require('..\\store\\symbols\\state\\crypto.js'), 'symbols/state/crypto.js')
  resolveStoreModules(require('..\\store\\symbols\\state\\currency.js'), 'symbols/state/currency.js')
  resolveStoreModules(require('..\\store\\symbols\\state\\emojis.js'), 'symbols/state/emojis.js')
  resolveStoreModules(require('..\\store\\symbols\\state\\epa.js'), 'symbols/state/epa.js')
  resolveStoreModules(require('..\\store\\symbols\\state\\language.js'), 'symbols/state/language.js')
  resolveStoreModules(require('..\\store\\symbols\\state\\nasdaq.js'), 'symbols/state/nasdaq.js')
  resolveStoreModules(require('..\\store\\symbols\\state\\nyse.js'), 'symbols/state/nyse.js')
  resolveStoreModules(require('..\\store\\symbols\\state\\stock.js'), 'symbols/state/stock.js')
  resolveStoreModules(require('..\\store\\traders\\actions\\handler.js'), 'traders/actions/handler.js')
  resolveStoreModules(require('..\\store\\traders\\getters\\handler.js'), 'traders/getters/handler.js')
  resolveStoreModules(require('..\\store\\traders\\mutations\\handler.js'), 'traders/mutations/handler.js')
  resolveStoreModules(require('..\\store\\traders\\state\\handler.js'), 'traders/state/handler.js')
  resolveStoreModules(require('..\\store\\trading\\actions\\handler.js'), 'trading/actions/handler.js')
  resolveStoreModules(require('..\\store\\trading\\getters\\handler.js'), 'trading/getters/handler.js')
  resolveStoreModules(require('..\\store\\trading\\getters\\trading.js'), 'trading/getters/trading.js')
  resolveStoreModules(require('..\\store\\trading\\mutations\\handler.js'), 'trading/mutations/handler.js')
  resolveStoreModules(require('..\\store\\trading\\state\\handler.js'), 'trading/state/handler.js')
  resolveStoreModules(require('..\\store\\trading\\mutations\\socket\\account.js'), 'trading/mutations/socket/account.js')
  resolveStoreModules(require('..\\store\\trading\\mutations\\socket\\balance.js'), 'trading/mutations/socket/balance.js')
  resolveStoreModules(require('..\\store\\trading\\mutations\\socket\\instrument.js'), 'trading/mutations/socket/instrument.js')
  resolveStoreModules(require('..\\store\\trading\\mutations\\socket\\investment.js'), 'trading/mutations/socket/investment.js')
  resolveStoreModules(require('..\\store\\trading\\mutations\\socket\\quote.js'), 'trading/mutations/socket/quote.js')
  resolveStoreModules(require('..\\store\\trading\\mutations\\socket\\trade.js'), 'trading/mutations/socket/trade.js')

  // If the environment supports hot reloading...

  if (process.client && module.hot) {
    // Whenever any Vuex module is updated...
    module.hot.accept([
      '..\\store\\index.js',
      '..\\store\\socket.js',
      '..\\store\\analytics\\actions\\handler.js',
      '..\\store\\analytics\\getters\\handler.js',
      '..\\store\\analytics\\mutations\\handler.js',
      '..\\store\\analytics\\state\\handler.js',
      '..\\store\\chat\\actions\\handler.js',
      '..\\store\\chat\\getters\\handler.js',
      '..\\store\\chat\\mutations\\handler.js',
      '..\\store\\chat\\state\\handler.js',
      '..\\store\\dictionaries\\actions\\auth.js',
      '..\\store\\dictionaries\\actions\\handler.js',
      '..\\store\\dictionaries\\getters\\handler.js',
      '..\\store\\dictionaries\\getters\\user.js',
      '..\\store\\dictionaries\\mutations\\handler.js',
      '..\\store\\dictionaries\\mutations\\user.js',
      '..\\store\\dictionaries\\state\\handler.js',
      '..\\store\\dictionaries\\state\\language.js',
      '..\\store\\dictionaries\\state\\user.js',
      '..\\store\\education\\actions\\handler.js',
      '..\\store\\education\\getters\\handler.js',
      '..\\store\\education\\mutations\\handler.js',
      '..\\store\\education\\state\\handler.js',
      '..\\store\\finance\\actions\\handler.js',
      '..\\store\\finance\\getters\\handler.js',
      '..\\store\\finance\\mutations\\handler.js',
      '..\\store\\finance\\state\\handler.js',
      '..\\store\\forms\\actions\\handler.js',
      '..\\store\\forms\\getters\\handler.js',
      '..\\store\\forms\\mutations\\handler.js',
      '..\\store\\forms\\state\\handler.js',
      '..\\store\\metatrader\\actions\\handler.js',
      '..\\store\\metatrader\\getters\\handler.js',
      '..\\store\\metatrader\\mutations\\handler.js',
      '..\\store\\metatrader\\state\\handler.js',
      '..\\store\\partners\\actions\\handler.js',
      '..\\store\\partners\\getters\\handler.js',
      '..\\store\\partners\\mutations\\handler.js',
      '..\\store\\partners\\state\\handler.js',
      '..\\store\\profile\\actions\\handler.js',
      '..\\store\\profile\\getters\\handler.js',
      '..\\store\\profile\\mutations\\handler.js',
      '..\\store\\profile\\state\\handler.js',
      '..\\store\\symbols\\getters\\handler.js',
      '..\\store\\symbols\\state\\all.js',
      '..\\store\\symbols\\state\\commodities.js',
      '..\\store\\symbols\\state\\country.js',
      '..\\store\\symbols\\state\\crypto.js',
      '..\\store\\symbols\\state\\currency.js',
      '..\\store\\symbols\\state\\emojis.js',
      '..\\store\\symbols\\state\\epa.js',
      '..\\store\\symbols\\state\\language.js',
      '..\\store\\symbols\\state\\nasdaq.js',
      '..\\store\\symbols\\state\\nyse.js',
      '..\\store\\symbols\\state\\stock.js',
      '..\\store\\traders\\actions\\handler.js',
      '..\\store\\traders\\getters\\handler.js',
      '..\\store\\traders\\mutations\\handler.js',
      '..\\store\\traders\\state\\handler.js',
      '..\\store\\trading\\actions\\handler.js',
      '..\\store\\trading\\getters\\handler.js',
      '..\\store\\trading\\getters\\trading.js',
      '..\\store\\trading\\mutations\\handler.js',
      '..\\store\\trading\\state\\handler.js',
      '..\\store\\trading\\mutations\\socket\\account.js',
      '..\\store\\trading\\mutations\\socket\\balance.js',
      '..\\store\\trading\\mutations\\socket\\instrument.js',
      '..\\store\\trading\\mutations\\socket\\investment.js',
      '..\\store\\trading\\mutations\\socket\\quote.js',
      '..\\store\\trading\\mutations\\socket\\trade.js',
    ], () => {
      // Update `root.modules` with the latest definitions.
      updateModules()
      // Trigger a hot update in the store.
      window.$nuxt.$store.hotUpdate(store)
    })
  }
})()

// createStore
export const createStore = store instanceof Function ? store : () => {
  return new Vuex.Store(Object.assign({
    strict: (process.env.NODE_ENV !== 'production')
  }, store))
}

function normalizeRoot (moduleData, filePath) {
  moduleData = moduleData.default || moduleData

  if (moduleData.commit) {
    throw new Error(`[nuxt] ${filePath} should export a method that returns a Vuex instance.`)
  }

  if (typeof moduleData !== 'function') {
    // Avoid TypeError: setting a property that has only a getter when overwriting top level keys
    moduleData = Object.assign({}, moduleData)
  }
  return normalizeModule(moduleData, filePath)
}

function normalizeModule (moduleData, filePath) {
  if (moduleData.state && typeof moduleData.state !== 'function') {
    console.warn(`'state' should be a method that returns an object in ${filePath}`)

    const state = Object.assign({}, moduleData.state)
    // Avoid TypeError: setting a property that has only a getter when overwriting top level keys
    moduleData = Object.assign({}, moduleData, { state: () => state })
  }
  return moduleData
}

function resolveStoreModules (moduleData, filename) {
  moduleData = moduleData.default || moduleData
  // Remove store src + extension (./foo/index.js -> foo/index)
  const namespace = filename.replace(/\.(js|mjs)$/, '')
  const namespaces = namespace.split('/')
  let moduleName = namespaces[namespaces.length - 1]
  const filePath = `store/${filename}`

  moduleData = moduleName === 'state'
    ? normalizeState(moduleData, filePath)
    : normalizeModule(moduleData, filePath)

  // If src is a known Vuex property
  if (VUEX_PROPERTIES.includes(moduleName)) {
    const property = moduleName
    const propertyStoreModule = getStoreModule(store, namespaces, { isProperty: true })

    // Replace state since it's a function
    mergeProperty(propertyStoreModule, moduleData, property)
    return
  }

  // If file is foo/index.js, it should be saved as foo
  const isIndexModule = (moduleName === 'index')
  if (isIndexModule) {
    namespaces.pop()
    moduleName = namespaces[namespaces.length - 1]
  }

  const storeModule = getStoreModule(store, namespaces)

  for (const property of VUEX_PROPERTIES) {
    mergeProperty(storeModule, moduleData[property], property)
  }

  if (moduleData.namespaced === false) {
    delete storeModule.namespaced
  }
}

function normalizeState (moduleData, filePath) {
  if (typeof moduleData !== 'function') {
    console.warn(`${filePath} should export a method that returns an object`)
    const state = Object.assign({}, moduleData)
    return () => state
  }
  return normalizeModule(moduleData, filePath)
}

function getStoreModule (storeModule, namespaces, { isProperty = false } = {}) {
  // If ./mutations.js
  if (!namespaces.length || (isProperty && namespaces.length === 1)) {
    return storeModule
  }

  const namespace = namespaces.shift()

  storeModule.modules[namespace] = storeModule.modules[namespace] || {}
  storeModule.modules[namespace].namespaced = true
  storeModule.modules[namespace].modules = storeModule.modules[namespace].modules || {}

  return getStoreModule(storeModule.modules[namespace], namespaces, { isProperty })
}

function mergeProperty (storeModule, moduleData, property) {
  if (!moduleData) {
    return
  }

  if (property === 'state') {
    storeModule.state = moduleData || storeModule.state
  } else {
    storeModule[property] = Object.assign({}, storeModule[property], moduleData)
  }
}
