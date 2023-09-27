<template>
  <div class="popup-mt_settings">
    <div class="popup-mt_settings-head">
      <span class="popup-mt_settings-head-title" :class="`-${dir}`" v-text="$t('Сделать счет основным')" />
    </div>
    <div class="popup-mt_settings-buttons">
      <b-button variant="outline-primary" @click="togglePopup(false)" v-text="$t('Нет')" />
      <b-button variant="primary" @click="setPrimaryAccount" v-text="$t('Да')" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'PopupMtSetPrimary',
  computed: {
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
    async setPrimaryAccount () {
      await this.$store.dispatch('metatrader/actions/handler/setPrimaryAccount')
      await this.togglePopup(false)
    }
  }
}
</script>
