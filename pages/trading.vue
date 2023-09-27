<template>
  <div class="trading">
    <lfx-menu-links
      v-if="!routePages.second"
      :title="filterViewMode === 'filters' && windowWidth === 'sm' ? '' : $t('Торговые инструменты')"
      source="trading"
      :menu="actualMenu"
      @click-handler="clickHandler"
    >
      <template #settings>
        <settings
          source="trading"
          :sorting="sorting"
          :periods="periods"
          @toggle-filter-mode="toggleFilterMode"
        />
      </template>
    </lfx-menu-links>
    <current-instrument v-if="routePages.second" />
    <instruments-list v-else :class="[viewMode === 'cards' ? '' : '-table', `trading-page -${dir}`]" :is-default-page="isDefaultPage" />
  </div>
</template>

<script>
import Settings from '~/components/trading/settings.vue'
import LfxMenuLinks from '~/components/_aux/lfx-menu-links'
import InstrumentsList from '~/pages/trading/_category/index'
import CurrentInstrument from '~/pages/trading/_category/_instrument/index'
export default {
  name: 'Trading',
  components: {
    CurrentInstrument,
    InstrumentsList,
    LfxMenuLinks,
    Settings
  },
  props: {
    isDefaultPage: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      filterViewMode: 'dots'
    }
  },
  head () {
    return {
      title: this.$store.getters['dictionaries/getters/handler/getHeadTitle'](this.$t('Торговля'))
    }
  },
  computed: {
    menu () {
      return [
        { title: this.$t('Избранное'), route: 'favorite', flag: 'FAVORITE', category: 0 },
        { title: this.$t('Валюты'), route: 'currency', flag: 'CATEGORY_CURRENCY', category: 1 },
        { title: this.$t('Криптовалюты'), route: 'crypto', flag: 'CATEGORY_CRYPTO', category: 2 },
        { title: this.$t('Сырье'), route: 'commodities', flag: 'CATEGORY_COMMODITIES', category: 3 },
        { title: this.$t('Акции {exchange_name}', { exchange_name: 'NYSE' }), route: 'cfd-nyse', flag: 'CATEGORY_CFD_NYSE', category: 5 },
        { title: this.$t('Акции {exchange_name}', { exchange_name: 'NASDAQ' }), route: 'cfd-nasdaq', flag: 'CATEGORY_CFD_NASDAQ', category: 6 },
        { title: this.$t('Акции {exchange_name}', { exchange_name: 'EU' }), route: 'cfd-epa', flag: 'CATEGORY_CFD_EPA', category: 8 },
        { title: this.$t('Биржевые индексы'), route: 'stock-index', flag: 'CATEGORY_INDEX', category: 7 }
      ]
    },
    tradingCards () {
      return this.$store.getters['trading/getters/trading/getTradingCards']
    },
    actualCategories () {
      return Object.entries(this.$store.getters['trading/getters/trading/getTradingCards'])
        .filter(item => item[1].length > 0)
        .map(item => this.$trading.getCategoryName(item[0]))
    },
    actualMenu () {
      return this.menu.filter(item => this.actualCategories.includes(item.route))
    },
    isAuth () {
      return this.isAuthUser || this.isDemoTour
    },
    user () {
      return this.$store.getters['dictionaries/getters/user/getUser']
    },
    instrumentTypes () {
      return {
        CATEGORY_CURRENCY: 1,
        CATEGORY_CRYPTO: 2,
        CATEGORY_COMMODITIES: 3,
        CATEGORY_CFD_NYSE: 5,
        CATEGORY_CFD_NASDAQ: 6,
        CATEGORY_INDEX: 7,
        CATEGORY_CFD_EPA: 8,
        FAVORITE: 99
      }
    },
    periods () {
      return [
        { title: this.$t('1д'), flag: '1d', description: this.$t('1 день') },
        { title: this.$t('7д'), flag: '7d', description: this.$t('7 дней') },
        { title: this.$t('1м'), flag: '1m', description: this.$t('1 месяц') },
        { title: this.$t('3м'), flag: '3m', description: this.$t('3 месяца') },
        { title: this.$t('6м'), flag: '6m', description: this.$t('6 месяцев') },
        { title: this.$t('1г'), flag: '1y', description: this.$t('1 год') }
      ]
    },
    activePeriod () {
      return this.$store.getters['trading/getters/trading/getTrading'].period
    },
    sorting () {
      return [
        { title: this.$t('Название'), flag: 'name' },
        { title: this.$t('Популярность'), flag: 'popularity' },
        { title: this.$t('Волатильность'), flag: 'volatility' },
        { title: this.$t('Рост'), flag: 'rise' },
        { title: this.$t('Падение'), flag: 'fall' }
      ]
    },
    activeSorting () {
      return this.$store.getters['trading/getters/handler/getActiveTradeSorting']
    },
    activeViewMode () {
      return this.$store.getters['trading/getters/handler/getTradingViewMode']
    },
    windowWidth () {
      return this.$store.getters['dictionaries/getters/handler/getCurrentWindowWidth']
    },
    viewMode () {
      return this.$store.getters['trading/getters/handler/getTradingViewMode']
    },
    routePages () {
      return this.$store.getters['dictionaries/getters/handler/getRoutePages']
    },
    isAuthUser () {
      return this.$store.getters['dictionaries/getters/user/getIsAuthUser']
    },
    isDemoTour () {
      return this.$store.getters['dictionaries/getters/user/isDemoTour']
    },
    isEuAccount () {
      return this.$store.getters['dictionaries/getters/user/isEuAccount']
    },
    dir () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode'] ? 'rtl' : 'ltr'
    }
  },
  watch: {
    isAuth (newValue, oldValue) {
      if (newValue !== oldValue) {
        setTimeout(() => {
          if (this.routePages.parent) {
            this.$store.commit('dictionaries/mutations/handler/SET_ACTIVE_MENU_LINKS_ITEM', {
              rootData: this.$store.state.dictionaries.state.handler,
              data: this.routePages.current
            })
          }
        }, 100)
      }
    }
  },
  created () {
    const activeViewMode = localStorage.getItem('trading_view_mode')
    if (activeViewMode) {
      this.$store.commit('trading/mutations/handler/TOGGLE_TRADING_VIEW_MODE', {
        data: activeViewMode,
        rootData: this.$store.state.trading.state.handler
      })
    }
    const tradingCardSettings = localStorage.getItem('trading_card_settings')
    if (tradingCardSettings) {
      this.$store.commit('trading/mutations/handler/UPDATE_TRADING_CARD_SETTINGS', {
        data: JSON.parse(tradingCardSettings),
        rootData: this.$store.state.trading.state.handler
      })
    }
  },
  async mounted () {
    if (this.isDefaultPage) {
      await this.$store.commit('dictionaries/mutations/handler/SAVE_ACTIVE_MAIN_MENU_BUTTON', {
        rootData: this.$store.state.dictionaries.state.handler,
        data: 'trading'
      })
      this.$store.commit('dictionaries/mutations/handler/SET_ACTIVE_MENU_LINKS_ITEM', {
        rootData: this.$store.state.dictionaries.state.handler,
        data: 'currency'
      })
    } else if (this.routePages.parent) {
      await this.$store.commit('dictionaries/mutations/handler/SET_ACTIVE_MENU_LINKS_ITEM', {
        rootData: this.$store.state.dictionaries.state.handler,
        data: this.routePages.current
      })
    } else {
      await this.$router.push(`/${this.routePages.locale}/trading/currency`)
      this.$store.commit('dictionaries/mutations/handler/SET_ACTIVE_MENU_LINKS_ITEM', {
        rootData: this.$store.state.dictionaries.state.handler,
        data: 'currency'
      })
    }
  },
  methods: {
    showFilters (flag) {
      this.filterViewMode = flag
      this.$emit('toggle-filter-mode', flag)
    },
    clickHandler (item) {
      this.$store.commit('trading/mutations/handler/UPDATE_TRADING_CATEGORY', {
        data: this.instrumentTypes[item],
        rootData: this.$store.state.trading.state.handler
      })
    },
    toggleFilterMode (flag) {
      this.filterViewMode = flag
    }
  }
}
</script>
