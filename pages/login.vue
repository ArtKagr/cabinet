<template>
  <div class="registration-form">
    <div class="registration-form-container">
      <div class="modal-container-head" :class="`-${formTitle}`">
        <span
          class="modal-container-head-title"
          v-text="$t('Логин в {company-name}', { 'company-name': isEuAccount ? 'Liteforex (Europe) Ltd' : 'LiteFinance Global LLC' })"
        />
      </div>
      <form-login />
    </div>
    <span class="authorization-action mt-4">
      {{ $t('Еще не зарегистрированы?') }}
      <span class="text-primary-14 pointer" @click="openRegistration" v-text="$t('Регистрация')" />
    </span>
  </div>
</template>

<script>
import FormLogin from '~/components/modal/forms/form-login'
export default {
  name: 'Login',
  components: { FormLogin },
  layout: 'empty',
  middleware: ['auth-login'],
  computed: {
    formTitle () {
      return this.$store.getters['forms/getters/handler/getFormTitle']
    },
    isEuAccount () {
      return this.$store.getters['forms/getters/handler/getIsEuCountry']
    },
    authorizationLinks () {
      // Ссылки на начальном экране
      const result = [
        { title: this.$t('Условия использования'), link: '/termsofuse' },
        { title: this.$t('Конфиденциальность'), link: '/privacy' },
        { title: this.$t('Политика AML'), link: '/amlpolicy' },
        { title: this.$t('Предупреждение о рисках'), link: '/riskdisclosure' },
        { title: this.$t('Оставить отзыв'), link: '/feedback' }
      ]
      return this.isRtlMode ? result.reverse() : result
    }
  },
  async created () {
    await this.fetchForm()
  },
  methods: {
    fetchForm () {
      this.$store.dispatch('forms/actions/handler/fetchForm', 'loginPage')
    },
    openRegistration () {
      this.$router.push(`/${this.routePages.locale}/registration`)
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
