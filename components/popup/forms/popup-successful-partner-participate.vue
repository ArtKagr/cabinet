<template>
  <div class="popup-successful-partner-conditions">
    <div class="popup-successful-partner-conditions-head">
      <span class="popup-successful-partner-conditions-head-title" :class="`-${dir}`" v-text="$t('Участие в конкурсе')" />
    </div>
    <div class="popup-successful-partner-conditions-body">
      <span :style="{ fontSize: '13px', color: '#8e9aac', textAlign: isRtlMode ? 'right' : 'left' }" v-text="$t('Я хочу принять участие в конкурсе')" />
      <div class="popup-successful-partner-conditions-body-buttons">
        <b-button
          class="popup-successful-partner-conditions-body-buttons-button"
          :class="`-${dir}`"
          variant="outline-primary"
          @click="togglePopup(false)"
          v-text="$t('Нет')"
        />
        <b-button
          class="popup-successful-partner-conditions-body-buttons-button"
          :class="`-${dir}`"
          variant="primary"
          @click="contestParticipate"
          v-text="$t('Да')"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PopupSuccessfulPartnerParticipate',
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
    async contestParticipate () {
      await this.$store.dispatch('partners/actions/handler/successfulPartnerParticipate')
      await this.togglePopup(false)
    }
  }
}
</script>
