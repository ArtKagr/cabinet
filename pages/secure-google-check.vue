<template>
  <div class="registration-form">
    <div class="registration-form-container">
      <div class="modal-container-head" :class="`-${formTitle}`">
        <span class="modal-container-head-title" :class="{ 'ml-auto': isRtlMode }" v-text="$t('Восстановление пароля')" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SecureGoogleCheck',
  layout: 'empty',
  middleware: ['auth-login'],
  computed: {
    isRtlMode () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode']
    },
    formTitle () {
      return this.$store.getters['forms/getters/handler/getFormTitle']
    }
  },
  async created () {
    await this.fetchForm()
  },
  methods: {
    fetchForm () {
      this.$store.dispatch('forms/actions/handler/fetchForm', 'secureGoogleCheck')
    }
  }
}
</script>
