<template>
  <div class="registration-form">
    <div class="registration-form-container">
      <div class="modal-container-head" :class="`-${formTitle}`">
        <span class="modal-container-head-title" :class="{ 'ml-auto': isRtlMode }" v-text="$t('Сброс пароля')" />
      </div>
      <form-bubble />
    </div>
  </div>
</template>

<script>
import FormBubble from '~/components/modal/forms/form-bubble'
export default {
  name: 'ResetPasswordConfirmEmail',
  components: { FormBubble },
  layout: 'empty',
  middleware: ['auth-login'],
  data () {
    return {
      page: 'authorization'
    }
  },
  computed: {
    formTitle () {
      return this.$store.getters['forms/getters/handler/getFormTitle']
    },
    isRtlMode () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode']
    },
    title () {
      return this.$t('Сброс пароля')
    }
  },
  async created () {
    await this.fetchForm()
  },
  methods: {
    fetchForm () {
      this.$store.dispatch('forms/actions/handler/fetchForm', 'confirmEmail')
    }
  }
}
</script>
<style lang="scss">
.registration-form {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  &-container {
    background-color: white;
    width: 480px;
    border: 1px solid #d9dce1;

    @media screen and (max-width: 767px) {
      width: 100%;
      height: 100%;
      border: none;
    }
  }
}
</style>
