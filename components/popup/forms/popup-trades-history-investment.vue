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
            <span class="popup-trades_history-data-row-item-value" v-text="moment(investment.close_time).format('HH:mm:ss')" />
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
            <span class="popup-trades_history-data-row-item-value" :class="[`-${dir}`, investment.type_label]" v-text="investment.type" />
          </div>
        </div>
        <div class="popup-trades_history-data-row-column">
          <span class="popup-trades_history-data-row-item-title" :class="`-${dir}`" v-text="$t('Прибыль')" />
          <bdi class="popup-trades_history-data-row-item-value" :class="[`-${dir}`, dataClass(investmentProfit)]" v-text="dataValue(investmentProfit)" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  name: 'PopupTradesHistoryInvestment',
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
    },
    investmentProfit () {
      return Number(this.investment.profit)
    }
  },
  methods: {
    dataClass (value) {
      return Number(value) > 0 ? 'text-success-15' : Number(value) < 0 ? 'text-danger-15' : 'text-dark-primary-15'
    },
    dataValue (value) {
      return `${value.toFixed(2)} ${this.investment.currency}`
    }
  }
}
</script>
<style lang="scss">
  .popup-trades_history_investment {
    display: flex;
    flex-direction: column;

    &-head {
      position: relative;
      display: flex;
      align-items: center;
      padding: 20px;

      &-logo {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        border-radius: 100px;
        background-color: #3B4B68;

        span {
          color: white;
          font-size: 10px;
          text-transform: uppercase;
        }
      }

      &-name {
        font-size: 20px;
        color: #3B4B68;
        line-height: 1;

        &.-ltr {
          margin-left: 10px;
        }

        &.-rtl {
          margin-right: 10px;
        }
      }
    }

    &-data {
      display: flex;
      flex-direction: column;
      padding: 20px;

      &-row {
        display: flex;
        align-items: center;
        width: 100%;
        margin-bottom: 20px;

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

            &.-rtl {
              text-align: right;
            }

            &.label_red {
              background-color: #ff4b5f;
              color: white;
              text-transform: uppercase;
              font-size: 10px;
              padding: 2px 5px 1px;
            }

            &.label_green {
              background-color: #47BF6F;
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
  }
</style>
