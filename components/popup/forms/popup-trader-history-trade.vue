<template>
  <div class="popup-trades_history">
    <div class="popup-trades_history-head">
      <lfx-symbol class="popup-trades_history-head-symbol" :large="true" :symbol="trade.symbol_original" />
      <span class="popup-trades_history-head-name" :class="`-${dir}`" v-text="trade.symbol_original" />
    </div>
    <div class="popup-trades_history-data">
      <div class="popup-trades_history-data-row">
        <div class="popup-trades_history-data-row-column">
          <span class="popup-trades_history-data-row-item-title" :class="`-${dir}`" v-text="$t('Сделка')" />
          <span class="popup-trades_history-data-row-item-value" :class="`-${dir}`" v-text="`#${trade.order}`" />
        </div>
      </div>
      <div class="popup-trades_history-data-row">
        <div class="popup-trades_history-data-row-column">
          <span class="popup-trades_history-data-row-item-title" :class="`-${dir}`" v-text="$t('Дата и время открытия')" />
          <div class="d-flex align-items-center">
            <span class="popup-trades_history-data-row-item-value -light" :class="`-${dir}`" v-text="moment(trade.open_time).format('DD.MM.YYYY')" />
            <span class="popup-trades_history-data-row-item-value" v-text="moment(trade.open_time).format('HH:mm:ss')" />
          </div>
        </div>
        <div class="popup-trades_history-data-row-column">
          <span class="popup-trades_history-data-row-item-title" :class="`-${dir}`" v-text="$t('Дата и время закрытия')" />
          <div class="d-flex align-items-center">
            <span class="popup-trades_history-data-row-item-value -light" :class="`-${dir}`" v-text="moment(trade.close_time).format('DD.MM.YYYY')" />
            <span class="popup-trades_history-data-row-item-value" v-text="moment(trade.close_time).format('HH:mm:ss')" />
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
          <span class="popup-trades_history-data-row-item-value -volume" :class="`-${dir}`" v-text="trade.volume" />
        </div>
      </div>
      <div class="popup-trades_history-data-row">
        <div class="popup-trades_history-data-row-column">
          <span class="popup-trades_history-data-row-item-title" :class="`-${dir}`" v-text="$t('Точка входа')" />
          <span class="popup-trades_history-data-row-item-value" :class="`-${dir}`" v-text="trade.open_price" />
        </div>
        <div class="popup-trades_history-data-row-column">
          <span class="popup-trades_history-data-row-item-title" :class="`-${dir}`" v-text="$t('Выход')" />
          <span class="popup-trades_history-data-row-item-value" :class="`-${dir}`" v-text="trade.close_price" />
        </div>
      </div>
      <div class="popup-trades_history-data-row">
        <div class="popup-trades_history-data-row-column">
          <span class="popup-trades_history-data-row-item-title" :class="`-${dir}`" v-text="$t('Своп')" />
          <bdi class="popup-trades_history-data-row-item-value font-weight-500" :class="`-${dir}`" v-text="dataValue(trade.swaps)" />
        </div>
        <div class="popup-trades_history-data-row-column">
          <span class="popup-trades_history-data-row-item-title" :class="`-${dir}`" v-text="$t('Комиссия')" />
          <bdi class="popup-trades_history-data-row-item-value font-weight-500" :class="`-${dir}`" v-text="dataValue(trade.commission)" />
        </div>
      </div>
      <div class="popup-trades_history-data-row -top">
        <div class="popup-trades_history-data-row-column">
          <span class="popup-trades_history-data-row-item-title" :class="`-${dir}`" v-text="$t('Всего')" />
          <bdi
            class="popup-trades_history-data-row-item-value"
            :class="[`-${dir}`, dataClass(trade.profit + trade.swaps + trade.commission)]"
            v-text="dataValue(trade.profit + trade.swaps + trade.commission)"
          />
        </div>
        <div class="popup-trades_history-data-row-column">
          <span class="popup-trades_history-data-row-item-title" :class="`-${dir}`" v-text="$t('Прибыль')" />
          <div class="d-flex flex-column">
            <bdi class="popup-trades_history-data-row-item-value" :class="[`-${dir}`, dataClass(trade.profit)]" v-text="dataValue(trade.profit)" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import LfxSymbol from '~/components/_aux/lfx-symbol'
export default {
  name: 'PopupTraderHistoryTrade',
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
