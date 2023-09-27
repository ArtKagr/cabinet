<template>
  <div class="registration-form">
    <div class="registration-form-container">
      <div class="modal-container-head" :class="`-${formTitle}`">
        <span v-if="isEuAccount" class="modal-container-head-title" v-text="$t('Liteforex (Europe) Ltd: регистрация на форекс')" />
        <span v-else class="modal-container-head-title" v-text="$t('LiteFinance Global LLC: регистрация на форекс')" />
      </div>
      <form-registration />
    </div>
    <span class="authorization-action mt-4">
      {{ $t('Уже зарегистрированы?') }}
      <span class="text-primary-14 pointer" @click="openLogin" v-text="$t('Вход')" />
    </span>
  </div>
</template>

<script>
import form from '~/mixins/form'
import FormRegistration from '~/components/modal/forms/form-registration'
export default {
  name: 'Registration',
  components: { FormRegistration },
  mixins: [form],
  layout: 'empty',
  middleware: ['auth-login'],
  data () {
    return {
      page: 'authorization'
    }
  },
  computed: {
    isEuAccount () {
      return this.$store.getters['forms/getters/handler/getIsEuCountry']
    },
    title () {
      return this.$t('LiteForex: регистрация на форекс')
    },
    authorizationLinks () {
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
      this.$store.dispatch('forms/actions/handler/fetchForm', 'registrationPage')
    },
    openLogin () {
      this.$router.push(`/${this.routePages.locale}/login`)
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
