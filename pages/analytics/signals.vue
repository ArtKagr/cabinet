<template>
  <div class="d-flex flex-column" :style="windowWidthNumber > 1200 ? 'max-width: 85%' : 'max-width: 100%'">
    <div
      class="d-flex w-100 mb-4"
      :class="windowWidthNumber > 1500 ? 'justify-content-between px-4' : windowWidthNumber < 1100 ? 'pl-0 pr-2' : 'flex-column px-4'"
    >
      <lfx-menu
        v-if="windowWidthNumber > 1100"
        :menu="menu"
        :active-item="activeItem"
        source="analytics-signals"
        class="p-0 mb-2"
        :class="isRtlMode ? 'pr-2' : 'pl-2'"
        no-route
        static-menu
        marginless
        @click-handler="clickHandler"
      />
      <div class="d-flex" :class="windowWidthNumber > 1500 ? '' : 'd-flex align-items-center w-100 justify-content-between'">
        <div class="d-flex align-items-center pl-2" :class="windowWidthNumber <= 768 ? 'mt-3' : ''">
          <lfx-filter-select
            :title="$t('Период')"
            :items="signalPeriods"
            :active-flag="activeSignalPeriod"
            :width="70"
            class="ml-0"
            @click-handler="updateSignalPeriod"
          />
<!--          <lfx-filter-select-->
<!--            v-if="windowWidthNumber <= 1100"-->
<!--            :title="$t('Категория')"-->
<!--            :items="menu"-->
<!--            :active-flag="activeItem"-->
<!--            :width="180"-->
<!--            @click-handler="clickHandler"-->
<!--          />-->
        </div>
        <div class="mt-auto">
          <b-button variant="outline-secondary" @click="showPopup('analytics-signals-filter')">
            <lfx-icon-filter class="icon-secondary" :class="isRtlMode ? 'ml-2' : 'mr-2'" />
            <span v-text="$t('Фильтр')" />
          </b-button>
        </div>
      </div>
    </div>
    <div :class="windowWidthNumber > 1100 ? 'px-4' : 'px-2'">
      <lfx-table-analytics-signals v-if="windowWidthNumber > 1100" :items="analyticsSignals" />
      <div v-else class="d-flex flex-column overflow-auto">
        <div v-for="item in analyticsSignals" :key="item.id" style="padding: 10px" class="d-flex flex-column bg-white border-light-secondary mb-2">
          <div class="d-flex align-items-center justify-content-between w-100 mb-2">
            <div class="d-flex align-items-center">
              <span class="text-dark-primary-13" :class="isRtlMode ? 'ml-3' : 'mr-3'" v-text="moment(item.date_time).format('HH:mm')" />
              <lfx-symbol :small="true" :symbol="item.pair" :class="isRtlMode ? 'ml-2' : 'mr-2'" />
              <span class="text-primary-13" v-text="item.symbol" />
            </div>
            <div class="d-flex align-items-center">
              <span :class="`text-uppercase -${item.recommendations} ${isRtlMode ? 'ml-2' : 'mr-2'} mt-1`" v-text="getRecommendationsTitle(item.recommendations)" />
              <div class="lfx-table-body-favorite">
                <lfx-icon-star v-if="item.favorite" class="pointer" @click.native="toggleFavorite($event, false, item.symbol)" />
                <lfx-icon-star-empty v-else class="pointer" @click.native="toggleFavorite($event, true, item.symbol)" />
              </div>
            </div>
          </div>
          <div v-if="windowWidthNumber > 767" class="d-flex align-items-center justify-content-between w-100">
            <div class="d-flex flex-column">
              <span class="text-secondary-11 mb-1" v-text="'MA10'" />
              <lfx-signal-indicator :indicator="item.ma10" />
            </div>
            <div class="d-flex flex-column">
              <span class="text-secondary-11 mb-1" v-text="'MA20'" />
              <lfx-signal-indicator :indicator="item.ma20" />
            </div>
            <div class="d-flex flex-column">
              <span class="text-secondary-11 mb-1" v-text="'MA50'" />
              <lfx-signal-indicator :indicator="item.ma50" />
            </div>
            <div class="d-flex flex-column">
              <span class="text-secondary-11 mb-1" v-text="'MA100'" />
              <lfx-signal-indicator :indicator="item.ma100" />
            </div>
            <div class="d-flex flex-column">
              <span class="text-secondary-11 mb-1" v-text="'MACD'" />
              <lfx-signal-indicator :indicator="item.macd" />
            </div>
            <div class="d-flex flex-column">
              <span class="text-secondary-11 mb-1" v-text="'BBands'" />
              <lfx-signal-indicator :indicator="item.bbands" />
            </div>
            <div class="d-flex flex-column">
              <span class="text-secondary-11 mb-1" v-text="'Ichimoku'" />
              <lfx-signal-indicator :indicator="item.ichimoku" />
            </div>
            <div class="d-flex flex-column">
              <span class="text-secondary-11 mb-1" v-text="'Stochastic'" />
              <lfx-signal-indicator :indicator="item.stochastic" />
            </div>
            <div class="d-flex flex-column">
              <span class="text-secondary-11 mb-1" v-text="'William`s'" />
              <lfx-signal-indicator :indicator="item.williams" />
            </div>
            <div class="d-flex flex-column">
              <span class="text-secondary-11 mb-1" v-text="'ZigZag'" />
              <lfx-signal-indicator :indicator="item.zigzag" />
            </div>
          </div>
          <div v-else class="d-flex flex-column w-100">
            <div class="d-flex align-items-center justify-content-between w-100 mb-3">
              <div class="d-flex flex-column">
                <span class="text-secondary-11 mb-1" v-text="'MA10'" />
                <lfx-signal-indicator :indicator="item.ma10" />
              </div>
              <div class="d-flex flex-column">
                <span class="text-secondary-11 mb-1" v-text="'MA20'" />
                <lfx-signal-indicator :indicator="item.ma20" />
              </div>
              <div class="d-flex flex-column">
                <span class="text-secondary-11 mb-1" v-text="'MA50'" />
                <lfx-signal-indicator :indicator="item.ma50" />
              </div>
              <div class="d-flex flex-column">
                <span class="text-secondary-11 mb-1" v-text="'MA100'" />
                <lfx-signal-indicator :indicator="item.ma100" />
              </div>
              <div class="d-flex flex-column">
                <span class="text-secondary-11 mb-1" v-text="'MACD'" />
                <lfx-signal-indicator :indicator="item.macd" />
              </div>
            </div>
            <div class="d-flex align-items-center justify-content-between w-100">
              <div class="d-flex flex-column">
                <span class="text-secondary-11 mb-1" v-text="'BBands'" />
                <lfx-signal-indicator :indicator="item.bbands" />
              </div>
              <div class="d-flex flex-column">
                <span class="text-secondary-11 mb-1" v-text="'Ichimoku'" />
                <lfx-signal-indicator :indicator="item.ichimoku" />
              </div>
              <div class="d-flex flex-column">
                <span class="text-secondary-11 mb-1" v-text="'Stochastic'" />
                <lfx-signal-indicator :indicator="item.stochastic" />
              </div>
              <div class="d-flex flex-column">
                <span class="text-secondary-11 mb-1" v-text="'William`s'" />
                <lfx-signal-indicator :indicator="item.williams" />
              </div>
              <div class="d-flex flex-column">
                <span class="text-secondary-11 mb-1" v-text="'ZigZag'" />
                <lfx-signal-indicator :indicator="item.zigzag" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LfxMenu from '~/components/_aux/lfx-menu'
import LfxIconStar from '~/components/icons/lfx-icon-star'
import LfxIconStarEmpty from '~/components/icons/lfx-icon-star-empty'
import LfxIconFilter from '~/components/icons/lfx-icon-filter'
import LfxTableAnalyticsSignals from '~/components/tables/lfx-table-analytics-signals'
import LfxSignalIndicator from '~/components/_aux/lfx-signal-indicator'
import LfxSymbol from '~/components/_aux/lfx-symbol'
import LfxFilterSelect from '~/components/_aux/lfx-filter-select.vue'
export default {
  name: 'AnalyticsSignals',
  components: {
    LfxFilterSelect,
    LfxSymbol,
    LfxSignalIndicator,
    LfxTableAnalyticsSignals,
    LfxIconFilter,
    LfxIconStarEmpty,
    LfxIconStar,
    LfxMenu
  },
  computed: {
    windowWidthNumber () {
      return this.$store.getters['dictionaries/getters/handler/getCurrentNumberWindowWidth']
    },
    isRtlMode () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode']
    },
    menu () {
      // Меню страницы "Аналитика/Сигналы"
      return [
        { title: this.$t('Избранное'), route: null, flag: 'favorite' },
        { title: this.$t('Валюты'), route: null, flag: 'currency' },
        { title: this.$t('Криптовалюты'), route: null, flag: 'crypto' },
        { title: this.$t('Сырье'), route: null, flag: 'commodities' },
        { title: this.$t('Акции {exchange_name}', { exchange_name: 'NYSE' }), route: null, flag: 'cfd-nyse' },
        { title: this.$t('Акции {exchange_name}', { exchange_name: 'NASDAQ' }), route: null, flag: 'cfd-nasdaq' },
        { title: this.$t('Акции {exchange_name}', { exchange_name: 'EU' }), route: null, flag: 'cfd-epa' },
        { title: this.$t('Биржевые индексы'), route: null, flag: 'index' }
      ]
    },
    analyticsSignals () {
      return this.$store.getters['analytics/getters/handler/getAnalyticsSignals']
    },
    activeTimeZone () {
      return this.$store.getters['analytics/getters/handler/getActiveTimeZone']
    },
    activeItem () {
      return this.$store.getters['analytics/getters/handler/getActiveSignalsMenuItem']
    },
    activeSignalPeriod () {
      return this.$store.getters['analytics/getters/handler/getActiveSignalPeriod']
    },
    signalPeriods () {
      return this.$store.getters['analytics/getters/handler/getSignalPeriods']
    },
    sortingStyle () {
      return {
        padding: '4px'
      }
    }
  },
  watch: {
    async activeItem () {
      await this.$store.dispatch('analytics/actions/handler/fetchAnalyticsSignals')
    },
    async activeSignalPeriod () {
      await this.$store.dispatch('analytics/actions/handler/fetchAnalyticsSignals')
    }
  },
  created () {
    this.$store.dispatch('analytics/actions/handler/fetchAnalyticsSignals')
  },
  async destroyed () {
    await this.$store.commit('analytics/mutations/handler/CLEAR_ANALYTICS_FILTER', {
      rootData: this.$store.state.analytics.state.handler,
      data: { field: 'signals' }
    })
  },
  methods: {
    showPopup (popupName) {
      this.$store.dispatch('dictionaries/actions/handler/showPopup', popupName)
    },
    toggleFavorite (e, flag, payload) {
      e.stopPropagation()
      this.$store.dispatch('analytics/actions/handler/toggleFavoriteSignal', payload)
    },
    clickHandler (value) {
      this.$store.commit('analytics/mutations/handler/UPDATE_ACTIVE_SIGNALS_MENU_ITEM', {
        rootData: this.$store.state.analytics.state.handler,
        data: value
      })
    },
    updateSignalPeriod (value) {
      this.$store.commit('analytics/mutations/handler/UPDATE_ACTIVE_SIGNAL_PERIOD', {
        rootData: this.$store.state.analytics.state.handler,
        data: value
      })
    },
    getRecommendationsTitle (title) {
      let result
      switch (title) {
        case 'sell_active':
          result = this.$t('Активно продавать')
          break
        case 'sell':
          result = this.$t('Продавать')
          break
        case 'neutral':
          result = this.$t('Подождать')
          break
        case 'buy_active':
          result = this.$t('Активно покупать')
          break
        case 'buy':
          result = this.$t('Покупать')
          break
      }
      return result
    }
  }
}
</script>
