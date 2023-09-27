<template>
  <div class="popup-trading-card-warning">
    <div class="popup-trading-card-warning-head">
      <span class="popup-trading-card-warning-head-name" :class="`-${dir}`" v-text="$t('Внимание')" />
    </div>
    <div class="popup-trading-card-warning-body" :class="`-${dir}`">
      <div
        class="popup-trading-card-warning-body-text"
        :class="`-${dir}`"
        v-text="$t(`Сделки в кабинете клиента осуществляются в режиме 'Быстрой торговли'. Выбрав опцию 'Применить', Вы тем самым подтверждаете, что прочитали, поняли и согласны со всеми условиями ниже.`)"
      />
      <div
        class="popup-trading-card-warning-body-text"
        :class="`-${dir}`"
        v-text="$t(`Режим отправки торговых приказов 'Быстрая торговля' состоит из одного этапа. Ваш торговый приказ будет отправлен сразу, при одиночном нажатии кнопок 'Продать' или 'Купить'`)"
      />
      <div
        class="popup-trading-card-warning-body-text -dark"
        :class="`-${dir}`"
        v-text="$t(`Вам не будет предложено подтвердить торговый приказ. При нормальных рыночных условиях и производительности системы сделка будет оперативно исполнена после отправки приказа, и после этого Вы будете связаны обязательствами сделки.`)"
      />
    </div>
    <div class="popup-trading-card-warning-buttons">
      <b-button class="popup-trading-card-warning-buttons-button" :class="`-${dir}`" variant="outline-primary" @click="buttonHandler(false)" v-text="$t('Вернуться')" />
      <b-button class="popup-trading-card-warning-buttons-button" :class="`-${dir}`" variant="primary" @click="buttonHandler(true)" v-text="$t('Применить')" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'PopupTradingCardWarning',
  computed: {
    dir () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode'] ? 'rtl' : 'ltr'
    }
  },
  methods: {
    buttonHandler (flag) {
      this.toggleSwitch(flag)
      this.$store.dispatch('dictionaries/actions/handler/showPopup', 'trading-card-display')
    },
    toggleSwitch (flag) {
      this.$store.commit('trading/mutations/handler/UPDATE_TRADING_CARD_SETTINGS_COPY', {
        rootData: this.$store.state.trading.state.handler,
        data: { field: 'buttons', flag },
        mode: 'update'
      })
    }
  }
}
</script>
<style lang="scss">
  .popup-trading-card-warning {

    &-head {
      display: flex;
      padding: 18px 20px 9px 20px;

      &-name {
        font-size: 20px;
        color: #3B4B68;

        &.-rtl {
          text-align: right;
        }
      }
    }

    &-body {
      padding: 0 60px 18px 20px;

      &.-rtl {
        padding: 0 20px 18px 60px;
      }

      &-text {
        font-size: 13px;
        color: #8e9aac;
        margin-bottom: 7px;
        line-height: 1.4;

        &.-rtl {
          text-align: right;
        }

        &.-dark {
          color: #3B4B68;
          margin-bottom: 0;
        }
      }
    }

    &-buttons {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      padding: 0 20px 20px 20px;

      &-button {

        &.-ltr {
          &:nth-child(1) {
            margin-right: 15px;
          }
        }

        &.-rtl {
          &:nth-child(2) {
            margin-right: 15px;
          }
        }
      }
    }
  }
</style>
