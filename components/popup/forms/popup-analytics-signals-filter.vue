<template>
  <div class="popup-trades_history">
    <div class="popup-trades_history-head -traders-ranges">
      <span class="popup-trades_history-head-name m-0" :class="`-${dir}`" v-text="$t('Фильтр')" />
    </div>
    <div class="popup-traders_ranges-body">
      <div class="d-flex flex-column">
        <div class="d-flex flex-column">
          <span
            class="text-secondary-14 font-weight-500 user-select-none mb-2 w-100"
            :class="isRtlMode ? 'text-right' : ''"
            v-text="$t('Рекомендация')"
          />
          <div class="d-flex align-items-center flex-wrap" :class="isRtlMode ? 'justify-content-end' : ''">
            <span
              v-for="(signal, key) in analyticsDataFilterSignals"
              :key="key"
              class="analytics-filter-chip"
              :class="[`-${signal.flag}`, signal.is_active ? '-active' : '', `-${dir}`]"
              @click="updateAnalyticsFilter('signals', signal.flag)"
              v-text="signals[key]"
            />
          </div>
        </div>
        <div class="d-flex align-items-center mx-auto mt-4 w-60">
          <b-button class="w-50 mr-2" :class="isRtlMode ? 'ml-2' : 'mr-2'" variant="primary" @click="setFilter" v-text="$t('Применить')" />
          <b-button class="w-50" variant="outline-primary" @click="clearFilter" v-text="$t('Сбросить')" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PopupAnalyticsSignalsFilter',
  computed: {
    isRtlMode () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode']
    },
    dir () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode'] ? 'rtl' : 'ltr'
    },
    signals () {
      const titles = [
        this.$t('Активно продавать'),
        this.$t('Продавать'),
        this.$t('Подождать'),
        this.$t('Покупать'),
        this.$t('Активно покупать')
      ]
      return this.isRtlMode ? titles.reverse() : titles
    },
    analyticsDataFilter () {
      return this.$store.getters['analytics/getters/handler/getAnalyticsDataFilter']
    },
    analyticsDataFilterSignals () {
      const result = [...this.$store.getters['analytics/getters/handler/getAnalyticsDataFilter'].signals]
      return this.isRtlMode ? result.reverse() : result
    }
  },
  methods: {
    togglePopup (value) {
      this.$store.commit('dictionaries/mutations/handler/TOGGLE_POPUP', {
        rootData: this.$store.state.dictionaries.state.handler,
        data: value
      })
    },
    setFilter () {
      this.$store.dispatch('analytics/actions/handler/fetchAnalyticsSignals')
      this.togglePopup(false)
    },
    async clearFilter () {
      await this.$store.commit('analytics/mutations/handler/CLEAR_ANALYTICS_FILTER', { rootData: this.$store.state.analytics.state.handler, data: { field: 'signals' } })
      await this.$store.dispatch('analytics/actions/handler/fetchAnalyticsSignals')
      this.togglePopup(false)
    },
    updateAnalyticsFilter (field, flag) {
      this.$store.commit('analytics/mutations/handler/UPDATE_ANALYTICS_FILTER', {
        rootData: this.$store.state.analytics.state.handler,
        data: { field, flag }
      })
    }
  }
}
</script>
