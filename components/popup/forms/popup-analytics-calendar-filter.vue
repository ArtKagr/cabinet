<template>
  <div class="popup-trades_history">
    <div class="popup-trades_history-head -traders-ranges">
      <span class="popup-trades_history-head-name m-0" :class="`-${dir}`" v-text="$t('Фильтр')" />
    </div>
    <div class="popup-traders_ranges-body">
      <div class="d-flex flex-column">
        <div class="d-flex flex-column mb-4">
          <span
            class="text-secondary-14 font-weight-500 user-select-none mb-2"
            :class="isRtlMode ? 'text-right' : ''"
            v-text="$t('Тип')"
          />
          <div class="d-flex align-items-center flex-wrap w-100" :class="isRtlMode ? 'justify-content-end' : ''">
            <div
              v-for="(item, key) in analyticsDataFilter.priority"
              :key="key"
              class="analytics-filter-chip d-flex align-items-center"
              :class="[item.is_active ? '-active' : '', `-${dir}`]"
              @click="updateAnalyticsFilter('priority', item.flag)"
            >
              <lfx-calendar-priority v-if="!isRtlMode" :priority="Number(item.flag)" />
              <span class="text-dark-primary-13" :class="isRtlMode ? 'mr-2' : 'ml-2'" v-text="priority[key]" />
              <lfx-calendar-priority v-if="isRtlMode" :priority="Number(item.flag)" />
            </div>
          </div>
        </div>
        <div class="d-flex flex-column">
          <span
            class="text-secondary-14 font-weight-500 user-select-none mb-2"
            :class="isRtlMode ? 'text-right' : ''"
            v-text="$t('Страна')"
          />
          <div class="d-flex align-items-center flex-wrap">
            <div
              v-for="(country, key) in countries"
              :key="key"
              class="analytics-filter-chip d-flex align-items-center"
              :class="[country[2] ? '-active' : '', `-${dir}`]"
              @click="updateAnalyticsFilter('countries', country[0])"
            >
              <lfx-symbol-country :symbol="country[0]" class="mr-2" />
              <span class="text-dark-primary-13" v-text="country[1]" />
            </div>
          </div>
        </div>
        <div class="d-flex align-items-center mx-auto mt-4 w-60">
          <b-button v-if="!isRtlMode" class="w-50 mr-2" variant="primary" @click="setFilter" v-text="$t('Применить')" />
          <b-button class="w-50" variant="outline-primary" @click="clearFilter" v-text="$t('Сбросить')" />
          <b-button v-if="isRtlMode" class="w-50 ml-2" variant="primary" @click="setFilter" v-text="$t('Применить')" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LfxSymbolCountry from '@/components/_aux/lfx-symbol-country'
import LfxCalendarPriority from '@/components/_aux/lfx-calendar-priority'
export default {
  name: 'PopupAnalyticsCalendarFilter',
  components: { LfxSymbolCountry, LfxCalendarPriority },
  data () {
    return {
      activePeriod: null
    }
  },
  computed: {
    priority () {
      return this.isRtlMode
        ? [
            this.$t('Низкий'),
            this.$t('Средний'),
            this.$t('Высокий')
          ]
        : [
            this.$t('Высокий'),
            this.$t('Средний'),
            this.$t('Низкий')
          ]
    },
    countries () {
      return this.$store.getters['analytics/getters/handler/getAnalyticsCountriesList']
    },
    analyticsDataFilter () {
      return this.$store.getters['analytics/getters/handler/getAnalyticsDataFilter']
    },
    countriesList () {
      return this.$store.getters['analytics/getters/handler/getAnalyticsCountriesList']
    },
    isRtlMode () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode']
    },
    dir () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode'] ? 'rtl' : 'ltr'
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
      this.$store.dispatch('analytics/actions/handler/fetchAnalyticsCalendar')
      this.togglePopup(false)
    },
    async clearFilter () {
      await this.$store.commit('analytics/mutations/handler/CLEAR_ANALYTICS_FILTER', {
        rootData: this.$store.state.analytics.state.handler,
        data: { fields: ['priority', 'countries'] }
      })
      await this.$store.dispatch('analytics/actions/handler/fetchAnalyticsCalendar')
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
