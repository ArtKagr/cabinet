<template>
  <div class="popup-trades_history">
    <div class="popup-trades_history-head">
      <lfx-symbol class="popup-trades_history-head-symbol" :large="true" :symbol="trade.symbol_original" />
      <span class="popup-trades_history-head-name" :class="`-${dir}`" v-text="trade.symbol_original" />
    </div>
    <div class="popup-trades_history-data">
      <div class="popup-trades_history-data-row">
        <div class="popup-trades_history-data-row-item">
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
          <bdi class="popup-trades_history-data-row-item-value" :class="[`-${dir}`, dataClass(tradeSwaps)]" v-text="dataValue(tradeSwaps)" />
        </div>
        <div class="popup-trades_history-data-row-column">
          <span class="popup-trades_history-data-row-item-title" :class="`-${dir}`" v-text="$t('Комиссия')" />
          <bdi class="popup-trades_history-data-row-item-value" :class="[`-${dir}`, dataClass(tradeCommission)]" v-text="dataValue(tradeCommission)" />
        </div>
      </div>
      <div class="popup-trades_history-data-row">
        <div class="popup-trades_history-data-row-column">
          <span class="popup-trades_history-data-row-item-title" :class="`-${dir}`" v-text="$t('Всего')" />
          <bdi class="popup-trades_history-data-row-item-value" :class="[`-${dir}`, dataClass(tradeTotal)]" v-text="dataValue(tradeTotal)" />
        </div>
        <div class="popup-trades_history-data-row-column">
          <span class="popup-trades_history-data-row-item-title" :class="`-${dir}`" v-text="$t('Прибыль')" />
          <bdi class="popup-trades_history-data-row-item-value" :class="[`-${dir}`, dataClass(tradeProfit)]" v-text="dataValue(tradeProfit)" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import LfxSymbol from '~/components/_aux/lfx-symbol'
export default {
  name: 'PopupTradesHistoryTrade',
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
    },
    tradeProfit () {
      return Number(this.trade.profit)
    }
  },
  methods: {
    dataClass (value) {
      return Number(value) > 0 ? 'text-success-15' : Number(value) < 0 ? 'text-danger-15' : 'text-dark-primary-15'
    },
    dataValue (value) {
      return `${value.toFixed(2)} ${this.trade.currency}`
    }
  }
}
</script>
<style lang="scss">
  .popup-trades_history {
    display: flex;
    flex-direction: column;

    &-head {
      position: relative;
      display: flex;
      align-items: center;
      padding: 20px;

      &.-copiers,
      &.-traders-ranges {
        padding: 18px 20px;
      }

      &.-copiers-partner-edit {
        padding: 28px 30px;
      }

      &-symbol {
       position: absolute;
      }

      &-name {
        font-size: 20px;
        color: #3B4B68;
        line-height: 1;

        &.-ltr {
          margin-left: 90px;
        }

        &.-rtl {
          margin-right: 90px;
        }
      }
    }

    &-data {
      display: flex;
      flex-direction: column;
      padding: 20px;

      &.-copiers-partner-edit {
        padding: 20px 30px;
        border-top: 1px solid #d9dce1;
        border-bottom: 1px solid #d9dce1;
      }

      &-row {
        display: flex;
        align-items: center;
        width: 100%;
        margin-bottom: 20px;

        &.-top {
          align-items: flex-start;
        }

        &-column {
          display: flex;
          flex-direction: column;
          width: 50%;
        }

        &-item {
          display: flex;
          flex-direction: column;

          &-container {
            display: flex;
            padding-top: 2px;

            &.-rtl {
              align-items: flex-end;
            }
          }

          &-title {
            font-size: 10px;
            color: #8e9aac;
            text-transform: uppercase;

            &.-rtl {
              text-align: right;
            }
          }

          &-value {
            font-size: 15px;
            color: #3B4B68;

            &.-profitability {
              font-size: 11px;
            }

            &.-rtl {
              text-align: right;
            }

            &.label_red,
            &.-sell {
              background-color: #ff4b5f;
              color: white;
              text-transform: uppercase;
              font-size: 10px;
              padding: 2px 5px 1px;
            }

            &.label_green,
            &.-buy {
              background-color: #47BF6F;
              color: white;
              text-transform: uppercase;
              font-size: 10px;
              padding: 2px 5px 1px;
            }

            &.label_blue,
            &.-copy {
              background-color: #3498db;
              color: white;
              text-transform: uppercase;
              font-size: 10px;
              padding: 2px 5px 1px;
            }

            &.-light {
              color: #8e9aac;
            }

            &.-ltr.-light {
              margin-right: 4px;
            }

            &.-rtl.-light {
              margin-left: 4px;
            }

            &.-volume {
              font-weight: 500;
            }
          }
        }
      }
    }

    &-buttons {

      &.-copiers-partner-edit {
        padding: 30px;
      }

      button {
        width: 100%;
      }
    }
  }
</style>
