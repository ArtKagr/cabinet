<template>
  <div class="popup-mt_settings">
    <div class="popup-mt_settings-head">
      <span class="popup-mt_settings-head-title mb-2" :class="`-${dir}`" v-text="$t('Обнуление статистики')" />
      <span class="text-secondary-13" :class="isRtlMode ? 'text-right' : ''" v-text="$t('Торговая история счета обнулится, а инвесторы будут откреплены')" />
    </div>
    <div class="popup-mt_settings-buttons">
      <b-button variant="outline-primary" @click="togglePopup(false)" v-text="$t('Нет')" />
      <b-button variant="primary" @click="resetStatistics" v-text="$t('Да')" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'PopupMtResetStatistics',
  computed: {
    isRtlMode () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode']
    },
    dir () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode'] ? 'rtl' : 'ltr'
    }
  },
  methods: {
    togglePopup (value) {
      this.$store.commit('dictionaries/mutations/handler/TOGGLE_POPUP', {
        rootData: this.$store.state.dictionaries.state.handler,
        data: value
      })
    },
    async resetStatistics () {
      await this.$store.dispatch('metatrader/actions/handler/userTraderReset')
      await this.togglePopup(false)
    }
  }
}
</script>
