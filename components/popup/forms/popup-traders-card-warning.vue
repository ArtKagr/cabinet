<template>
  <div class="popup-trading-card-warning">
    <div class="popup-trading-card-warning-head">
      <span class="popup-trading-card-warning-head-name" :class="`-${dir}`" v-text="$t('Внимание')" />
    </div>
    <div class="popup-trading-card-warning-body" :class="`-${dir}`">
      <div
        class="popup-trading-card-warning-body-text"
        :class="`-${dir}`"
        v-text="$t(`Копирование в кабинете клиента осуществляются в режиме 'Быстрой торговли'. Выбрав опцию 'Применить', Вы тем самым подтверждаете, что прочитали, поняли и согласны со всеми нижеизложенными условиями.`)"
      />
      <div
        class="popup-trading-card-warning-body-text"
        :class="`-${dir}`"
        v-text="$t(`Режим отправки торговых команд 'Быстрая торговля' состоит из одного этапа. Ваша торговая команда будет отправлена сразу, при одиночном нажатии кнопки 'Копировать'`)"
      />
      <div
        class="popup-trading-card-warning-body-text -dark"
        :class="`-${dir}`"
        v-text="$t(`Вам не будет предложено подтвердить начало копирования. При нормальных рыночных условиях и производительности системы копирование будет начато после отправки команды, и после этого Вы будете связаны обязательствами сделки.`)"
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
  name: 'PopupTradersCardWarning',
  computed: {
    dir () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode'] ? 'rtl' : 'ltr'
    }
  },
  methods: {
    buttonHandler (flag) {
      this.toggleSwitch(flag)
      this.$store.dispatch('dictionaries/actions/handler/showPopup', 'traders-card-display')
    },
    toggleSwitch (flag) {
      this.$store.commit('traders/mutations/handler/UPDATE_TRADER_CARD_SETTINGS_COPY', {
        data: { field: 'buttons', flag },
        mode: 'update',
        rootData: this.$store.state.traders.state.handler
      })
    }
  }
}
</script>
