<template>
  <div class="custom-table">
    <div class="custom-table-body">
      <row-bottom-sidebar
        v-for="(row, key) in changedItems"
        :key="`${key}-${row.current_price}`"
        :columns="columns"
        :row="row"
        @hide-table="hideTable"
      />
    </div>
  </div>
</template>

<script>
import RowBottomSidebar from '~/components/tables/bottom-sidebar/row-bottom-sidebar'
export default {
  name: 'TableBottomSidebar',
  components: { RowBottomSidebar },
  props: {
    fields: {
      type: Object,
      default: () => ({})
    },
    items: {
      type: Array,
      default: () => ([])
    },
    sort: {
      type: String,
      default: 'asc'
    }
  },
  computed: {
    routePages () {
      return this.$store.getters['dictionaries/getters/handler/getRoutePages']
    },
    columns () {
      return Object.entries(this.fields)
    },
    changedItems () {
      return [...this.items].sort((a, b) => this.sort === 'asc' ? b.open_time - a.open_time : a.open_time - b.open_time)
    },
    activeInstruments () {
      return this.$store.getters['trading/getters/trading/getActiveInstruments']
    }
  },
  methods: {
    hideTable (row) {
      this.$emit('hide-table')
      this.openInstrumentTrader(row)
    },
    openInstrumentTrader (item) {
      if (item.user_id) {
        this.$router.push(`/${this.routePages.locale}/traders/${item.user_id}`)
      } else {
        const data = item.instrument || item
        const instrument =
          this.activeInstruments[data.symbol] ||
          this.activeInstruments[data.symbol_original] ||
          this.$instrument.getActiveInstrumentsOriginalSymbol[data.symbol] ||
          this.$instrument.getActiveInstrumentsOriginalSymbol[data.symbol_original]
        const category = this.$trading.getCategoryName(instrument.category)
        const symbol = data.symbol_original ? data.symbol_original.replace(/#/gi, '') : data.symbol.replace(/#/gi, '')

        this.$router.push(`/${this.routePages.locale}/trading/${category}/${symbol.toLowerCase()}`)

        this.$store.commit('dictionaries/mutations/handler/SAVE_ACTIVE_MAIN_MENU_BUTTON', {
          rootData: this.$store.state.dictionaries.state.handler,
          data: 'trading'
        })
      }
    }
  }
}
</script>
