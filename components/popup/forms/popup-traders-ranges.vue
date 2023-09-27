<template>
  <div class="popup-trades_history">
    <div class="popup-trades_history-head -traders-ranges">
      <span class="popup-trades_history-head-name m-0" :class="`-${dir}`" v-text="$t('Выбор трейдера')" />
    </div>
    <div class="popup-traders_ranges-body">
      <div class="d-flex flex-column w-100">
        <div class="d-flex w-100" :class="windowWidth === 'sm' ? 'flex-column' : 'align-items-center'">
          <div class="d-flex flex-column" :class="windowWidth === 'sm' ? 'w-100 m-0' : `w-50 ${isRtlMode ? '' : 'mr-4'}`">
            <div class="d-flex flex-column w-100 mt-2">
              <div class="d-flex align-items-center justify-content-between w-100">
                <span class="text-secondary-10 text-uppercase" v-text="$t(fields.profit.title)" />
                <span class="text-dark-primary-18" v-text="`${valuesProfit[0]} - ${valuesProfit[1]}${fields.profit.label}`" />
              </div>
              <vue-range-slider
                v-model="valuesProfit"
                :reverse="!!isRtlMode"
                :min="profit[0]"
                :max="profit[1]"
                :step="fields.profit.step"
                :tooltip-style="{ display: 'none' }"
                @drag-end="dragEndHandler('profit')"
              />
            </div>
            <div class="d-flex flex-column w-100 mt-4">
              <div class="d-flex align-items-center justify-content-between w-100">
                <span class="text-secondary-10 text-uppercase" v-text="$t(fields.days.title)" />
                <span class="text-dark-primary-18" v-text="$t(`${valuesDays}${fields.days.label}`)" />
              </div>
              <vue-range-slider
                v-model="valuesDays"
                class="inverse-color-slider"
                :reverse="!!isRtlMode"
                :min="0"
                :max="days"
                :step="fields.days.step"
                :tooltip-style="{ display: 'none' }"
                @drag-end="dragEndHandler('days')"
              />
            </div>
            <div class="d-flex flex-column w-100 mt-4">
              <div class="d-flex align-items-center justify-content-between w-100">
                <span class="text-secondary-10 text-uppercase" v-text="$t(fields.investors_count.title)" />
                <span class="text-dark-primary-18" v-text="valuesInvestorsCount" />
              </div>
              <vue-range-slider
                v-model="valuesInvestorsCount"
                class="inverse-color-slider"
                :reverse="!!isRtlMode"
                :min="0"
                :max="investorsCount"
                :step="fields.investors_count.step"
                :tooltip-style="{ display: 'none' }"
                @drag-end="dragEndHandler('investors_count')"
              />
            </div>
            <div class="d-flex flex-column w-100 mt-4">
              <div class="d-flex align-items-center justify-content-between w-100">
                <span class="text-secondary-10 text-uppercase" v-text="$t(fields.risk.title)" />
                <span class="text-dark-primary-18" v-text="valuesRisk" />
              </div>
              <vue-range-slider
                v-model="valuesRisk"
                :reverse="!!isRtlMode"
                :min="0"
                :max="risk"
                :step="fields.risk.step"
                :tooltip-style="{ display: 'none' }"
                :process-style="{ backgroundColor: riskBarStyle[valuesRisk] }"
                @drag-end="dragEndHandler('risk')"
              />
            </div>
          </div>
          <div class="d-flex flex-column" :class="windowWidth === 'sm' ? 'w-100' : `w-50 ${isRtlMode ? 'mr-4' : ''}`">
            <div class="d-flex flex-column w-100 mt-2">
              <div class="d-flex align-items-center justify-content-between w-100">
                <span class="text-secondary-10 text-uppercase" v-text="$t(fields.profit_sharing.title)" />
                <bdi class="text-dark-primary-18" v-text="`${valuesProfitSharing} ${fields.profit_sharing.label}`" />
              </div>
              <vue-range-slider
                v-model="valuesProfitSharing"
                :reverse="!!isRtlMode"
                :min="0"
                :max="profitSharing"
                :step="fields.profit_sharing.step"
                :tooltip-style="{ display: 'none' }"
                @drag-end="dragEndHandler('profit_sharing')"
              />
            </div>
            <div class="d-flex flex-column w-100 mt-4">
              <div class="d-flex align-items-center justify-content-between w-100">
                <span class="text-secondary-10 text-uppercase" v-text="$t(fields.trader_equity.title)" />
                <bdi class="text-dark-primary-18" v-text="`${valuesTraderEquity} ${fields.trader_equity.label}`" />
              </div>
              <vue-range-slider
                v-model="valuesTraderEquity"
                class="inverse-color-slider"
                :reverse="!!isRtlMode"
                :min="0"
                :max="traderEquity"
                :step="fields.trader_equity.step"
                :tooltip-style="{ display: 'none' }"
                @drag-end="dragEndHandler('trader_equity')"
              />
            </div>
            <div class="d-flex flex-column w-100 mt-4">
              <div class="d-flex align-items-center justify-content-between w-100">
                <span class="text-secondary-10 text-uppercase" v-text="$t(fields.investors_equity.title)" />
                <bdi class="text-dark-primary-18" v-text="`${valuesInvestorsEquity} ${fields.investors_equity.label}`" />
              </div>
              <vue-range-slider
                v-model="valuesInvestorsEquity"
                class="inverse-color-slider"
                :reverse="!!isRtlMode"
                :min="0"
                :max="investorsEquity"
                :step="fields.investors_equity.step"
                :tooltip-style="{ display: 'none' }"
                @drag-end="dragEndHandler('investors_equity')"
              />
            </div>
            <div v-if="countries && countries.length" class="d-flex flex-column w-100 mt-4">
              <span class="text-secondary-10 text-uppercase mb-1 w-100" :class="isRtlMode ? 'text-right' : ''" v-text="$t('Регион')" />
              <field-select
                :key="keySlider"
                v-model="valuesCountry"
                :values="countries"
                :is-countries="true"
                :is-search-hidden="true"
                @change="setCountry"
              />
            </div>
          </div>
        </div>
        <span class="text-primary-14 text-center pointer mt-4 -link" @click="resetFilter" v-text="$t('Сбросить настройки фильтра')" />
        <span class="text-secondary-12 text-center mt-4 user-select-none">
          <span class="text-secondary-12 text-center mt-4 user-select-none" v-html="$t('Выбранным критериям соответствует <strong>{count}</strong> трейдеров')" />
        </span>
        <div class="d-flex justify-content-center mt-3">
          <b-button class="px-4" variant="primary" @click="clickHandler" v-text="$t('Применить')" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueRangeSlider from 'vue-range-component'
import 'vue-range-component/dist/vue-range-slider.css'
import FieldSelect from '~/components/modal/fields/field-select'
export default {
  name: 'PopupTradersRanges',
  components: { FieldSelect, VueRangeSlider },
  data () {
    return {
      names: ['profit', 'days', 'investors_count', 'risk', 'profit_sharing', 'trader_equity', 'investors_equity'],
      //
      valuesProfit: [0, 0],
      valuesDays: 0,
      valuesInvestorsCount: 0,
      valuesRisk: 0,
      valuesProfitSharing: 0,
      valuesTraderEquity: 0,
      valuesInvestorsEquity: 0,
      valuesCountry: '',
      //
      profit: [0, 0],
      days: 0,
      investorsCount: 0,
      risk: 0,
      profitSharing: 0,
      traderEquity: 0,
      investorsEquity: 0,
      //
      riskBarStyle: {
        1: '#64dd17',
        2: '#64dd17',
        3: '#aeea00',
        4: '#c6ff00',
        5: '#fff700',
        6: '#ffd600',
        7: '#ffab00',
        8: '#ff9100',
        9: '#ff6d00',
        10: '#ff3d00'
      },
      isRegionsListOpened: false,
      keySlider: null
    }
  },
  computed: {
    windowWidth () {
      return this.$store.getters['dictionaries/getters/handler/getCurrentWindowWidth']
    },
    isRtlMode () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode']
    },
    dir () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode'] ? 'rtl' : 'ltr'
    },
    tradersSorting () {
      return this.$store.getters['traders/getters/handler/getActiveTradersSorting']
    },
    tradersPeriod () {
      return this.$store.getters['traders/getters/handler/getActivePeriod']
    },
    tradersCountFilters () {
      return this.$store.getters['traders/getters/handler/getTradersCount'].filters
    },
    tradersCount () {
      return this.$store.getters['traders/getters/handler/getTradersCount'].count
    },
    tradersFilter () {
      return this.$store.getters['traders/getters/handler/getTradersFilter']
    },
    fields () {
      return this.tradersCountFilters.reduce((acc, field) => {
        acc[field.name] = field
        return acc
      }, {})
    },
    countries () {
      return Object.entries(this.fields.country.items).map(item => ({ text: item[1], value: item[0] }))
    },
    filters () {
      return {
        sort: this.tradersSorting,
        period: this.tradersPeriod,
        'filter[profit][from]': this.valuesProfit[0],
        'filter[profit][to]': this.valuesProfit[1],
        'filter[days][from]': this.valuesDays,
        'filter[investors_count][from]': this.valuesInvestorsCount,
        'filter[risk][to]': this.valuesRisk,
        'filter[profit_sharing][to]': this.valuesProfitSharing,
        'filter[trader_equity][from]': this.valuesTraderEquity,
        'filter[investors_equity][from]': this.valuesInvestorsEquity,
        'filter[country]': this.valuesCountry
      }
    }
  },
  created () {
    this.keySlider = this.setRandomKey()
    const values = localStorage.getItem('traders_filter_settings')
    this.updateRanges()

    if (values) {
      this.initValues(JSON.parse(values))
    } else {
      this.updateValues()
    }
  },
  methods: {
    togglePopup (value) {
      this.$store.commit('dictionaries/mutations/handler/TOGGLE_POPUP', {
        rootData: this.$store.state.dictionaries.state.handler,
        data: value
      })
    },
    setRandomKey () {
      return Math.floor(Math.random() * 1000000)
    },
    fetchTradersCount (filter) {
      this.$store.dispatch('traders/actions/handler/fetchTradersCount', filter)
    },
    initValues (values) {
      this.valuesProfit = values.profit
      this.valuesDays = values.days
      this.valuesInvestorsCount = values.investors_count
      this.valuesRisk = values.risk
      this.valuesProfitSharing = values.profit_sharing
      this.valuesTraderEquity = values.trader_equity
      this.valuesInvestorsEquity = values.investors_equity
      this.valuesCountry = values.country
    },
    updateValues () {
      this.valuesProfit = [Number(this.fields.profit.min), Number(this.fields.profit.max)]
      this.valuesDays = Number(this.fields.days.min)
      this.valuesInvestorsCount = Number(this.fields.investors_count.min)
      this.valuesRisk = Number(this.fields.risk.max)
      this.valuesProfitSharing = Number(this.fields.profit_sharing.max)
      this.valuesTraderEquity = Number(this.fields.trader_equity.min)
      this.valuesInvestorsEquity = Number(this.fields.investors_equity.min)
      this.valuesCountry = ''
    },
    updateRanges () {
      this.profit = [Number(this.fields.profit.min), Number(this.fields.profit.max)]
      this.days = Number(this.fields.days.max)
      this.investorsCount = Number(this.fields.investors_count.max)
      this.risk = Number(this.fields.risk.max)
      this.profitSharing = Number(this.fields.profit_sharing.max)
      this.traderEquity = Number(this.fields.trader_equity.max)
      this.investorsEquity = Number(this.fields.investors_equity.max)
    },
    async resetFilter () {
      await this.fetchTradersCount({ page: 1, period: this.tradersPeriod, sort: this.tradersSorting })
      await this.updateRanges()
      await this.updateValues()
      this.keySlider = this.setRandomKey()
    },
    clickHandler () {
      localStorage.setItem('traders_filter_settings', JSON.stringify({
        profit: this.valuesProfit,
        days: this.valuesDays,
        investors_count: this.valuesInvestorsCount,
        risk: this.valuesRisk,
        profit_sharing: this.valuesProfitSharing,
        trader_equity: this.valuesTraderEquity,
        investors_equity: this.valuesInvestorsEquity,
        country: this.valuesCountry
      }))
      this.$store.commit('traders/mutations/handler/UPDATE_TRADERS_FILTER', {
        rootData: this.$store.state.traders.state.handler,
        data: this.filters
      })
      this.$store.dispatch('traders/actions/handler/fetchTraders')
      this.togglePopup(false)
    },
    async dragEndHandler () {
      await this.fetchTradersCount(this.filters)
      await this.updateRanges()
    },
    setCountry (value) {
      this.valuesCountry = value
      this.fetchTradersCount(this.filters)
    }
  }
}
</script>
<style lang="scss">
  .popup-traders_ranges-body {
    padding: 20px;
  }
  .inverse-color-slider {
    .slider-piecewise {
      border-radius: 15px !important;
      background-color: #3498db !important;
    }
    .slider-process {
      border-radius: 15px !important;
      background-color: #ccc !important;
    }
  }
</style>
