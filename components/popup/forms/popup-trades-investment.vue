<template>
  <div class="popup-trades_history_investment">
    <div class="popup-trades_history_investment-head">
      <img v-if="investment.avatar_url" class="popup-trades_history_investment-head-logo" :src="investment.avatar_url" alt>
      <div v-else class="popup-trades_history_investment-head-logo">
        <span v-text="investment.avatar_name" />
      </div>
      <span class="popup-trades_history_investment-head-name" :class="`-${dir}`" v-text="investment.symbol" />
    </div>
    <div class="popup-trades_history-data">
      <div class="popup-trades_history-data-row">
        <div class="popup-trades_history-data-row-column">
          <span class="popup-trades_history-data-row-item-title" :class="`-${dir}`" v-text="$t('Дата и время открытия')" />
          <div class="d-flex align-items-center">
            <span class="popup-trades_history-data-row-item-value -light" :class="`-${dir}`" v-text="moment.unix(investment.open_time).format('DD.MM.YYYY')" />
            <span class="popup-trades_history-data-row-item-value" v-text="moment.unix(investment.open_time).format('HH:mm:ss')" />
          </div>
        </div>
      </div>
      <div class="popup-trades_history-data-row">
        <div class="popup-trades_history-data-row-column">
          <span class="popup-trades_history-data-row-item-title" :class="`-${dir}`" v-text="$t('Тип сделки')" />
          <div class="popup-trades_history-data-row-item-container" :class="`-${dir}`">
            <span class="popup-trades_history-data-row-item-value" :class="[`-${dir}`, investment.statusClass]" v-text="$t(investment.statusLabel)" />
          </div>
        </div>
        <div class="popup-trades_history-data-row-column">
          <span class="popup-trades_history-data-row-item-title" :class="`-${dir}`" v-text="$t('Объем сделки')" />
          <bdi class="popup-trades_history-data-row-item-value" :class="`-${dir}`" v-text="investment.volume" />
        </div>
      </div>
      <div class="popup-trades_history-data-row">
        <div class="popup-trades_history-data-row-column">
          <span class="popup-trades_history-data-row-item-title" :class="`-${dir}`" v-text="$t('Точка входа')" />
          <bdi class="popup-trades_history-data-row-item-value" :class="`-${dir}`" v-text="investment.open_price" />
        </div>
        <div class="popup-trades_history-data-row-column">
          <span class="popup-trades_history-data-row-item-title" :class="`-${dir}`" v-text="$t('Текущий уровень')" />
          <bdi class="popup-trades_history-data-row-item-value" :class="`-${dir}`" v-text="investment.current_price" />
        </div>
      </div>
      <div class="popup-trades_history-data-row">
        <div class="popup-trades_history-data-row-column">
          <span class="popup-trades_history-data-row-item-title" :class="`-${dir}`" v-text="$t('Stop loss')" />
          <bdi class="popup-trades_history-data-row-item-value" :class="`-${dir}`" v-text="dataValue(investment.sl)" />
        </div>
        <div class="popup-trades_history-data-row-column">
          <span class="popup-trades_history-data-row-item-title" :class="`-${dir}`" v-text="$t('Take profit')" />
          <bdi class="popup-trades_history-data-row-item-value" :class="`-${dir}`" v-text="dataValue(investment.tp)" />
        </div>
      </div>
      <div class="popup-trades_history-data-row">
        <div class="popup-trades_history-data-row-column">
          <span class="popup-trades_history-data-row-item-title" :class="`-${dir}`" v-text="$t('Прибыль')" />
          <bdi class="popup-trades_history-data-row-item-value" :class="[`-${dir}`, dataClass(investment.changedProfit)]" v-text="dataValue(investment.changedProfit)" />
        </div>
      </div>
      <div class="popup-trades_history-data-row mb-0">
        <div class="popup-trades_history-data-row-column" :class="isRtlMode ? 'ml-2' : 'mr-2'">
          <b-button variant="secondary" @click="changeCopy" v-text="$t('Изменить')" />
        </div>
        <div class="popup-trades_history-data-row-column">
          <b-button variant="danger" @click="stopCopy" v-text="$t('Остановить')" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  name: 'PopupTradesInvestment',
  data () {
    return {
      moment
    }
  },
  computed: {
    isRtlMode () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode']
    },
    dir () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode'] ? 'rtl' : 'ltr'
    },
    investment () {
      return this.$store.getters['trading/getters/handler/getOpenedTrade']
    },
    investmentProfit () {
      return Number(this.investment.profit)
    }
  },
  methods: {
    togglePopup (value) {
      this.$store.commit('dictionaries/mutations/handler/TOGGLE_POPUP', {
        rootData: this.$store.state.dictionaries.state.handler,
        data: value
      })
    },
    dataClass (value) {
      return Number(value) > 0 ? 'text-success-15' : Number(value) < 0 ? 'text-danger-15' : 'text-dark-primary-15'
    },
    dataValue (value) {
      return `${value.toFixed(2)} ${this.investment.currency}`
    },
    changeCopy () {
      this.togglePopup(false)
      this.$store.dispatch('forms/actions/handler/fetchForm', 'copyAction')
    },
    async stopCopy () {
      await this.$store.dispatch('trading/actions/handler/stopCopying', this.investment.user_id)
      await this.togglePopup(false)
    }
  }
}
</script>
