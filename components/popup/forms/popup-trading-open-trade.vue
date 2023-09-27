<template>
  <div class="popup-trades_history">
    <div class="popup-trades_history-head">
      <span class="popup-trades_history-head-name" v-text="$t('Открытие сделки')" />
    </div>
    <div class="d-flex">
      <settings v-if="instrument && instrument.symbol_original" :instrument="instrument" source="popup" />
    </div>
  </div>
</template>

<script>
import Settings from '~/components/chart/trading/settings.vue'
export default {
  name: 'PopupTradingOpenTrade',
  components: { Settings },
  computed: {
    instrument () {
      return this.$store.getters['trading/getters/trading/getInstrumentFull']
    }
  }
}
</script>
