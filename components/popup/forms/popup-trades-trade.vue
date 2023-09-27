<template>
  <div class="popup-trades_history">
    <div class="popup-trades_history-head">
      <lfx-symbol class="popup-trades_history-head-symbol" :large="true" :symbol="trade.instrument.symbol_original" />
      <span class="popup-trades_history-head-name" :class="`-${dir}`" v-text="trade.instrument.symbol_original" />
    </div>
    <div class="popup-trades_history-data">
      <div class="popup-trades_history-data-row">
        <div class="popup-trades_history-data-row-column">
          <span class="popup-trades_history-data-row-item-title" :class="`-${dir}`" v-text="$t('Сделка')" />
          <span class="popup-trades_history-data-row-item-value" :class="`-${dir}`" v-text="`#${trade.order}`" />
        </div>
        <div class="popup-trades_history-data-row-column">
          <span class="popup-trades_history-data-row-item-title" :class="`-${dir}`" v-text="$t('Дата и время открытия')" />
          <div class="d-flex align-items-center">
            <span class="popup-trades_history-data-row-item-value -light" :class="`-${dir}`" v-text="moment.unix(trade.open_time).format('DD.MM.YYYY')" />
            <span class="popup-trades_history-data-row-item-value" v-text="moment.unix(trade.open_time).format('HH:mm:ss')" />
          </div>
        </div>
      </div>
      <div class="popup-trades_history-data-row">
        <div class="popup-trades_history-data-row-column">
          <span class="popup-trades_history-data-row-item-title" :class="`-${dir}`" v-text="$t('Тип сделки')" />
          <div class="popup-trades_history-data-row-item-container" :class="`-${dir}`">
            <span class="popup-trades_history-data-row-item-value" :class="[trade.statusClass, `-${dir}`]" v-text="$t(trade.statusLabel)" />
          </div>
        </div>
        <div class="popup-trades_history-data-row-column">
          <span class="popup-trades_history-data-row-item-title" :class="`-${dir}`" v-text="$t('Объем сделки')" />
          <span class="popup-trades_history-data-row-item-value -volume" :class="`-${dir}`" v-text="trade.volume" />
        </div>
      </div>
      <div class="popup-trades_history-data-row">
        <div class="popup-trades_history-data-row-column">
          <span class="popup-trades_history-data-row-item-title" :class="`-${dir}`" v-text="$t('Точка входа')" />
          <span class="popup-trades_history-data-row-item-value" :class="`-${dir}`" v-text="dataValueDigits(trade.open_price)" />
        </div>
        <div class="popup-trades_history-data-row-column">
          <span class="popup-trades_history-data-row-item-title" :class="`-${dir}`" v-text="$t('Текущий уровень')" />
          <span class="popup-trades_history-data-row-item-value" :class="`-${dir}`" v-text="dataValueDigits(isBuyTrade(trade.cmd) ? trade.bid : trade.ask)" />
        </div>
      </div>
      <div class="popup-trades_history-data-row">
        <div class="popup-trades_history-data-row-column">
          <span class="popup-trades_history-data-row-item-title" :class="`-${dir}`" v-text="$t('Stop loss')" />
          <span class="popup-trades_history-data-row-item-value" :class="`-${dir}`" v-text="dataValueDigits(trade.sl)" />
        </div>
        <div class="popup-trades_history-data-row-column">
          <span class="popup-trades_history-data-row-item-title" :class="`-${dir}`" v-text="$t('Take profit')" />
          <span class="popup-trades_history-data-row-item-value" :class="`-${dir}`" v-text="dataValueDigits(trade.tp)" />
        </div>
      </div>
      <div class="popup-trades_history-data-row">
        <div class="popup-trades_history-data-row-column">
          <span class="popup-trades_history-data-row-item-title" :class="`-${dir}`" v-text="$t('Своп')" />
          <bdi class="popup-trades_history-data-row-item-value" :class="`-${dir}`" v-text="dataValue(trade.swaps)" />
        </div>
        <div class="popup-trades_history-data-row-column">
          <span class="popup-trades_history-data-row-item-title" :class="`-${dir}`" v-text="$t('Комиссия')" />
          <bdi class="popup-trades_history-data-row-item-value" :class="`-${dir}`" v-text="dataValue(trade.commission)" />
        </div>
      </div>
      <div class="popup-trades_history-data-row -top">
        <div class="popup-trades_history-data-row-column">
          <span class="popup-trades_history-data-row-item-title" :class="`-${dir}`" v-text="$t('Всего')" />
          <bdi class="popup-trades_history-data-row-item-value" :class="[`-${dir}`, dataClass(trade.changedProfit)]" v-text="dataValue(trade.changedProfit)" />
        </div>
        <div class="popup-trades_history-data-row-column">
          <span class="popup-trades_history-data-row-item-title" :class="`-${dir}`" v-text="$t('Прибыль')" />
          <div class="d-flex flex-column">
            <bdi class="popup-trades_history-data-row-item-value" :class="[`-${dir}`, dataClass(trade.changedProfit)]" v-text="dataValue(trade.changedProfit)" />
            <bdi class="popup-trades_history-data-row-item-value -profitability" :class="[`-${dir}`, dataClass(trade.profitability)]" v-text="dataValue(trade.profitability, '%')" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import { CMD_BUY, CMD_BUY_STOP, CMD_BUY_LIMIT, CMD_BUY_STOP_LIMIT } from '~/plugins/trading/Constants'
import LfxSymbol from '~/components/_aux/lfx-symbol'
export default {
  name: 'PopupTradesTrade',
  components: { LfxSymbol },
  data () {
    return {
      moment
    }
  },
  computed: {
    account () {
      return this.$store.getters['trading/getters/trading/getAccount']
    },
    dir () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode'] ? 'rtl' : 'ltr'
    },
    trade () {
      return this.$store.getters['trading/getters/handler/getOpenedTrade']
    },
    tradeSwaps () {
      return Number(this.trade.swaps)
    },
    tradeCommission () {
      return Number(this.trade.commission)
    },
    tradeTotal () {
      return Number(Number(this.trade.profit) - Number(this.trade.swaps) + Number(this.trade.commission))
    }
  },
  methods: {
    isBuyTrade (cmd) {
      return [CMD_BUY, CMD_BUY_STOP, CMD_BUY_LIMIT, CMD_BUY_STOP_LIMIT].includes(cmd)
    },
    dataClass (value) {
      return Number(value) > 0 ? 'text-success-15' : Number(value) < 0 ? 'text-danger-15' : 'text-dark-primary-15'
    },
    dataValue (value, flag = null) {
      return `${Number(value).toFixed(2)} ${flag || this.account.currency}`
    },
    dataValueDigits (value) {
      return Number(value).toFixed(this.trade.instrument.digits)
    }
  }
}
</script>
