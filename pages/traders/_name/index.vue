<template>
  <div v-if="viewMode === 'cards'" id="trader-date" class="d-flex flex-wrap">
    <card v-for="(trader, key) in traders" :key="`${trader.user_id}-${key}`" :card="trader" />
  </div>
  <div v-else id="trader-date-table" class="d-flex w-100">
    <lfx-table-traders class="w-100" source="traders" :items="traders" />
  </div>
</template>

<script>
import Card from '~/components/traders/card/card.vue'
import LfxTableTraders from '~/components/tables/lfx-table-traders'
export default {
  name: 'TradersList',
  components: { LfxTableTraders, Card },
  head () {
    return {
      title: this.$store.getters['dictionaries/getters/handler/getHeadTitle'](`${this.$t('Срок торговли')} | ${this.$t('Социальный Трейдинг')}`)
    }
  },
  computed: {
    traders () {
      return this.$store.getters['traders/getters/handler/getTraders'].data
    },
    tradersFilter () {
      return this.$store.getters['traders/getters/handler/getTradersFilter']
    },
    viewMode () {
      return this.$store.getters['traders/getters/handler/getTraderViewMode']
    },
    routePages () {
      return this.$store.getters['dictionaries/getters/handler/getRoutePages']
    }
  },
  created () {
    const item = localStorage.getItem('traders_sorting')
    const sort = this.routePages.current === 'favorite' && item ? item : this.routePages.current.replace(/-/gi, '_')

    if (this.routePages.current === 'favorite') {
      this.$store.commit('traders/mutations/handler/UPDATE_TRADERS_FILTER', {
        data: { sort, 'filter[favorite]': true },
        rootData: this.$store.state.traders.state.handler
      })
    }
    this.$store.commit('traders/mutations/handler/UPDATE_TRADERS_FILTER', {
      data: { sort },
      rootData: this.$store.state.traders.state.handler
    })
    this.$store.commit('traders/mutations/handler/SAVE_ACTIVE_TRADERS_SORTING', {
      data: sort,
      rootData: this.$store.state.traders.state.handler
    })
    if (this.tradersFilter.sort) {
      this.$store.dispatch('traders/actions/handler/fetchTraders')
    }
  }
}
</script>
