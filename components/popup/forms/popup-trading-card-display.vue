<template>
  <div class="popup-trades_history">
    <div class="popup-trades_history-head">
      <span class="popup-trades_history-head-name m-0" :class="`-${dir}`" v-text="$t('Настройка вида карточки')" />
    </div>
    <div class="popup-card-display-body">
      <div class="popup-card-display-body-info" :class="[`-${dir}`, windowWidth === 'sm' ? '-mobile' : '']">
        <lfx-icon-star class="popup-card-display-body-info-star" :class="`-${dir}`" />
        <lfx-symbol-trading-card symbol="EURUSD" class="popup-card-display-body-info-symbol" :class="`-${dir}`" />
        <div v-if="windowWidth === 'sm'" class="popup-card-display-body-info-data">
          <span class="popup-card-display-body-info-data-title" :class="`-${dir}`" v-text="'EUR/USD'" />
          <div class="popup-card-display-body-info-data-data">
            <div class="popup-card-display-body-info-data-data-quote" :class="`-${dir}`">
              <span class="popup-card-display-body-info-data-data-quote-value" :class="`-${dir}`" v-text="'1.12345'" />
              <span class="popup-card-display-body-info-data-data-quote-title" :class="`-${dir}`" v-text="$t('Котировка')" />
            </div>
            <div class="popup-card-display-body-info-data-data-change" :class="`-${dir}`">
              <span class="popup-card-display-body-info-data-data-change-value" :class="`-${dir}`" v-text="'1.23%'" />
              <span class="popup-card-display-body-info-data-data-change-title" :class="`-${dir}`" v-text="$t('Изменение')" />
            </div>
          </div>
        </div>
        <span v-else class="popup-card-display-body-info-title" v-text="'EUR/USD'" />
      </div>
      <div v-if="windowWidth !== 'sm'" class="popup-card-display-body-data">
        <div class="popup-card-display-body-data-quote">
          <span class="popup-card-display-body-data-quote-value" :class="`-${dir}`" v-text="'1.12345'" />
          <span class="popup-card-display-body-data-quote-title" :class="`-${dir}`" v-text="$t('Котировка')" />
        </div>
        <div class="popup-card-display-body-data-change" :class="`-${dir}`">
          <span class="popup-card-display-body-data-change-value" :class="`-${dir}`" v-text="'1.23%'" />
          <span class="popup-card-display-body-data-change-title" :class="`-${dir}`" v-text="$t('Изменение')" />
        </div>
      </div>
      <div class="popup-card-display-body-chart" :class="tradingCardSettingsCopy.chart ? '' : '-off'">
        <lfx-switch
          class="popup-card-display-body-chart-switch"
          :switch-state="tradingCardSettingsCopy.chart"
          @click-handler="switchHandler($event, 'chart')"
        />
        <div class="popup-card-display-body-chart-line" :class="`-${dir}`">
          <sparkline :width="cardWidth" height="80">
            <sparklineCurve :data="[0,1,2,3,2,3,4]" :limit="7" :styles="chartStyle" />
          </sparkline>
        </div>
        <div class="popup-card-display-body-chart-base" :class="tradingCardSettingsCopy.chart ? '' : '-off'" />
      </div>
      <div class="popup-card-display-body-settings" :class="[tradingCardSettingsCopy.info ? '' : '-off', `-${dir}`]">
        <lfx-switch
          class="popup-card-display-body-settings-switch"
          :switch-state="tradingCardSettingsCopy.info"
          @click-handler="switchHandler($event, 'info')"
        />
        <div class="popup-card-display-body-settings-mood" :class="`-${dir}`">
          <div class="popup-card-display-body-settings-mood-data" :class="`-${dir}`">
            <span class="popup-card-display-body-settings-mood-data-value" :class="`-${dir}`" v-text="'50%'" />
            <lfx-icon-arrow-down class="popup-card-display-body-settings-mood-data-arrow" />
          </div>
          <span class="popup-card-display-body-settings-mood-title" v-text="$t('Настроение')" />
        </div>
        <div class="popup-card-display-body-settings-volatility" :class="`-${dir}`">
          <span class="popup-card-display-body-settings-volatility-value" :class="`-${dir}`" v-text="'10%'" />
          <span class="popup-card-display-body-settings-volatility-title" :class="`-${dir}`" v-text="$t('Волатильность')" />
        </div>
        <div class="popup-card-display-body-settings-spread" :class="`-${dir}`">
          <span class="popup-card-display-body-settings-spread-value" :class="`-${dir}`" v-text="'5'" />
          <span class="popup-card-display-body-settings-spread-title" v-text="$t('Спред')" />
        </div>
      </div>
      <div class="popup-card-display-body-buttons" :class="tradingCardSettingsCopy.buttons ? '' : '-off'">
        <b-button class="popup-card-display-body-buttons-button" variant="danger">
          <span class="popup-card-display-body-buttons-button-value" v-text="'1.12340'" />
          <span class="popup-card-display-body-buttons-button-title" v-text="$t('Продать')" />
        </b-button>
        <div class="popup-card-display-body-buttons-switch">
          <lfx-switch
            :switch-state="tradingCardSettingsCopy.buttons"
            @click-handler="switchHandler($event, 'buttons')"
          />
        </div>
        <b-button class="popup-card-display-body-buttons-button" variant="success">
          <span class="popup-card-display-body-buttons-button-value" v-text="'1.12345'" />
          <span class="popup-card-display-body-buttons-button-title" v-text="$t('Купить')" />
        </b-button>
      </div>
      <div class="popup-card-display-body-button">
        <b-button class="w-100" variant="primary" @click="saveTradingCardSettings" v-text="$t('Применить')" />
      </div>
    </div>
  </div>
</template>

<script>
import LfxSymbolTradingCard from '~/components/_aux/lfx-symbol-trading-card'
import LfxSwitch from '~/components/_aux/lfx-switch'
import LfxIconStar from '~/components/icons/lfx-icon-star'
import LfxIconArrowDown from '~/components/icons/lfx-icon-arrow-down'
export default {
  name: 'PopupTradingCardDisplay',
  components: {
    LfxSymbolTradingCard,
    LfxSwitch,
    LfxIconStar,
    LfxIconArrowDown
  },
  computed: {
    dir () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode'] ? 'rtl' : 'ltr'
    },
    windowWidth () {
      return this.$store.getters['dictionaries/getters/handler/getCurrentWindowWidth']
    },
    windowWidthNumber () {
      return this.$store.getters['dictionaries/getters/handler/getCurrentNumberWindowWidth']
    },
    chartStyle () {
      return {
        stroke: this.tradingCardSettingsCopy.chart ? '#93CEF3' : '#dedfe1',
        fill: this.tradingCardSettingsCopy.chart ? '#DCf0FB' : '#f6f7f7',
        fillOpacity: 1,
        strokeWidth: 2
      }
    },
    tradingCardSettingsCopy () {
      return this.$store.getters['trading/getters/handler/getTradingCardSettingsCopy']
    },
    cardWidth () {
      let result
      switch (this.windowWidth) {
        case 'xl':
        case 'lg':
        case 'lg-md':
        case 'md':
          result = 390
          break
        case 'sm':
          result = this.windowWidthNumber
          break
      }
      return `${result}`
    }
  },
  created () {
    if (this.tradingCardSettingsCopy.mode === 'assign') {
      this.$store.commit('trading/mutations/handler/UPDATE_TRADING_CARD_SETTINGS_COPY', {
        data: this.$store.getters['trading/getters/handler/getTradingCardSettings'],
        mode: 'assign',
        rootData: this.$store.state.trading.state.handler
      })
    }
  },
  methods: {
    togglePopup (value) {
      this.$store.commit('dictionaries/mutations/handler/TOGGLE_POPUP', {
        rootData: this.$store.state.dictionaries.state.handler,
        data: value
      })
    },
    switchHandler (value, field) {
      if (field === 'buttons' && value === true) {
        this.$store.dispatch('dictionaries/actions/handler/showPopup', 'trading-card-warning')
      }
      this.$store.commit('trading/mutations/handler/UPDATE_TRADING_CARD_SETTINGS_COPY', {
        data: { field, flag: value },
        mode: 'update',
        rootData: this.$store.state.trading.state.handler
      })
    },
    saveTradingCardSettings () {
      this.$store.commit('trading/mutations/handler/UPDATE_TRADING_CARD_SETTINGS', {
        data: this.tradingCardSettingsCopy,
        rootData: this.$store.state.trading.state.handler
      })
      localStorage.setItem('trading_card_settings', JSON.stringify(this.tradingCardSettingsCopy))
      this.togglePopup(false)
    }
  }
}
</script>
<style lang="scss">
  .popup-card-display-body {
    display: flex;
    flex-direction: column;

    &-info {
      display: flex;
      align-items: center;
      position: relative;
      padding: 20px;
      border-top: 1px solid rgba(59,75,104,.25);

      &.-mobile {
        border-bottom: 1px solid rgba(59,75,104,.25);
      }

      &-star {
        position: absolute;
        top: 10px;

        &.-ltr {
          right: 10px;
        }

        &.-rtl {
          left: 10px;
        }
      }

      &-symbol {

        &.-ltr {
          margin-right: 10px;
        }

        &.-rtl {
          margin-left: 10px;
        }
      }

      &-title {
        color: #3b4b68;
        font-size: 15px;
        font-weight: 500;
      }

      &-data {
        display: flex;
        flex-direction: column;
        margin-left: 5px;

        &-title {
          font-size: 15px;
          font-weight: 500;
          color: #3b4b68;
          margin-bottom: 9px;
          line-height: 1;

          &.-rtl {
            text-align: right;
          }
        }

        &-data {
          display: flex;
          align-items: center;

          &-quote {
            display: flex;
            flex-direction: column;
            width: 90px;

            &-value {
              line-height: 1;
              font-size: 24px;
              color: #3B4B68;

              &.-rtl {
                text-align: right;
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
          }

          &-change {
            display: flex;
            flex-direction: column;
            width: 90px;

            &.-ltr {
              margin-left: 20px;
            }

            &.-rtl {
              margin-right: 20px;
            }

            &-value {
              line-height: 1;
              font-size: 24px;
              color: #47BF6F;

              &.-rtl {
                text-align: right;
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
          }
        }
      }
    }

    &-data {
      display: flex;
      align-items: center;
      padding: 0 20px 20px;
      border-bottom: 1px solid rgba(59,75,104,.25);

      &-quote {
        display: flex;
        flex-direction: column;
        width: 170px;

        &-value {
          line-height: 1;
          font-size: 28px;
          color: #3B4B68;

          &.-rtl {
            text-align: right;
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
      }

      &-change {
        display: flex;
        flex-direction: column;
        width: 90px;

        &-value {
          line-height: 1;
          font-size: 28px;
          color: #47BF6F;

          &.-rtl {
            text-align: right;
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
      }
    }

    &-chart {
      display: flex;
      flex-direction: column;
      position: relative;
      height: 100px;
      overflow: hidden;
      border-bottom: 1px solid rgba(59,75,104,.25);

      &.-traders_settings {
        border-top: 1px solid rgba(59,75,104,.25);
      }

      &.-off {
        background-color: #f6f7f7;

        .popup-card-display-body-chart-switch {
          opacity: 0.4;
        }
      }

      &-switch {
        position: absolute;
        top: calc(50% - 24px);
        left: calc(50% - 30px);
        z-index: 1000;
        cursor: pointer;
      }

      &-line {

        div {
          svg {
            width: 362px !important;
            transform: translateY(2px);

            g {
              line {
                display: none !important;
              }
            }

            line {
              display: none !important;
            }

            @media screen and (max-width: 767px) {
              width: 769px !important;
            }
          }
        }

        &.-rtl {
          div {
            svg {
              width: 362px !important;
              transform: translate(2px, 2px);

              @media screen and (max-width: 767px) {
                width: 769px !important;
              }
            }
          }
        }
      }

      &-base {
        height: 24px;
        background-color: #dcf0fb;

        &.-off {
          background-color: #f6f7f7;
        }
      }
    }

    &-settings {
      display: flex;
      align-items: center;
      position: relative;
      padding: 10px 20px 8px;
      background-color: #eaeced;
      border-bottom: 1px solid rgba(59,75,104,.25);

      &.-off {
        opacity: 0.4;
      }

      &-switch {
        position: absolute;
        left: calc(50% - 30px);
        z-index: 1000;
        cursor: pointer;
      }

      &-mood {
        display: flex;
        flex-direction: column;
        min-width: 60px;

        &-data {
          display: flex;
          align-items: center;

          &-value {
            font-size: 20px;
            line-height: 1.2;
            color: #ff4b5f;

            &.-ltr {
              margin-right: 5px;
            }

            &.-rtl {
              margin-left: 5px;
            }
          }

          &-arrow {
            width: 10px;
            height: 12px;
          }
        }

        &-title {
          font-size: 10px;
          text-transform: uppercase;
          color: #8e9aac;
        }
      }

      &-volatility {
        display: flex;
        flex-direction: column;

        &.-ltr {
          margin-left: 30px;
        }

        &.-rtl {
          margin-right: 30px;
        }

        &-value {
          font-size: 20px;
          line-height: 1.2;
          color: #3b4b68;

          &.-rtl {
            text-align: right;
          }
        }

        &-title {
          font-size: 10px;
          text-transform: uppercase;
          color: #8e9aac;
        }
      }

      &-spread {
        display: flex;
        flex-direction: column;

        &.-ltr {
          margin-left: 25px;
        }

        &.-rtl {
          margin-right: 25px;
        }

        &-value {
          font-size: 20px;
          line-height: 1.2;
          color: #3b4b68;

          &.-rtl {
            text-align: right;
          }
        }

        &-title {
          font-size: 10px;
          text-transform: uppercase;
          color: #8e9aac;
        }
      }
    }

    &-buttons {
      display: flex;
      align-items: center;
      justify-content: space-between;
      position: relative;
      padding: 10px;

      &.-off {
        opacity: 0.4;
      }

      &-switch {
        display: flex;
        justify-content: center;
        width: 30%;
        margin: 0 10px;
        border-radius: 3px;
        border: 1px solid #d9dce1;
        padding: 2px 0;
        cursor: pointer;
      }

      &-switch_icon {
        position: absolute;
        left: calc(50% - 30px);
      }

      &-button {
        display: flex;
        flex-direction: column;
        width: 35%;
        height: 50px;
        padding: 5px 5px 3px;

        &:hover {
          opacity: 1 !important;
        }

        &-value {
          font-size: 18px !important;
          font-weight: 500 !important;
          line-height: 1.2 !important;
        }

        &-title {
          font-size: 12px !important;
          font-weight: 500 !important;
          line-height: 1.2 !important;
        }
      }
    }

    &-button {
      padding: 20px;
      border-top: 1px solid rgba(59,75,104,.25);

      button {
        font-size: 16px !important;
      }
    }
  }
</style>
