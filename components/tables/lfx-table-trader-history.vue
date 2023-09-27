<template>
  <b-table
    :fields="changedFields"
    :items="items"
    :class="`lfx-table -trader_history -${windowWidth}`"
    :thead-class="`lfx-table-head -trader_history -${windowWidth}`"
    :tbody-class="`lfx-table-body -trader_history -${windowWidth}`"
    :tbody-tr-class="`lfx-table-body-row -trader_history -${windowWidth}`"
  >
    <!-- Head -->
    <template #head(symbol)>
      <div class="lfx-table-head-symbol" :class="isRtlMode ? '-text_right' : '-text_left'" v-text="`${$t('Инструмент')} | ${$t('Трейдер')}`" />
    </template>
    <template #head(open_time)>
      <div class="lfx-table-head-open_time" v-text="$t('Дата и время открытия')" />
    </template>
    <template #head(close_time)>
      <div class="lfx-table-head-close_time" v-text="$t('Дата и время закрытия')" />
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
      <div class="lfx-table-head-profit" :class="`-${dir}`" v-text="windowWidth === 'sm' ? '' : $t('Прибыль')" />
    </template>
    <template #head(horizontal_dots)>
      <div class="lfx-table-head-horizontal_dots" />
    </template>
    <!-- Rows -->
    <template #cell(symbol)="row">
      <div class="d-flex align-items-center" @click="openItem(row.item)">
        <template v-if="row.item.type_label === 'label_blue'">
          <img v-if="row.item.avatar_url" class="lfx-table-body-trader_logo" :class="isRtlMode ? 'ml-3' : 'mr-3'" :src="row.item.avatar_url" alt>
          <div v-else class="lfx-table-body-trader_logo -empty" :class="isRtlMode ? 'ml-3' : 'mr-3'">
            <span v-text="row.item.avatar_name" />
          </div>
        </template>
        <template v-else>
          <lfx-symbol-trading-card v-if="windowWidth === 'sm'" :class="isRtlMode ? 'ml-3' : 'mr-3'" :symbol="row.item.symbol_original" />
          <lfx-symbol v-else :class="isRtlMode ? 'ml-3' : 'mr-3'" :symbol="row.item.symbol_original" />
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
      <div class="lfx-table-body-cmd" :class="`-${row.item.type_label}`" v-text="row.item.type" />
    </template>
    <template #cell(volume)="row">
      <div class="lfx-table-body-close_price" v-text="row.item.volume || `${row.item.close_profit}%`" />
    </template>
    <template #cell(open_price)="row">
      <div class="lfx-table-body-open_price" v-text="row.item.open_price || `${row.item.open_profit}%`" />
    </template>
    <template #cell(close_price)="row">
      <div class="lfx-table-body-close_price" v-text="row.item.close_price || row.item.close_profit" />
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
        <b-icon-chevron-right
          v-if="windowWidth === 'sm'"
          class="icon-gray pointer h5 m-0"
          :class="isRtlMode ? 'rotate_180' : ''"
          @click="showCurrentTrade(row.item)"
        />
      </div>
    </template>
    <template #cell(horizontal_dots)="row">
      <div @click="showCurrentTrade(row.item)">
        <lfx-icon-dots class="pointer" />
      </div>
    </template>
  </b-table>
</template>

<script>
import moment from 'moment'
import LfxIconDots from '~/components/icons/lfx-icon-dots'
import LfxSymbolTradingCard from '~/components/_aux/lfx-symbol-trading-card'
import LfxSymbol from '~/components/_aux/lfx-symbol'
export default {
  name: 'LfxTableTraderHistory',
  components: {
    LfxSymbol,
    LfxSymbolTradingCard,
    LfxIconDots
  },
  props: {
    source: {
      type: String,
      default: null
    },
    items: {
      type: Array,
      default: () => []
    },
    pagination: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      moment,
      fields: ['symbol', 'open_time', 'close_time', 'cmd', 'volume', 'open_price', 'close_price', 'profit', 'horizontal_dots']
    }
  },
  computed: {
    account () {
      return this.$store.getters['trading/getters/trading/getAccount']
    },
    windowWidth () {
      return this.$store.getters['dictionaries/getters/handler/getCurrentWindowWidth']
    },
    isRtlMode () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode']
    },
    dir () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode'] ? 'rtl' : 'ltr'
    },
    changedFields () {
      return this.fields.filter((field) => {
        let result = true
        switch (this.windowWidth) {
          case 'md':
            switch (field) {
              case 'open_price':
              case 'close_price':
              case 'horizontal_dots':
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
      }).map((field) => { return { key: field } })
    }
  },
  methods: {
    openItem (item) {
      if (item.user_id) {
        this.$emit('open-trader-chart', item)
      }
    },
    showCurrentTrade (currentTrade) {
      this.$store.dispatch('dictionaries/actions/handler/showPopup', currentTrade.user_id ? 'trader-history-investment' : 'trader-history-trade')
      this.$store.commit('trading/mutations/handler/SAVE_OPENED_TRADE', { rootData: this.$store.state.trading.state.handler, data: currentTrade })
    }
  }
}
</script>
