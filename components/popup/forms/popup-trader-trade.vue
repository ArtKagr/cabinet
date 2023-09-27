<template>
  <div class="popup-trades_history">
    <div class="popup-trades_history-head">
      <lfx-symbol class="popup-trades_history-head-symbol" :large="true" :symbol="trade.symbol_original" />
      <span class="popup-trades_history-head-name" :class="`-${dir}`" v-text="trade.symbol_original" />
    </div>
    <div class="popup-trades_history-data">
      <div class="popup-trades_history-data-row">
        <div class="popup-trades_history-data-row-column">
          <span class="popup-trades_history-data-row-item-title" :class="`-${dir}`" v-text="$t('Дата и время открытия')" />
          <div class="d-flex align-items-center">
            <span class="popup-trades_history-data-row-item-value -light" :class="`-${dir}`" v-text="moment(trade.open_time).format('DD.MM.YYYY')" />
            <span class="popup-trades_history-data-row-item-value" v-text="moment(trade.open_time).format('HH:mm:ss')" />
          </div>
        </div>
      </div>
      <div class="popup-trades_history-data-row">
        <div class="popup-trades_history-data-row-column">
          <span class="popup-trades_history-data-row-item-title" :class="`-${dir}`" v-text="$t('Тип сделки')" />
          <div class="popup-trades_history-data-row-item-container" :class="`-${dir}`">
            <span class="popup-trades_history-data-row-item-value" :class="[trade.type_label, `-${dir}`]" v-text="trade.type" />
          </div>
        </div>
        <div class="popup-trades_history-data-row-column">
          <span class="popup-trades_history-data-row-item-title" :class="`-${dir}`" v-text="$t('Объем сделки')" />
          <span class="popup-trades_history-data-row-item-value -volume" :class="`-${dir}`" v-text="trade.amount" />
        </div>
      </div>
      <div class="popup-trades_history-data-row">
        <div class="popup-trades_history-data-row-column">
          <span class="popup-trades_history-data-row-item-title" :class="`-${dir}`" v-text="$t('Цена открытия')" />
          <span class="popup-trades_history-data-row-item-value" :class="`-${dir}`" v-text="trade.open_price" />
        </div>
        <div class="popup-trades_history-data-row-column">
          <span class="popup-trades_history-data-row-item-title" :class="`-${dir}`" v-text="$t('Текущая цена')" />
          <span class="popup-trades_history-data-row-item-value" :class="`-${dir}`" v-text="trade.current_price" />
        </div>
      </div>
      <div class="popup-trades_history-data-row">
        <div class="popup-trades_history-data-row-column">
          <span class="popup-trades_history-data-row-item-title" :class="`-${dir}`" v-text="$t('Stop loss')" />
          <span class="popup-trades_history-data-row-item-value" :class="`-${dir}`" v-text="trade.sl" />
        </div>
        <div class="popup-trades_history-data-row-column">
          <span class="popup-trades_history-data-row-item-title" :class="`-${dir}`" v-text="$t('Take profit')" />
          <span class="popup-trades_history-data-row-item-value" :class="`-${dir}`" v-text="trade.tp" />
        </div>
      </div>
      <div class="popup-trades_history-data-row">
        <div class="popup-trades_history-data-row-column">
          <span class="popup-trades_history-data-row-item-title" :class="`-${dir}`" v-text="$t('Прибыль')" />
          <bdi class="popup-trades_history-data-row-item-value" :class="[`-${dir}`, dataClass(trade.profit)]" v-text="dataValue(trade.profit)" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import LfxSymbol from '~/components/_aux/lfx-symbol'
export default {
  name: 'PopupTraderTrade',
  components: { LfxSymbol },
  data () {
    return {
      moment
    }
  },
  computed: {
    dir () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode'] ? 'rtl' : 'ltr'
    },
    account () {
      return this.$store.getters['trading/getters/trading/getAccount']
    },
    trade () {
      return this.$store.getters['trading/getters/handler/getOpenedTrade']
    }
  },
  methods: {
    dataClass (value) {
      return Number(value) > 0 ? 'text-success-15' : Number(value) < 0 ? 'text-danger-15' : 'text-dark-primary-15'
    },
    dataValue (value, flag = null) {
      return `${Number(value).toFixed(2)} ${flag || this.account.currency}`
    }
  }
}
</script>
