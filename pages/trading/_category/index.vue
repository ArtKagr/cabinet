<template>
  <div v-if="viewMode === 'cards'" class="d-flex flex-wrap">
    <card
      v-for="(instrument, key) in activeTradingCards"
      :key="key"
      :card="instrument"
    />
  </div>
  <div v-else class="d-flex w-100">
    <lfx-table-trading class="w-100" :items="activeTradingCards" />
  </div>
</template>

<script>
import Card from '~/components/trading/card/card.vue'
import LfxTableTrading from '~/components/tables/lfx-table-trading'
export default {
  name: 'InstrumentsList',
  components: { LfxTableTrading, Card },
  props: {
    isDefaultPage: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    activeTradingCards () {
      return this.$store.getters['trading/getters/trading/getTradingCards'][this.categoryNumber]
    },
    viewMode () {
      return this.$store.getters['trading/getters/handler/getTradingViewMode']
    },
    routePages () {
      return this.$store.getters['dictionaries/getters/handler/getRoutePages']
    },
    categoryNumber () {
      return this.isDefaultPage ? 1 : this.$trading.getCategoryNumber(this.routePages.current)
    }
  },
  destroyed () {
    this.$store.commit('trading/mutations/handler/SAVE_ACTIVE_VOLUME_INPUT', {
      data: null,
      rootData: this.$store.state.trading.state.handler
    })
  }
}
</script>
