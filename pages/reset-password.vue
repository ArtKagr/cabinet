<template>
  <div class="registration-form">
    <div class="registration-form-container">
      <div class="modal-container-head" :class="`-${formTitle}`">
        <span class="modal-container-head-title" :class="{ 'ml-auto': isRtlMode }" v-text="$t('Восстановление пароля')" />
      </div>
      <form-bubble />
    </div>
  </div>
</template>

<script>
import FormBubble from '~/components/modal/forms/form-bubble'
export default {
  name: 'ResetPassword',
  components: { FormBubble },
  layout: 'empty',
  middleware: ['auth-login'],
  data () {
    return {
      page: 'authorization'
    }
  },
  computed: {
    isRtlMode () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode']
    },
    formTitle () {
      return this.$store.getters['forms/getters/handler/getFormTitle']
    },
    title () {
      return this.$t('Восстановление пароля')
    },
    authorizationLinks () {
      // Ссылки на начальном экране
      return [
        { title: this.$t('Условия использования'), link: '/termsofuse' },
        { title: this.$t('Конфиденциальность'), link: '/privacy' },
        { title: this.$t('Политика AML'), link: '/amlpolicy' },
        { title: this.$t('Предупреждение о рисках'), link: '/riskdisclosure' },
        { title: this.$t('Оставить отзыв'), link: '/feedback' }
      ]
    }
  },
  async created () {
    await this.fetchForm()
  },
  methods: {
    fetchForm () {
      this.$store.dispatch('forms/actions/handler/fetchForm', 'resetPassword')
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
