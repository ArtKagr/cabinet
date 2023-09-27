<template>
  <b-table
    :fields="changedFields"
    :items="itemsCopy"
    :class="`lfx-table -trades_history -${windowWidth}`"
    :thead-class="`lfx-table-head -trades_history -${windowWidth}`"
    :tbody-class="`lfx-table-body -trades_history -${windowWidth}`"
    :tbody-tr-class="`lfx-table-body-row -trades_history -${windowWidth}`"
  >
    <!-- Head -->
    <template #head(symbol)>
      <div class="lfx-table-head-symbol" :class="isRtlMode ? '-text_right mr-2' : '-text_left ml-2'" v-text="`${$t('Инструмент')} | ${$t('Трейдер')}`" />
    </template>
    <template #head(open_time)>
      <div class="lfx-table-head-open_time -primary" v-text="$t('Дата и время открытия')" />
    </template>
    <template #head(close_time)>
      <div class="lfx-table-head-close_time -primary pointer" @click="sortTradesFlag()">
        <b-icon-caret-up-fill v-if="sort === 'ask'" :class="isRtlMode ? 'ml-1' : 'mr-1'" />
        <b-icon-caret-down-fill v-else :class="isRtlMode ? 'ml-1' : 'mr-1'" />
        <span v-text="$t('Дата и время закрытия')" />
      </div>
    </template>
    <template #head(cmd)>
      <div class="lfx-table-head-cmd" v-text="$t('Тип сделки')" />
    </template>
    <template #head(volume)>
      <div class="lfx-table-head-volume" v-text="$t('Объем сделки')" />
    </template>
    <template #head(open_price)>
      <div class="lfx-table-head-open_price" v-text="$t('Точка входа')" />
    </template>
    <template #head(close_price)>
      <div class="lfx-table-head-close_price" v-text="$t('Выход')" />
    </template>
    <template #head(profit)>
      <div class="lfx-table-head-profit -primary -trades_history" v-text="$t('Прибыль')" />
    </template>
    <template #head(horizontal_dots)>
      <div class="lfx-table-head-horizontal_dots" />
    </template>
    <!-- Rows -->
    <template #cell(symbol)="row">
      <div class="d-flex align-items-center" @click="openInstrumentTrader(row.item)">
        <template v-if="row.item.type_label === 'label_blue'">
          <img v-if="row.item.avatar_url" class="lfx-table-body-trader_logo" :class="isRtlMode ? 'ml-3' : 'mr-3'" :src="row.item.avatar_url" alt>
          <div v-else class="lfx-table-body-trader_logo -empty" :class="isRtlMode ? 'ml-3' : 'mr-3'">
            <span v-text="row.item.avatar_name" />
          </div>
        </template>
        <template v-else>
          <lfx-symbol-trading-card v-if="windowWidth === 'sm'" :symbol="row.item.symbol_original" :class="isRtlMode ? 'ml-3' : 'mr-3'" />
          <lfx-symbol v-else :symbol="row.item.symbol_original" :class="isRtlMode ? 'ml-3' : 'mr-3'" />
        </template>
        <div v-if="windowWidth === 'sm'" class="d-flex flex-column">
          <div class="lfx-table-body-symbol" :class="isRtlMode ? 'text-right' : ''" v-text="row.item.symbol_original || row.item.name || row.item.username" />
          <div class="d-flex">
            <div class="lfx-table-body-cmd" :class="[isRtlMode ? 'text-right' : '', `-bs-${row.item.type_label}`]" v-text="row.item.type" />
          </div>
          <div class="lfx-table-body-volume mt-1" :class="isRtlMode ? 'text-right' : ''" v-text="row.item.type_label === 'label_blue' ? '' : row.item.volume" />
        </div>
        <div v-else class="lfx-table-body-symbol" v-text="row.item.symbol_original || row.item.name || row.item.username" />
      </div>
    </template>
    <template #cell(open_time)="row">
      <div class="lfx-table-body-open_time">
        <span class="lfx-table-body-open_time-date" v-text="moment(row.item.open_time).format('DD.MM.YYYY')" />
        <span class="lfx-table-body-open_time-time" v-text="moment(row.item.open_time).format('HH:mm:ss')" />
      </div>
    </template>
    <template #cell(close_time)="row">
      <div class="lfx-table-body-close_time">
        <span class="lfx-table-body-open_time-date" v-text="moment(row.item.close_time).format('DD.MM.YYYY')" />
        <span class="lfx-table-body-open_time-time" v-text="moment(row.item.close_time).format('HH:mm:ss')" />
      </div>
    </template>
    <template #cell(cmd)="row">
      <div class="lfx-table-body-cmd -trades_history" :class="`-${row.item.type_label}`" v-text="row.item.type" />
    </template>
    <template #cell(volume)="row">
      <div class="lfx-table-body-volume" v-text="row.item.volume" />
    </template>
    <template #cell(open_price)="row">
      <div class="lfx-table-body-open_price" v-text="row.item.open_price || `${row.item.open_profit}%`" />
    </template>
    <template #cell(close_price)="row">
      <div class="lfx-table-body-close_price" v-text="row.item.close_price || `${row.item.close_profit}%`" />
    </template>
    <template #cell(profit)="row">
      <div class="d-flex align-items-center w-100" :class="windowWidth === 'sm' ? 'justify-content-between' : 'justify-content-end'">
        <div class="d-flex flex-column w-100" :class="windowWidth === 'sm' ? 'align-items-start' : 'align-items-end'">
          <span v-if="windowWidth === 'sm'" class="text-secondary-10 text-uppercase mb-1" v-text="$t('Прибыль')" />
          <bdi
            class="lfx-table-body-profit"
            :class="[isRtlMode ? 'text-right' : 'text-left', Number(row.item.profit) > 0 ? '-profit' : Number(row.item.profit) === 0 ? '' : '-loss']"
            v-text="`${Number(row.item.profit).toFixed(2)} ${account.currency}`"
          />
        </div>
        <b-icon-chevron-right v-if="windowWidth === 'sm'" class="icon-gray pointer h5 m-0" :class="isRtlMode ? 'rotate_180' : ''" @click="showCurrentTrade(row.item)" />
      </div>
    </template>
    <template #cell(horizontal_dots)="row">
      <div :class="isRtlMode ? 'd-flex justify-content-end' : ''" @click="showCurrentTrade(row.item)">
        <lfx-icon-dots class="pointer" />
      </div>
    </template>
  </b-table>
</template>

<script>
import moment from 'moment'
import LfxIconDots from '~/components/icons/lfx-icon-dots'
import LfxSymbol from '~/components/_aux/lfx-symbol'
import LfxSymbolTradingCard from '~/components/_aux/lfx-symbol-trading-card'

export default {
  name: 'LfxTableTradesHistory',
  components: {
    LfxSymbolTradingCard,
    LfxSymbol,
    LfxIconDots
  },
  props: {
    items: {
      type: Array,
      default: () => ([])
    }
  },
  data () {
    return {
      keyRandom: null,
      itemsCopy: [],
      sort: 'ask',
      moment,
      fields: ['symbol', 'open_time', 'close_time', 'cmd', 'volume', 'open_price', 'close_price', 'profit', 'horizontal_dots']
    }
  },
  computed: {
    account () {
      return this.$store.getters['trading/getters/trading/getAccount']
    },
    activeInstrumentsOriginalSymbol () {
      return Object.entries(this.$store.getters['trading/getters/trading/getActiveInstruments']).reduce((acc, item) => {
        const symbol = this.$instrument.getOriginalSymbol(item[0])
        acc[symbol] = item[1]
        return acc
      }, {})
    },
    isRtlMode () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode']
    },
    windowWidth () {
      return this.$store.getters['dictionaries/getters/handler/getCurrentWindowWidth']
    },
    changedFields () {
      return this.fields.filter((field) => {
        let result = true
        switch (this.windowWidth) {
          case 'md':
            switch (field) {
              case 'open_time':
              case 'close_time':
              case 'open_price':
              case 'close_price':
                result = false
                break
              default:
                result = true
            }
            break
          case 'sm':
            switch (field) {
              case 'symbol':
              case 'profit':
                result = true
                break
              default:
                result = false
            }
        }
        return result
      }).map(field => ({ key: field }))
    }
  },
  watch: {
    items (newValue) {
      this.itemsCopy = newValue
      this.sortTrades()
    }
  },
  methods: {
    showCurrentTrade (currentTrade) {
      this.$store.dispatch('dictionaries/actions/handler/showPopup', currentTrade.user_id ? 'trades-history-investment' : 'trades-history-trade')
      this.$store.commit('trading/mutations/handler/SAVE_OPENED_TRADE', { rootData: this.$store.state.trading.state.handler, data: currentTrade })
    },
    sortTrades () {
      if (this.sort === 'ask') {
        this.itemsCopy.sort((a, b) => new Date(b.close_time) - new Date(a.close_time))
      } else {
        this.itemsCopy.sort((a, b) => new Date(a.close_time) - new Date(b.close_time))
      }
    },
    sortTradesFlag () {
      if (this.sort === 'ask') {
        this.itemsCopy.sort((a, b) => new Date(a.close_time) - new Date(b.close_time))
        this.sort = 'desk'
      } else {
        this.itemsCopy.sort((a, b) => new Date(b.close_time) - new Date(a.close_time))
        this.sort = 'ask'
      }
    },
    openInstrumentTrader (item) {
      if (item.user_id) {
        this.$router.push(`/${this.routePages.locale}/traders/${item.user_id}`)
      } else {
        const data = item.instrument || item
        const instrument =
          this.$store.getters['trading/getters/trading/getActiveInstruments'][data.symbol] ||
          this.$store.getters['trading/getters/trading/getActiveInstruments'][data.symbol_original] ||
          this.activeInstrumentsOriginalSymbol[data.symbol] ||
          this.activeInstrumentsOriginalSymbol[data.symbol_original]
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
