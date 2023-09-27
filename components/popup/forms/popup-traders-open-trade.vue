<template>
  <div class="popup-trades_history">
    <div class="popup-trades_history-head">
      <span class="popup-trades_history-head-name" v-text="$t('Копирование')" />
    </div>
    <div class="d-flex">
      <settings source="popup" />
    </div>
  </div>
</template>

<script>
import Settings from '~/components/chart/traders/settings.vue'
export default {
  name: 'PopupTradersOpenTrade',
  components: { Settings }
}
</script>
