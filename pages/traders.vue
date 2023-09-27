<template>
  <div class="traders">
    <lfx-menu-links
      v-if="!isCurrentTrader && !routePages.second"
      :title="filterViewMode === 'filters' && windowWidth === 'sm' ? '' : $t('Трейдеры')"
      :menu="menu"
      source="traders"
      :no-margin-title="true"
      @click-handler="clickHandler"
    >
      <template v-if="routePages.current !== 'favorite'" #button>
        <b-button :class="isRtlMode ? 'mr-3' : 'ml-3'" variant="outline-primary" @click="showPopup('traders-ranges')">
          <lfx-icon-filter class="icon-primary" :class="isRtlMode ? 'ml-2' : 'mr-2'" />
          <span v-text="$t('Выбрать')" />
        </b-button>
      </template>
      <template #settings>
        <settings
          source="traders"
          :sorting="sorting"
          :periods="periods"
          @toggle-filter-mode="toggleFilterMode"
        />
      </template>
    </lfx-menu-links>
    <traders-list v-if="pages.includes(routePages.current)" :class="[viewMode === 'cards' ? '' : '-table', `trading-page -${dir}`]" />
    <current-trader v-else />
  </div>
</template>

<script>
import Settings from '~/components/trading/settings.vue'
import LfxIconFilter from '~/components/icons/lfx-icon-filter'
import LfxMenuLinks from '~/components/_aux/lfx-menu-links'
import TradersList from '~/pages/traders/_name'
import CurrentTrader from '~/pages/traders/_id'
export default {
  name: 'Traders',
  components: {
    CurrentTrader,
    TradersList,
    LfxMenuLinks,
    LfxIconFilter,
    Settings
  },
  data () {
    return {
      filterViewMode: 'dots',
      pages: ['favorite', 'total-equity', 'profit', 'investors-count', 'date', 'risk']
    }
  },
  head () {
    return {
      title: this.$store.getters['dictionaries/getters/handler/getHeadTitle'](`${this.$t('Трейдеры')} | ${this.$t('Социальный Трейдинг')}`)
    }
  },
  computed: {
    dir () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode'] ? 'rtl' : 'ltr'
    },
    isRtlMode () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode']
    },
    routePages () {
      return this.$store.getters['dictionaries/getters/handler/getRoutePages']
    },
    windowWidth () {
      return this.$store.getters['dictionaries/getters/handler/getCurrentWindowWidth']
    },
    traders () {
      return this.$store.getters['traders/getters/handler/getTraders']
    },
    isAuthUser () {
      return this.$store.getters['dictionaries/getters/user/getIsAuthUser']
    },
    isDemoTour () {
      return this.$store.getters['dictionaries/getters/user/isDemoTour']
    },
    menu () {
      // Меню страницы "Копировать"
      return this.isAuthUser || this.isDemoTour
        ? [
            { title: this.$t('Избранное'), route: 'favorite', flag: 'favorite', description: this.$t('Избранное') },
            { title: this.$t('Популярные'), route: 'total-equity', flag: 'total_equity', description: this.$t('Средства в управлении') },
            { title: this.$t('Высокая доходность'), route: 'profit', flag: 'profit', description: this.$t('Доходность') },
            { title: this.$t('Кол-во копирующих'), route: 'investors-count', flag: 'investors_count', description: this.$t('Кол-во копирующих') },
            { title: this.$t('Срок торговли'), route: 'date', flag: 'date', description: this.$t('Срок торговли') },
            { title: this.$t('Минимальный риск'), route: 'risk', flag: 'risk', description: this.$t('Уровень риска') }
          ]
        : [
            { title: this.$t('Популярные'), route: 'total-equity', flag: 'total_equity', description: this.$t('Средства в управлении') },
            { title: this.$t('Высокая доходность'), route: 'profit', flag: 'profit', description: this.$t('Доходность') },
            { title: this.$t('Кол-во копирующих'), route: 'investors-count', flag: 'investors_count', description: this.$t('Кол-во копирующих') },
            { title: this.$t('Срок торговли'), route: 'date', flag: 'date', description: this.$t('Срок торговли') },
            { title: this.$t('Минимальный риск'), route: 'risk', flag: 'risk', description: this.$t('Уровень риска') }
          ]
    },
    sorting () {
      return [
        { title: this.$t('Средства в управлении'), flag: 'total_equity' },
        { title: this.$t('Доходность'), flag: 'profit' },
        { title: this.$t('Кол-во копирующих'), flag: 'investors_count' },
        { title: this.$t('Срок торговли'), flag: 'date' },
        { title: this.$t('Уровень риска'), flag: 'risk' }
      ]
    },
    periods () {
      return [
        { title: this.$t('1д'), flag: '1d', description: this.$t('1 день') },
        { title: this.$t('7д'), flag: '7d', description: this.$t('7 дней') },
        { title: this.$t('1м'), flag: '1m', description: this.$t('1 месяц') },
        { title: this.$t('3м'), flag: '3m', description: this.$t('3 месяца') },
        { title: this.$t('6м'), flag: '6m', description: this.$t('6 месяцев') },
        { title: this.$t('1г'), flag: '1y', description: this.$t('1 год') },
        { title: this.$t('Всё время'), flag: 'all', description: this.$t('Всё время') }
      ]
    },
    viewMode () {
      return this.$store.getters['traders/getters/handler/getTraderViewMode']
    },
    activeMenuItem () {
      return this.$store.getters['dictionaries/getters/handler/getActiveMenuItem']
    },
    isCurrentTrader () {
      return this.routePages.parent && this.routePages.current.match('^[0-9]+$')
    },
    tradersFilter () {
      return this.$store.getters['traders/getters/handler/getTradersFilter']
    },
    scrollBottom () {
      return this.$store.getters['dictionaries/getters/handler/getScrollBottom']
    },
    tradersSorting () {
      return this.$store.getters['traders/getters/handler/getActiveTradersSorting']
    },
    tradersPeriod () {
      return this.$store.getters['traders/getters/handler/getActivePeriod']
    }
  },
  watch: {
    scrollBottom (newValue) {
      if (newValue === 0 && this.traders.page_total > this.traders.page) {
        this.$store.dispatch('traders/actions/handler/fetchTraders', this.traders.page + 1)
      }
    }
  },
  mounted () {
    if (this.routePages.parent) {
      this.$store.commit('dictionaries/mutations/handler/SET_ACTIVE_MENU_LINKS_ITEM', {
        rootData: this.$store.state.dictionaries.state.handler,
        data: this.routePages.current
      })
    } else {
      this.$router.push(`/${this.routePages.locale}/trading/currency`)
      this.$store.commit('dictionaries/mutations/handler/SET_ACTIVE_MENU_LINKS_ITEM', {
        rootData: this.$store.state.dictionaries.state.handler,
        data: 'total-equity'
      })
    }
    if (this.routePages.parent && this.routePages.parent === 'traders') {
      this.$store.commit('traders/mutations/handler/SAVE_TRADERS_CURRENT_PAGE', {
        rootData: this.$store.state.traders.state.handler,
        data: 1
      })
    }
  },
  created () {
    localStorage.removeItem('traders_filter_settings')
    const activeViewMode = localStorage.getItem('trader_view_mode')
    if (activeViewMode) {
      this.$store.commit('traders/mutations/handler/TOGGLE_TRADER_VIEW_MODE', {
        data: activeViewMode,
        rootData: this.$store.state.traders.state.handler
      })
    }
    const tradersPeriod = localStorage.getItem('traders_period')
    if (tradersPeriod) {
      this.$store.commit('traders/mutations/handler/SAVE_ACTIVE_TRADERS_PERIOD', {
        data: tradersPeriod,
        rootData: this.$store.state.traders.state.handler
      })
      this.$store.commit('traders/mutations/handler/UPDATE_TRADERS_FILTER', {
        data: { period: tradersPeriod },
        rootData: this.$store.state.traders.state.handler
      })
    }
    const traderCardSettings = localStorage.getItem('trader_card_settings')
    if (traderCardSettings) {
      this.$store.commit('traders/mutations/handler/UPDATE_TRADER_CARD_SETTINGS', {
        data: JSON.parse(traderCardSettings),
        rootData: this.$store.state.traders.state.handler
      })
    }
    this.$store.dispatch('traders/actions/handler/fetchTradersCount', { sort: this.tradersSorting, period: this.tradersPeriod })
  },
  destroyed () {
    this.$store.commit('dictionaries/mutations/handler/SET_ACTIVE_MENU_LINKS_ITEM', {
      rootData: this.$store.state.dictionaries.state.handler,
      data: null
    })
  },
  methods: {
    showPopup (popupName) {
      this.$store.dispatch('dictionaries/actions/handler/showPopup', popupName)
    },
    clickHandler (flag) {
      if (flag !== 'favorite') {
        localStorage.setItem('traders_sorting', flag)
        this.$store.commit('traders/mutations/handler/UPDATE_TRADERS_FILTER', {
          data: { sort: flag, 'filter[favorite]': false },
          rootData: this.$store.state.traders.state.handler
        })
        this.$store.commit('traders/mutations/handler/SAVE_ACTIVE_TRADERS_SORTING', {
          data: flag,
          rootData: this.$store.state.traders.state.handler
        })
        if (this.tradersFilter.sort) {
          this.$store.dispatch('traders/actions/handler/fetchTraders')
        }
      } else {
        this.$store.commit('traders/mutations/handler/UPDATE_TRADERS_FILTER', {
          data: { 'filter[favorite]': true },
          rootData: this.$store.state.traders.state.handler
        })
        this.$store.dispatch('traders/actions/handler/fetchTraders')
      }
    },
    toggleFilterMode (flag) {
      this.filterViewMode = flag
    }
  }
}
</script>
<style lang="scss">
  .traders {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
  }
</style>
