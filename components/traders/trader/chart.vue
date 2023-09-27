<template>
  <div class="trading-page-instrument" :class="windowWidth === 'sm' ? 'flex-column' : ''">
    <chart
      v-if="currentTraderInvestment && currentTraderInvestment.username"
      class="trading-page-instrument-chart pb-0"
      source="chart-trader"
      :trader-user-name="currentTraderInvestment.username"
    />
    <settings v-if="currentTraderInvestment && currentTraderInvestment.user_id" />
  </div>
</template>

<script>
import Settings from '~/components/chart/traders/settings.vue'
import Chart from '~/components/chart/chart'
export default {
  name: 'ChartContainer',
  components: { Chart, Settings },
  computed: {
    windowWidth () {
      return this.$store.getters['dictionaries/getters/handler/getCurrentTradingWindowWidth']
    },
    currentTraderInvestment () {
      return this.$store.getters['traders/getters/handler/getCurrentTraderInvestment']
    },
    isRtlMode () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode']
    },
    routePages () {
      return this.$store.getters['dictionaries/getters/handler/getRoutePages']
    }
  },
  async created () {
    if (this.routePages.second && this.routePages.current) {
      await this.$store.dispatch('traders/actions/handler/fetchCurrentTrader', this.routePages.second)
    } else {
      await this.$store.dispatch('traders/actions/handler/fetchCurrentTrader', this.routePages.current)
    }
  }
}
</script>
