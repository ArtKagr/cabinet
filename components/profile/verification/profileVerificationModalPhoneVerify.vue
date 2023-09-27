<template>
  <div class="modal-container-content">
    <span
      class="text-badge-secondary mb-2"
      v-text="$t('На номер {number} в течении минуты должно прийти сообщение с кодом.', { number })"
    />
    <span class="d-flex justify-content-end align-items-center w-100 mb-2">
      <span
        class="text-badge-dark-secondary"
        v-text="$t('Запросить код повторно можно через {time}', { time })"
      />
      {{ ' ' }}
      <span class="text-badge-dark-secondary text-bold ml-2" v-text="time" />
    </span>
    <b-button variant="primary" class="mt-4" v-text="$t('Подтвердить')" />
  </div>
</template>

<script>
export default {
  name: 'ProfileVerificationModalPhoneVerify',
  components: {},
  computed: {
    user () {
      return this.$store.getters['dictionaries/getters/user/getUser']
    },
    number () {
      return '+79999999999'
    },
    time () {
      return '1:59'
    }
  }
}
</script>
