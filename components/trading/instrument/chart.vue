<template>
  <div class="d-flex">
    <chart
      v-if="instrument && instrument.symbol_original"
      source="chart"
      :instrument="instrument"
    />
    <settings v-if="instrument && instrument.symbol_original" :instrument="instrument" source="instrument" />
    <div v-if="windowWidth === 'sm'" class="w-100" style="margin-top: 4px; padding: 10px;">
      <b-button class="w-100 text-white-14" variant="primary" v-text="$t('Открыть сделку')" />
    </div>
  </div>
</template>

<script>
import Settings from '~/components/chart/trading/settings.vue'
import Chart from '~/components/chart/chart'
export default {
  name: 'TradingChart',
  components: {
    Chart,
    Settings
  },
  props: {
    instrument: {
      type: Object,
      default: () => {
        return {
          symbol_original: null
        }
      }
    }
  },
  computed: {
    windowWidth () {
      return this.$store.getters['dictionaries/getters/handler/getCurrentTradingWindowWidth']
    },
    routePages () {
      return this.$store.getters['dictionaries/getters/handler/getRoutePages']
    },
    dir () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode'] ? 'rtl' : 'ltr'
    }
  },
  created () {
    setTimeout(() => this.toggleChartShown(true), 10)
  },
  methods: {
    toggleChartShown (flag) {
      this.$store.commit('dictionaries/mutations/handler/TOGGLE_CHART_SHOWN_FLAG', {
        rootData: this.$store.state.dictionaries.state.handler,
        data: flag
      })
    }
  }
}
</script>
