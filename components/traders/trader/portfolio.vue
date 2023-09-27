<template>
  <lfx-table-trader-portfolio v-if="traderInfo && traderInfo.length" :items="traderInfo" @open-trader-chart="openTraderChart" />
  <span v-else :style="{ fontSize: '20px', color: '#5f6875', textAlign: isRtlMode ? 'right' : 'left' }" v-text="$t('У трейдера еще нет текущих открытых сделок.')" />
</template>

<script>
import LfxTableTraderPortfolio from '@/components/tables/lfx-table-trader-portfolio'
export default {
  name: 'Portfolio',
  components: { LfxTableTraderPortfolio },
  computed: {
    routePages () {
      return this.$store.getters['dictionaries/getters/handler/getRoutePages']
    },
    traderInfo () {
      return this.$store.getters['traders/getters/handler/getTraderInfo'].list
    },
    isRtlMode () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode']
    },
    dir () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode'] ? 'rtl' : 'ltr'
    }
  },
  async created () {
    if (this.routePages.second && this.routePages.current) {
      await this.$store.dispatch('traders/actions/handler/fetchCurrentTrader', this.routePages.second)
      await this.$store.dispatch('traders/actions/handler/fetchCurrentTraderPortfolio', this.routePages.second)
    } else {
      await this.$store.dispatch('traders/actions/handler/fetchCurrentTrader', this.routePages.current)
      await this.$store.dispatch('traders/actions/handler/fetchCurrentTraderPortfolio', this.routePages.current)
    }
  },
  methods: {
    openTraderChart () {
      this.$emit('open-trader-chart')
    }
  }
}
</script>
