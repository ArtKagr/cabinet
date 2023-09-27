<template>
  <div class="popup-mt_settings">
    <div class="popup-mt_settings-head">
      <span class="popup-mt_settings-head-title" :class="`-${dir}`" v-text="$t('Удалить кошелек?')" />
    </div>
    <div class="popup-mt_settings-buttons">
      <b-button variant="outline-primary" @click="togglePopup(false)" v-text="$t('Нет')" />
      <b-button variant="primary" @click="deleteWallet" v-text="$t('Да')" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'PopupFinanceDeleteWallet',
  computed: {
    isRtlMode () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode']
    },
    dir () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode'] ? 'rtl' : 'ltr'
    }
  },
  destroyed () {
    localStorage.removeItem('deleted_wallet')
  },
  methods: {
    togglePopup (value) {
      this.$store.commit('dictionaries/mutations/handler/TOGGLE_POPUP', {
        rootData: this.$store.state.dictionaries.state.handler,
        data: value
      })
    },
    async deleteWallet () {
      const id = localStorage.getItem('deleted_wallet')
      await this.$store.dispatch('finance/actions/handler/deleteWallet', id)
      await this.togglePopup(false)
    }
  }
}
</script>
