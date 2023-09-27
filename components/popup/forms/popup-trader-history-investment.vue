<template>
  <div class="popup-trades_history_investment">
    <div class="popup-trades_history_investment-head">
      <img v-if="investment.avatar_url" class="popup-trades_history_investment-head-logo" :src="investment.avatar_url" alt>
      <div v-else class="popup-trades_history_investment-head-logo">
        <span v-text="investment.avatar_name" />
      </div>
      <span class="popup-trades_history_investment-head-name" :class="`-${dir}`" v-text="investment.name" />
    </div>
    <div class="popup-trades_history-data">
      <div class="popup-trades_history-data-row">
        <div class="popup-trades_history-data-row-column">
          <span class="popup-trades_history-data-row-item-title" :class="`-${dir}`" v-text="$t('Дата и время открытия')" />
          <div class="d-flex align-items-center">
            <span class="popup-trades_history-data-row-item-value -light" :class="`-${dir}`" v-text="moment(investment.open_time).format('DD.MM.YYYY')" />
            <span class="popup-trades_history-data-row-item-value" v-text="moment(investment.open_time).format('HH:mm:ss')" />
          </div>
        </div>
        <div class="popup-trades_history-data-row-column">
          <span class="popup-trades_history-data-row-item-title" :class="`-${dir}`" v-text="$t('Дата и время закрытия')" />
          <div class="d-flex align-items-center">
            <span class="popup-trades_history-data-row-item-value -light" :class="`-${dir}`" v-text="moment(investment.close_time).format('DD.MM.YYYY')" />
            <span class="popup-trades_history-data-row-item-value" v-text="moment(investment.open_time).format('HH:mm:ss')" />
          </div>
        </div>
      </div>
      <div class="popup-trades_history-data-row">
        <div class="popup-trades_history-data-row-column">
          <span class="popup-trades_history-data-row-item-title" :class="`-${dir}`" v-text="$t('Точка входа')" />
          <bdi class="popup-trades_history-data-row-item-value" :class="`-${dir}`" v-text="`${investment.open_profit}%`" />
        </div>
        <div class="popup-trades_history-data-row-column">
          <span class="popup-trades_history-data-row-item-title" :class="`-${dir}`" v-text="$t('Выход')" />
          <bdi class="popup-trades_history-data-row-item-value" :class="`-${dir}`" v-text="`${investment.close_profit}%`" />
        </div>
      </div>
      <div class="popup-trades_history-data-row">
        <div class="popup-trades_history-data-row-column">
          <span class="popup-trades_history-data-row-item-title" :class="`-${dir}`" v-text="$t('Тип сделки')" />
          <div class="popup-trades_history-data-row-item-container" :class="`-${dir}`">
            <span class="popup-trades_history-data-row-item-value" :class="[investment.type_label, `-${dir}`]" v-text="investment.type" />
          </div>
        </div>
        <div class="popup-trades_history-data-row-column">
          <span class="popup-trades_history-data-row-item-title" :class="`-${dir}`" v-text="$t('Прибыль')" />
          <bdi class="popup-trades_history-data-row-item-value" :class="[`-${dir}`, dataClass(investment.profit)]" v-text="dataValue(investment.profit)" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  name: 'PopupTraderHistoryInvestment',
  data () {
    return {
      moment
    }
  },
  computed: {
    dir () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode'] ? 'rtl' : 'ltr'
    },
    investment () {
      return this.$store.getters['trading/getters/handler/getOpenedTrade']
    }
  },
  methods: {
    dataClass (value) {
      return Number(value) > 0 ? 'text-success-15' : Number(value) < 0 ? 'text-danger-15' : 'text-dark-primary-15'
    },
    dataValue (value) {
      return `${Number(value).toFixed(2)} ${this.investment.currency}`
    }
  }
}
</script>
