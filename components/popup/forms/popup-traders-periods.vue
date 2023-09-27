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
        <span :class="isRtlMode ? 'w-100 text-right' : ''" v-text="period.title" />
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
  name: 'PopupTradersPeriods',
  components: { LfxIconCheckMark },
  data () {
    return {
      changedPeriod: null
    }
  },
  computed: {
    dir () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode'] ? 'rtl' : 'ltr'
    },
    isRtlMode () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode']
    },
    periods () {
      return [
        { title: this.$t('1 день'), flag: '1d' },
        { title: this.$t('7 дней'), flag: '7d' },
        { title: this.$t('1 месяц'), flag: '1m' },
        { title: this.$t('3 месяца'), flag: '3m' },
        { title: this.$t('6 месяцев'), flag: '6m' },
        { title: this.$t('1 год'), flag: '1y' },
        { title: this.$t('Всё время'), flag: 'all' }
      ]
    },
    activePeriod () {
      return this.$store.getters['traders/getters/handler/getActivePeriod']
    },
    tradersDataManage () {
      return this.$store.getters['traders/getters/handler/getTradersFilter']
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
      localStorage.setItem('traders_period', this.changedPeriod)
      localStorage.removeItem('traders_filter_settings')
      this.$store.commit('traders/mutations/handler/SAVE_ACTIVE_TRADERS_PERIOD', {
        data: this.changedPeriod,
        rootData: this.$store.state.traders.state.handler
      })
      this.$store.commit('traders/mutations/handler/UPDATE_TRADERS_FILTER', {
        data: { period: this.changedPeriod },
        rootData: this.$store.state.traders.state.handler
      })
      if (this.tradersDataManage.period) {
        this.$store.dispatch('traders/actions/handler/fetchTraders')
      }
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
