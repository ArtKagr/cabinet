<template>
  <div
    class="d-flex align-items-center justify-content-between"
    :class="filterViewMode === 'filters' && windowWidth === 'sm' ? 'w-100' : ''"
  >
    <!-- desktop -->
    <div v-if="windowWidth !== 'sm'" class="lfx-settings-filter">
      <lfx-filter-select
        :title="$t('Сортировка')"
        :items="sorting"
        :active-flag="activeSorting"
        :width="source === 'trading' ? 147 : 202"
        @click-handler="updateSort"
      />
      <lfx-filter-select
        :title="$t('Период')"
        :items="periods"
        :active-flag="activePeriod"
        :is-uppercase="true"
        :width="source === 'trading' ? 70 : 115"
        @click-handler="updatePeriod"
      />
      <lfx-icon-settings
        v-if="activeViewMode === 'cards'"
        class="icon-gray pointer"
        :class="isRtlMode ? 'ml-1' : 'mr-1'"
        @click.native="showPopup(`${source}-card-display`)"
      />
      <lfx-icon-list
        v-if="activeViewMode === 'cards'"
        class="icon-gray pointer"
        @click.native="toggleViewMode('table')"
      />
      <lfx-icon-tiles
        v-else
        class="icon-gray pointer"
        @click.native="toggleViewMode('cards')"
      />
    </div>
    <!-- mobile -->
    <div v-else-if="filterViewMode === 'dots'" class="d-flex align-items-center mr-2">
      <div class="trading_sort_badge" :class="isRtlMode ? 'ml-2' : 'mr-2'">
        <lfx-icon-chart class="mr-1" />
        <span v-text="activePeriodDescription" />
      </div>
      <lfx-icon-dots class="pointer" @click.native="showFilters('filters')" />
    </div>
    <div v-else class="d-flex align-items-center justify-content-between w-100 mb-2">
      <div class="d-flex align-items-center">
        <lfx-icon-calendar
          class="icon-gray pointer"
          :class="isRtlMode ? 'ml-4' : 'mr-4'"
          @click.native="showPopup(`${source}-periods`)"
        />
        <lfx-icon-sorting
          class="icon-gray pointer"
          :class="isRtlMode ? 'ml-4 mr-2' : 'mr-4 ml-2'"
          @click.native="showPopup(`${source}-sorting`)"
        />
        <lfx-icon-settings
          v-if="activeViewMode === 'cards'"
          class="icon-gray pointer"
          :class="isRtlMode ? 'ml-4' : 'mr-4'"
          @click.native="showPopup(`${source}-card-display`)"
        />
        <lfx-icon-list
          v-if="activeViewMode === 'cards'"
          class="icon-gray pointer"
          @click.native="toggleViewMode('table')"
        />
        <lfx-icon-tiles
          v-else
          class="icon-gray pointer"
          @click.native="toggleViewMode('cards')"
        />
      </div>
      <lfx-icon-close
        class="modal-container-head-close"
        @click.native="showFilters('dots')"
      />
    </div>
  </div>
</template>

<script>
import LfxIconSettings from '~/components/icons/lfx-icon-settings'
import LfxIconList from '~/components/icons/lfx-icon-list'
import LfxIconTiles from '~/components/icons/lfx-icon-tiles'
import LfxIconChart from '~/components/icons/lfx-icon-chart'
import LfxIconDots from '~/components/icons/lfx-icon-dots'
import LfxIconCalendar from '~/components/icons/lfx-icon-calendar'
import LfxIconSorting from '~/components/icons/lfx-icon-sorting'
import LfxIconClose from '~/components/icons/lfx-icon-close'
import LfxFilterSelect from '~/components/_aux/lfx-filter-select.vue'
export default {
  name: 'Settings',
  components: {
    LfxFilterSelect,
    LfxIconSettings,
    LfxIconList,
    LfxIconTiles,
    LfxIconChart,
    LfxIconDots,
    LfxIconCalendar,
    LfxIconSorting,
    LfxIconClose
  },
  props: {
    source: {
      type: String,
      default: null
    },
    sorting: {
      type: Array,
      default: () => []
    },
    periods: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      activeSorting: null,
      activePeriod: null,
      filterViewMode: 'dots'
    }
  },
  computed: {
    routePages () {
      return this.$store.getters['dictionaries/getters/handler/getRoutePages']
    },
    isRtlMode () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode']
    },
    windowWidth () {
      return this.$store.getters['dictionaries/getters/handler/getCurrentWindowWidth']
    },
    activeViewMode () {
      if (this.source === 'trading') {
        return this.$store.getters['trading/getters/handler/getTradingViewMode']
      } else {
        return this.$store.getters['traders/getters/handler/getTraderViewMode']
      }
    },
    activePeriodDescription () {
      return this.periods.find(period => period.flag === this.activePeriod).description
    },
    tradersFilterRequest () {
      return this.$store.getters['traders/getters/handler/getTradersFilter']
    },
    tradersSorting () {
      return this.$store.getters['traders/getters/handler/getActiveTradersSorting']
    },
    tradingSorting () {
      return this.$store.getters['trading/getters/handler/getActiveTradeSorting']
    },
    tradingPeriod () {
      return this.$store.getters['trading/getters/handler/getTradingPeriod']
    },
    tradersPeriod () {
      return this.$store.getters['traders/getters/handler/getActivePeriod']
    }
  },
  watch: {
    tradersSorting (newValue) {
      if (this.source === 'traders') {
        this.activeSorting = newValue
      }
    },
    tradingSorting (newValue) {
      if (this.source === 'trading') {
        this.activeSorting = newValue
      }
    },
    tradersPeriod (newValue) {
      if (this.source === 'traders') {
        this.activePeriod = newValue
      }
    },
    tradingPeriod (newValue) {
      if (this.source === 'trading') {
        this.activePeriod = newValue
      }
    }
  },
  created () {
    if (this.source === 'trading') {
      this.activeSorting = this.tradingSorting
      this.activePeriod = this.tradingPeriod
    } else {
      this.activeSorting = this.tradersSorting
      this.activePeriod = this.tradersPeriod
    }
  },
  methods: {
    showPopup (popupName) {
      this.$store.dispatch('dictionaries/actions/handler/showPopup', popupName)
    },
    showFilters (flag) {
      this.filterViewMode = flag
      this.$emit('toggle-filter-mode', flag)
    },
    toggleViewMode (mode) {
      this.source === 'trading' ? this.toggleTradingViewMode(mode) : this.toggleTradersViewMode(mode)
    },
    updateSort (sort) {
      this.source === 'trading' ? this.updateTradingSort(sort) : this.updateTradersSort(sort)
    },
    updatePeriod (period) {
      this.source === 'trading' ? this.updateTradingPeriod(period) : this.updateTradersPeriod(period)
    },
    //
    //
    //
    fetchTraders () {
      this.$store.dispatch('traders/actions/handler/fetchTraders')
    },
    toggleTradingViewMode (mode) {
      localStorage.setItem('trading_view_mode', mode)
      this.$store.commit('trading/mutations/handler/TOGGLE_TRADING_VIEW_MODE', {
        data: mode,
        rootData: this.$store.state.trading.state.handler
      })
    },
    toggleTradersViewMode (mode) {
      localStorage.setItem('trader_view_mode', mode)
      this.$store.commit('traders/mutations/handler/TOGGLE_TRADER_VIEW_MODE', {
        data: mode,
        rootData: this.$store.state.traders.state.handler
      })
    },
    updateTradingSort (sort) {
      this.activeSorting = sort
      this.$store.dispatch('trading/actions/handler/tradingCardsSort', sort)
    },
    updateTradersSort (sort) {
      this.activeSorting = sort
      localStorage.setItem('traders_sorting', sort)
      this.updateTradersFilter('sort', sort)
      if (this.tradersFilterRequest.sort) {
        if (this.routePages.current !== 'favorite') {
          this.$router.push(`/${this.routePages.locale}/traders/${sort.replace(/_/gi, '-')}`)
          this.$store.commit('dictionaries/mutations/handler/SET_ACTIVE_MENU_LINKS_ITEM', {
            rootData: this.$store.state.dictionaries.state.handler,
            data: sort
          })
        }
        this.fetchTraders()
      }
    },
    updateTradingPeriod (period) {
      this.activePeriod = period
      localStorage.setItem('trading_statistics_period', period)
      this.$store.dispatch('trading/actions/handler/tradingStatistics', period)
    },
    updateTradersPeriod (period) {
      this.activePeriod = period
      localStorage.setItem('traders_period', period === 'all' ? '' : period)
      localStorage.removeItem('traders_filter_settings')
      this.updateTradersFilter('period', period === 'all' ? '' : period)
      this.$store.commit('traders/mutations/handler/SAVE_ACTIVE_TRADERS_PERIOD', {
        rootData: this.$store.state.traders.state.handler,
        data: period
      })
      if (this.tradersFilterRequest.period || period === 'all') {
        this.fetchTraders()
      }
    },
    updateTradersFilter (field, value) {
      this.$store.commit('traders/mutations/handler/UPDATE_TRADERS_FILTER', {
        rootData: this.$store.state.traders.state.handler,
        data: { [field]: value }
      })
    }
  }
}
</script>
