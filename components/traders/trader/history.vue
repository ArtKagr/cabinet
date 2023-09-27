<template>
  <div class="d-flex flex-column">
    <lfx-table-trader-history
      v-if="traderHistory && traderHistory.history && traderHistory.history.length"
      :items="traderHistory.history"
      @open-trader-chart="openTraderChart"
    />
    <span v-else class="empty-text" :class="`-${dir}`" v-text="$t('У трейдера еще нет истории закрытых торговых операций.')" />
  </div>
</template>

<script>
import LfxTableTraderHistory from '~/components/tables/lfx-table-trader-history'
export default {
  name: 'History',
  components: { LfxTableTraderHistory },
  computed: {
    routePages () {
      return this.$store.getters['dictionaries/getters/handler/getRoutePages']
    },
    dir () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode'] ? 'rtl' : 'ltr'
    },
    traderHistory () {
      return this.$store.getters['traders/getters/handler/getTraderHistory']
    }
  },
  watch: {
    scrollBottom (newValue) {
      if (newValue === 0 && this.traderHistory.pagination.page_count > Number(this.traderHistory.page)) {
        this.fetchHistory(Number(this.traderHistory.page) + 1)
      }
    }
  },
  async created () {
    await this.fetchCurrentTrader()
    await this.fetchHistory()
  },
  methods: {
    async fetchHistory (page = 1) {
      if (this.routePages.second && this.routePages.current) {
        await this.$store.dispatch('traders/actions/handler/fetchCurrentTraderHistory', { id: Number(this.routePages.second), page })
      } else {
        await this.$store.dispatch('traders/actions/handler/fetchCurrentTraderHistory', { id: Number(this.routePages.current), page })
      }
    },
    async fetchCurrentTrader () {
      if (this.routePages.second && this.routePages.current) {
        await this.$store.dispatch('traders/actions/handler/fetchCurrentTrader', this.routePages.second)
      } else {
        await this.$store.dispatch('traders/actions/handler/fetchCurrentTrader', this.routePages.current)
      }
    },
    openTraderChart (item) {
      this.$emit('open-trader-chart', item)
    }
  }
}
</script>
<style lang="scss">
  .empty-text {
    font-size: 20px;
    color: #5f6875;

    &.-rtl {
      text-align: right;
    }

    @media screen and (max-width: 767px) {
      padding: 0 10px;
    }
  }
</style>
