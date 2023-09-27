<template>
  <div class="d-flex flex-column px-4 mt-2 overflow-auto" :style="windowWidth > 1200 ? 'max-width: 66%' : 'max-width: 100%'">
    <div v-for="item in analyticsRates" :key="item.id" class="d-flex flex-column mb-1">
      <div
        v-if="windowWidth > 767"
        class="d-flex align-items-center bg-white border-light-secondary pointer user-select-none"
        style="padding: 15px"
        @click="toggleRatesDescription(item.id)"
      >
        <span class="text-dark-primary-13 w-30" :class="isRtlMode ? 'text-right' : ''" v-text="item.countryTitle" />
        <div class="d-flex align-items-center" style="flex: 1">
          <lfx-symbol-country :symbol="item.country" :class="isRtlMode ? 'ml-2' : 'mr-2'" />
          <span class="text-dark-primary-13" v-text="item.name" />
        </div>
        <div class="d-flex align-items-center">
          <span class="text-dark-primary-20" :class="isRtlMode ? 'ml-4' : 'mr-4'" v-text="Object.values(item.ratesShort)[0]" />
          <span class="text-secondary-13" v-text="Object.keys(item.ratesShort)[0]" />
        </div>
      </div>
      <div
        v-else
        class="d-flex justify-content-between bg-white border-light-secondary pointer user-select-none"
        style="padding: 15px 20px"
        @click="toggleRatesDescription(item.id)"
      >
        <div class="d-flex flex-column">
          <span class="text-dark-primary-13 mb-2" :class="isRtlMode ? 'text-right' : ''" v-text="item.countryTitle" />
          <div class="d-flex align-items-center mb-1">
            <lfx-symbol-country :symbol="item.country" :class="isRtlMode ? 'ml-2' : 'mr-2'" />
            <span class="text-dark-primary-13" v-text="item.name" />
          </div>
          <span class="text-dark-primary-20" :class="isRtlMode ? 'text-right' : ''" v-text="Object.values(item.ratesShort)[0]" />
        </div>
        <span class="text-secondary-13" v-text="Object.keys(item.ratesShort)[0]" />
      </div>
      <div
        v-if="item.is_shown"
        class="d-flex flex-column w-100"
        style="padding: 15px 20px 0 20px; background-color: #f4f6f9; border-left: 1px solid #d9dce1; border-right: 1px solid #d9dce1; border-bottom: 1px solid #d9dce1;"
      >
        <div v-for="(rate, key) in item.ratesShort" :key="key" class="d-flex align-items-center w-100 mb-3">
          <span class="text-dark-primary-13 text-right" :class="isRtlMode ? 'ml-4' : 'mr-4'" style="width: 120px; flex: 1;" v-text="rate" />
          <span class="text-secondary-13" style="width: 70px" v-text="key" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LfxSymbolCountry from '~/components/_aux/lfx-symbol-country'
export default {
  name: 'AnalyticsInterestRates',
  components: {
    LfxSymbolCountry
  },
  computed: {
    analyticsRates () {
      return this.$store.getters['analytics/getters/handler/getAnalyticsRates']
    },
    windowWidth () {
      return Number(this.$store.getters['dictionaries/getters/handler/getCurrentNumberWindowWidth'])
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
  created () {
    this.$store.dispatch('analytics/actions/handler/fetchAnalyticsInterestRates')
  },
  methods: {
    toggleRatesDescription (ratesId) {
      this.$store.commit('analytics/mutations/handler/TOGGLE_INTEREST_RATES', {
        rootData: this.$store.state.analytics.state.handler,
        data: ratesId
      })
    }
  }
}
</script>
