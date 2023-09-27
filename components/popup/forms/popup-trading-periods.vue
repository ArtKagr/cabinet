<template>
  <div class="popup-trades_history">
    <div class="popup-trades_history-head">
      <span class="popup-trades_history-head-name m-0" :class="`-${dir}`" v-text="$t('Период')" />
    </div>
    <div class="popup-card-display-body">
      <div
        v-for="period in periods"
        :key="period.flag"
        class="d-flex align-items-center text-secondary-14 pointer py-3 px-4 border-top-light_secondary"
        :class="[period.flag === changedPeriod ? 'active_tab' : `${isRtlMode ? 'padding_right' : 'padding_left'}`, isRtlMode ? 'justify-content-end' : '']"
        @click="updatePeriod(period.flag)"
      >
        <lfx-icon-check-mark v-if="period.flag === changedPeriod" :class="isRtlMode ? 'ml-3' : 'mr-3'" />
        <span :class="isRtlMode ? 'w-100 text-right' : ''" v-text="period.description" />
      </div>
    </div>
    <div class="popup-card-display-body-button">
      <b-button class="w-100" variant="primary" @click="savePeriod" v-text="$t('Применить')" />
    </div>
  </div>
</template>

<script>
import LfxIconCheckMark from '~/components/icons/lfx-icon-check-mark'
export default {
  name: 'PopupTradingPeriods',
  components: { LfxIconCheckMark },
  data () {
    return {
      changedPeriod: null
    }
  },
  computed: {
    isRtlMode () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode']
    },
    dir () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode'] ? 'rtl' : 'ltr'
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
      return this.$store.getters['trading/getters/handler/getTradingPeriod']
    }
  },
  created () {
    this.changedPeriod = this.activePeriod
  },
  methods: {
    togglePopup (value) {
      this.$store.commit('dictionaries/mutations/handler/TOGGLE_POPUP', {
        rootData: this.$store.state.dictionaries.state.handler,
        data: value
      })
    },
    updatePeriod (period) {
      this.changedPeriod = period
    },
    savePeriod () {
      localStorage.setItem('trading_statistics_period', this.changedPeriod)
      this.$store.dispatch('trading/actions/handler/tradingStatistics', this.changedPeriod)
      this.togglePopup(false)
    }
  }
}
</script>
<style lang="scss" scoped>
.padding_left {
  padding-left: 60px !important;
}
.padding_right {
  padding-right: 60px !important;
}
.active_tab {
  background-color: #3498db;
  color: white;
}
</style>
