<template>
  <div class="popup-trades_history">
    <div class="popup-trades_history-head">
      <span class="popup-trades_history-head-name" v-text="$t('Изменение копирования')" />
    </div>
    <div class="popup-trades-change-body">
      <div class="popup-trades-change-body-head">
        <img v-if="investment.avatar_url" class="popup-trades_history_investment-head-logo" :src="investment.avatar_url" alt>
        <div v-else class="popup-trades_history_investment-head-logo">
          <span v-text="investment.avatar_name" />
        </div>
        <span class="popup-trades_history_investment-head-name" :class="`-${dir}`" v-text="investment.symbol" />
      </div>
      <div class="popup-trades-change-body-label">
        <span class="popup-trades-change-body-label-title" v-text="$t('Точка входа')" />
        <span class="popup-trades-change-body-label-value" v-text="investment.open_price" />
      </div>
      <div class="popup-trades-change-body-amount">
        <span class="popup-trades-change-body-amount-title" :class="`-${dir}`" v-text="$t('Сумма для копирования')" />
        <field-numeric
          v-model="copyValue"
          class="popup-trades-change-body-amount-input"
          :label="account.currency"
          :digits="2"
          :min="10"
          :max="Number.MAX_SAFE_INTEGER"
          :counter="10"
          @change="setCopyAmount"
        />
        <span class="popup-trades-change-body-amount-total" :class="involvedFunds > 100 ? 'text-danger-12' : ''" v-text="$t('{involvedFunds}% средств', { involvedFunds })" />
      </div>
      <div class="popup-trades-change-body-data">
        <div class="popup-trades-change-body-data-values">
          <div class="popup-trades-change-body-data-values-item">
            <span class="popup-trades-change-body-data-values-item-title" :class="`-${dir}`" v-text="$t('Текущая доходность')" />
            <bdi class="popup-trades-change-body-data-values-item-value" :class="[`-${dir}`, dataClass(investment.current_price.replace(/%/gi, ''))]" v-text="investment.current_price" />
          </div>
          <div class="popup-trades-change-body-data-values-item">
            <span class="popup-trades-change-body-data-values-item-title" :class="`-${dir}`" v-text="$t('Текущая прибыль')" />
            <bdi class="popup-trades-change-body-data-values-item-value" :class="[`-${dir}`, dataClass(investment.changedProfit)]" v-text="dataValue(investment.changedProfit)" />
          </div>
        </div>
        <div class="popup-trades-change-body-data-collapse">
          <div v-b-toggle:trades-investment-change class="popup-trades-change-body-data-collapse-chevron" :class="`-${dir}`">
            <lfx-icon-chevron-down class="when-closed" />
            <lfx-icon-chevron-down class="when-open rotate_180" />
          </div>
          <span v-b-toggle.trades-investment-change class="popup-trades-change-body-data-collapse-title" v-text="$t('Настройки копирования')" />
        </div>
        <b-collapse id="trades-investment-change">
          <div class="popup-trades-change-body-data-conditions">
            <div class="popup-trades-change-body-data-conditions-row">
              <span class="popup-trades-change-body-data-conditions-row-title" :class="`-${dir}`" v-text="$t('Тип копирования')" />
              <field-select
                v-model="copyType"
                class="popup-trades-change-body-data-conditions-row-copy_type"
                :values="copyTypes"
                @change="setCopyType"
              />
            </div>
            <div v-if="copyType === 2" class="popup-trades-change-body-data-conditions-row">
              <span class="popup-trades-change-body-data-conditions-row-title" v-text="$t('Объем')" />
              <field-numeric
                v-model="fixVolume"
                class="popup-trades-change-body-data-conditions-row-input"
                :digits="2"
                :min="0.01"
                :max="100"
                :counter="0.01"
                @change="setFixVolume"
              />
            </div>
            <div v-if="copyType === 3" class="popup-trades-change-body-data-conditions-row">
              <span class="popup-trades-change-body-data-conditions-row-title" v-text="$t('Процент от объема')" />
              <field-numeric
                v-model="percentTrade"
                class="popup-trades-change-body-data-conditions-row-input"
                label="%"
                :digits="2"
                :min="1"
                :max="10000"
                :counter="1"
                @change="setPercentTrade"
              />
            </div>
            <div class="popup-trades-change-body-data-conditions-row flex-row">
              <div class="popup-trades-change-body-data-conditions-row-column" :class="`-${dir}`">
                <span class="popup-trades-change-body-data-conditions-row-title" :class="`-${dir}`" v-text="$t('Макс. убыток')" />
                <field-numeric
                  v-model="maxLoss"
                  class="popup-trades-change-body-data-conditions-row-input -loss"
                  :label="account.currency"
                  :digits="0"
                  :min="Number.MIN_SAFE_INTEGER"
                  :max="0"
                  :counter="1"
                  @change="setMaxLoss"
                />
              </div>
              <div class="popup-trades-change-body-data-conditions-row-column" :class="`-${dir}`">
                <span class="popup-trades-change-body-data-conditions-row-title" :class="`-${dir}`" v-text="$t('Макс. прибыль')" />
                <field-numeric
                  v-model="maxProfit"
                  class="popup-trades-change-body-data-conditions-row-input -profit"
                  :label="account.currency"
                  :digits="0"
                  :min="0"
                  :max="Number.MAX_SAFE_INTEGER"
                  :counter="1"
                  @change="setMaxProfit"
                />
              </div>
            </div>
            <div class="popup-trades-change-body-data-conditions-row">
              <span class="popup-trades-change-body-data-conditions-row-title" :class="`-${dir}`" v-text="$t('Пауза копирования')" />
              <field-select
                v-model="copyPause"
                class="popup-trades-change-body-data-conditions-row-copy_type"
                :values="copyPauses"
                @change="setCopyPause"
              />
            </div>
          </div>
        </b-collapse>
        <div class="popup-trades-change-body-data-buttons">
          <b-button class="popup-trades-change-body-data-buttons-button" :disabled="isChangeCopyDisabled" variant="primary" @click="changeCopy" v-text="$t('Изменить')" />
          <b-button class="popup-trades-change-body-data-buttons-button" variant="danger" @click="stopCopy" v-text="$t('Остановить копирование')" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FieldNumeric from '~/components/modal/fields/field-numeric'
import FieldSelect from '~/components/modal/fields/field-select'
import LfxIconChevronDown from '~/components/icons/lfx-icon-chevron-down'
export default {
  name: 'PopupTradesInvestmentChange',
  components: { LfxIconChevronDown, FieldSelect, FieldNumeric },
  data () {
    return {
      copyValue: 0,
      copyType: 1,
      maxLoss: 0,
      maxProfit: 0,
      copyPause: 0,
      fixVolume: 0.01,
      percentTrade: 0,
      isChangeCopyDisabled: true,
      copy_opened_trades: 0
    }
  },
  computed: {
    account () {
      return this.$store.getters['trading/getters/trading/getAccount']
    },
    dir () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode'] ? 'rtl' : 'ltr'
    },
    investment () {
      return this.$store.getters['trading/getters/handler/getOpenedTrade']
    },
    involvedFunds () {
      return ((this.copyValue * 100) / this.account.balance).toFixed(2)
    },
    copyTypes () {
      return [
        { text: this.$t('Пропорционально моим средствам'), value: 4 },
        { text: this.$t('Полный объем 1 к 1'), value: 1 },
        { text: this.$t('Фиксированный объем'), value: 2 },
        { text: this.$t('% от объема каждой сделки'), value: 3 }
      ]
    },
    copyPauses () {
      return [
        { text: this.$t('Да'), value: 1 },
        { text: this.$t('Нет'), value: 0 }
      ]
    },
    initCopyValue () {
      return this.investment.balance - this.investment.margin + this.investment.profit_closed - this.investment.changedProfit
    },
    values () {
      return {
        id: this.investment.user_id,
        amount: this.copyValue,
        copy_type: this.copyType,
        setting_2: this.copyType === 2 ? this.fixVolume : null,
        setting_3: this.copyType === 3 ? this.percentTrade : null,
        stop_loss: this.maxLoss,
        take_profit: this.maxProfit,
        copy_opened_trades: this.copyPause
      }
    }
  },
  watch: {
    'values.amount' (newValue) {
      this.isChangeCopyDisabled = newValue === this.initCopyValue
    },
    'values.copy_type' (newValue) {
      this.isChangeCopyDisabled = newValue === this.investment.copy_type
    },
    'values.copy_opened_trades' (newValue) {
      this.isChangeCopyDisabled = newValue === this.copy_opened_trades
    },
    'values.stop_loss' () {
      this.isChangeCopyDisabled = false
    },
    'values.take_profit' () {
      this.isChangeCopyDisabled = false
    }
  },
  created () {
    this.copyValue = this.initCopyValue
    this.copyType = this.investment.copy_type
    this.$store.dispatch('forms/actions/handler/fetchForm', 'copyAction')
  },
  methods: {
    togglePopup (value) {
      this.$store.commit('dictionaries/mutations/handler/TOGGLE_POPUP', {
        rootData: this.$store.state.dictionaries.state.handler,
        data: value
      })
    },
    dataClass (value) {
      return Number(value) > 0 ? 'text-success-18' : Number(value) < 0 ? 'text-danger-18' : 'text-secondary-18'
    },
    dataValue (value, flag = null) {
      return `${Number(value).toFixed(2)} ${flag || this.account.currency}`
    },
    dataValueDigits (value) {
      return value
    },
    setCopyType (value) {
      this.copyType = value
    },
    setCopyAmount (value) {
      this.copyValue = value
    },
    setPercentTrade (value) {
      this.percentTrade = value
    },
    setFixVolume (value) {
      this.fixVolume = value
    },
    setMaxLoss (value) {
      this.maxLoss = value
    },
    setMaxProfit (value) {
      this.maxProfit = value
    },
    setCopyPause (value) {
      this.copyPause = value
    },
    async changeCopy () {
      await this.$store.dispatch('trading/actions/handler/copyAction', this.values)
      await this.togglePopup(false)
    },
    async stopCopy () {
      await this.$store.dispatch('trading/actions/handler/stopCopying', this.investment.user_id)
      await this.togglePopup(false)
    }
  }
}
</script>
<style lang="scss">
  .popup-trades-change-body {
    display: flex;
    flex-direction: column;

    &-head {
      display: flex;
      align-items: center;
      padding: 0 18px 20px;
    }

    &-label {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background-color: #3498db;
      font-weight: 500;
      text-transform: uppercase;
      color: white;
      padding: 5px 0;

      &.-buy {
        background-color: #47bf6f;
        color: white;
      }

      &.-sell {
        background-color: #eb5757;
        color: white;
      }

      &-title {
        font-size: 12px;
      }

      &-value {
        font-size: 18px;
      }
    }

    &-amount {
      display: flex;
      flex-direction: column;
      padding: 30px 20px 20px;

      &.-order {
        padding: 0 20px 20px;
      }

      &-title {
        font-size: 12px;
        color: #8e9aac;
        margin-bottom: 5px;

        &.-rtl {
          text-align: right;
        }
      }

      &-input {

        &.-trader_card {
          height: 40px;
          min-width: 70px;
          width: 60%;

          input {
            height: 38px;
            font-size: 14px;
          }
        }

        &.-trading_card {
          height: 40px;
          min-width: 70px;
          width: 90%;

          input {
            height: 38px;
            font-size: 14px;
          }
        }

        input {
          border: none;
          padding: 9px 0;
          text-align: center;
          font-size: 18px;
        }
      }

      &-total {
        font-size: 12px;
        color: #8e9aac;
        text-transform: uppercase;
        text-align: center;
        margin-top: 5px;
      }
    }

    &-data {
      display: flex;
      flex-direction: column;

      &-values {
        display: flex;
        align-items: center;
        padding: 0 20px 20px;
        width: 100%;

        &-item {
          display: flex;
          flex-direction: column;
          width: 50%;

          &-title {
            font-size: 12px;
            color: #8e9aac;
            margin-bottom: 5px;

            &.-rtl {
              text-align: right;
            }
          }

          &-value {
            font-size: 18px;
            color: #8e9aac;

            &.-up,
            &.-profit {
              color: #47BF6F;
            }

            &.-down,
            &.-loss {
              color: #FF4B5F;
            }

            &.-rtl {
              text-align: right;
            }
          }
        }
      }

      &-collapse {
        display: flex;
        padding: 0 20px 20px;

        &-title {
          font-size: 14px;
          color: #3B4B68;
        }

        &-chevron {

          &.-ltr {
            margin-right: 10px;
          }

          &.-rtl {
            margin-left: 10px;
          }

          svg {
            width: 11px;
            fill: #3B4B68;
          }
        }
      }

      &-conditions {
        padding: 0 20px 20px;

        &-row {
          display: flex;
          flex-direction: column;
          width: 100%;
          margin-bottom: 15px;

          &-column {
            display: flex;
            flex-direction: column;
            width: 50%;

            &.-ltr {
              &:nth-child(1) {
                padding-right: 10px;
              }

              &:nth-child(2) {
                padding-left: 10px;
              }
            }

            &.-rtl {
              &:nth-child(1) {
                padding-left: 10px;
              }

              &:nth-child(2) {
                padding-right: 10px;
              }
            }
          }

          &-title {
            font-size: 12px;
            color: #8e9aac;

            &.-rtl {
              text-align: right;
            }
          }

          &-input {
            padding: 0 8px;

            &.-small {
              height: 30px;

              div, input {
                height: 28px;
              }
            }

            &.-loss {
              input {
                color: #FF4B5F;
              }
            }

            &.-profit {
              input {
                color: #47BF6F;
              }
            }

            input {
              border: none;
              padding: 4px 0;
              text-align: center;
              font-size: 14px;
            }

            svg {
              width: 12px;
              height: 12px;
            }

          }

          &-hint {
            font-size: 12px;
            color: #8e9aac;

            &.-rtl {
              text-align: right;
            }
          }
        }
      }

      &-buttons {
        display: flex;
        flex-direction: column;
        padding: 0 20px 20px;
        width: 100%;

        &-button {
          padding-top: 13px !important;
          padding-bottom: 11px !important;
          font-size: 16px !important;

          &:nth-child(1) {
            margin-bottom: 20px;
          }
        }
      }
    }
  }
</style>
