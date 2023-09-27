<template>
  <div class="popup-trades_history">
    <div class="popup-trades_history-head -traders-ranges">
      <span class="popup-trades_history-head-name m-0" :class="`-${dir}`" v-text="$t('Фильтр')" />
    </div>
    <div class="popup-traders_ranges-body">
      <div class="d-flex flex-column">
        <div class="d-flex flex-column mb-4">
          <span
            class="text-secondary-14 font-weight-500 user-select-none mb-2 w-100"
            :class="isRtlMode ? 'text-right' : ''"
            v-text="$t('Тип')"
          />
          <div class="d-flex align-items-center flex-wrap" :class="isRtlMode ? 'justify-content-end' : ''">
            <span
              v-for="(type, key) in analyticsDataFilterTypes"
              :key="key"
              class="analytics-filter-chip"
              :class="[type.is_active ? '-active' : '', `-${dir}`]"
              @click="updateAnalyticsFilter('types', type.flag)"
              v-text="types[key]"
            />
          </div>
        </div>
        <div class="d-flex flex-column">
          <span
            class="text-secondary-14 font-weight-500 user-select-none mb-2 w-100"
            :class="isRtlMode ? 'text-right' : ''"
            v-text="$t('Инструмент')"
          />
          <div class="d-flex align-items-center flex-wrap" :class="isRtlMode ? 'justify-content-end' : ''">
            <span
              v-for="(instrument, key) in analyticsDataFilterInstruments"
              :key="key"
              :class="[instrument.is_active ? '-active' : '', `-${dir}`]"
              class="analytics-filter-chip"
              @click="updateAnalyticsFilter('instruments', instrument.flag)"
              v-text="instruments[key]"
            />
          </div>
        </div>
        <div class="d-flex align-items-center mx-auto mt-4 w-60">
          <b-button class="w-50" :class="isRtlMode ? 'ml-2' : 'mr-2'" variant="primary" @click="setFilter" v-text="$t('Применить')" />
          <b-button class="w-50" variant="outline-primary" @click="clearFilter" v-text="$t('Сбросить')" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PopupAnalyticsFilter',
  computed: {
    isRtlMode () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode']
    },
    dir () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode'] ? 'rtl' : 'ltr'
    },
    types () {
      const titles = [
        this.$t('Технический анализ'),
        this.$t('Фундаментальный анализ')
      ]
      return this.isRtlMode ? titles.reverse() : titles
    },
    instruments () {
      const titles = [
        this.$t('Валюты'),
        this.$t('Криптовалюты'),
        this.$t('Сырье'),
        this.$t('Акции {exchange_name}', { exchange_name: 'NYSE' }),
        this.$t('Акции {exchange_name}', { exchange_name: 'NASDAQ' }),
        this.$t('Акции {exchange_name}', { exchange_name: 'EU' }),
        this.$t('Биржевые индексы')
      ]
      return this.isRtlMode ? titles.reverse() : titles
    },
    analyticsDataFilter () {
      return this.$store.getters['analytics/getters/handler/getAnalyticsDataFilter']
    },
    analyticsDataFilterTypes () {
      const result = [...this.$store.getters['analytics/getters/handler/getAnalyticsDataFilter'].types]
      return this.isRtlMode ? result.reverse() : result
    },
    analyticsDataFilterInstruments () {
      const result = [...this.$store.getters['analytics/getters/handler/getAnalyticsDataFilter'].instruments]
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
      this.$store.dispatch('analytics/actions/handler/fetchAnalyticsData')
      this.togglePopup(false)
    },
    async clearFilter () {
      await this.$store.commit('analytics/mutations/handler/CLEAR_ANALYTICS_FILTER', {
        rootData: this.$store.state.analytics.state.handler,
        data: { fields: ['types', 'instruments'] }
      })
      await this.$store.dispatch('analytics/actions/handler/fetchAnalyticsData')
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
