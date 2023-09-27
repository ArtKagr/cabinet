<template>
  <div class="profile-page-verification">
    <div class="profile-page-verification-container">
      <div class="profile-page-verification-container-row">
        <div class="profile-page-verification-container-row-data">
          <div class="profile-page-verification-container-row-data-container flex-column align-items-start">
            <span class="profile-page-verification-container-row-data-container-title mb-1" v-text="$t('Пароль')" />
            <span class="profile-page-verification-container-row-data-container-value font-weight-bold" v-text="'*******'" />
          </div>
        </div>
        <b-button
          class="profile-page-verification-container-row-button"
          variant="outline-primary"
          @click="fetchForm('password')"
          v-text="$t('Изменить')"
        />
      </div>
      <div class="profile-page-verification-container-row">
        <div class="profile-page-verification-container-row-data">
          <div class="profile-page-verification-container-row-data-container">
            <span class="profile-page-verification-container-row-data-container-title" v-text="$t('Google аутентификация')" />
          </div>
          <div class="profile-page-verification-container-row-data-container m-0 mt-1">
            <b-button
              :style="badgeStyle"
              :variant="securityStatusList.isAuthGoogle ? 'success-badge' : 'outline-danger-badge'"
              v-text="securityStatusList.isAuthGoogle ? $t('Включено') : $t('Отключено')"
            />
          </div>
        </div>
        <b-button
          class="profile-page-verification-container-row-button"
          variant="outline-primary"
          @click="googleAuth('google-auth')"
          v-text="securityStatusList.isAuthGoogle ? $t('Отключить') : $t('Включить')"
        />
      </div>
      <div class="profile-page-verification-container-row">
        <div class="profile-page-verification-container-row-data">
          <div class="profile-page-verification-container-row-data-container">
            <span class="profile-page-verification-container-row-data-container-title" v-text="$t('SMS аутентификация')" />
          </div>
          <div class="profile-page-verification-container-row-data-container m-0 mt-1">
            <b-button
              :style="badgeStyle"
              :variant="securityStatusList.isAuthSms ? 'success-badge' : 'outline-danger-badge'"
              v-text="securityStatusList.isAuthSms ? $t('Включено') : $t('Отключено')"
            />
          </div>
        </div>
        <b-button
          class="profile-page-verification-container-row-button"
          variant="outline-primary"
          @click="smsAuth('sms-auth')"
          v-text="securityStatusList.isAuthSms ? $t('Отключить') : $t('Включить')"
        />
      </div>
      <div class="profile-page-verification-container-row">
        <div class="profile-page-verification-container-row-data">
          <div class="profile-page-verification-container-row-data-container">
            <span class="profile-page-verification-container-row-data-container-title" v-text="$t('Email аутентификация')" />
          </div>
          <div class="profile-page-verification-container-row-data-container m-0 mt-1">
            <b-button
              :style="badgeStyle"
              :variant="securityStatusList.isAuthEmail ? 'success-badge' : 'outline-danger-badge'"
              v-text="securityStatusList.isAuthSms ? $t('Включено') : $t('Отключено')"
            />
          </div>
        </div>
        <b-button
          class="profile-page-verification-container-row-button"
          variant="outline-primary"
          @click="emailAuth('email-auth')"
          v-text="securityStatusList.isAuthEmail ? $t('Отключить') : $t('Включить')"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Security',
  data () {
    return {
      badgeStyle: { padding: '5px 10px 3px', lineHeight: 1, fontSize: '10px', borderRadius: '3px' }
    }
  },
  head () {
    return {
      title: this.$store.getters['dictionaries/getters/handler/getHeadTitle'](`${this.$t('Безопасность')}`)
    }
  },
  computed: {
    securityStatusList () {
      return this.$store.getters['profile/getters/handler/getSecurityStatusList']
    }
  },
  async created () {
    await this.$store.dispatch('profile/actions/handler/fetchSecurityStatuses')
  },
  methods: {
    fetchForm (formTitle) {
      this.$store.dispatch('forms/actions/handler/fetchForm', formTitle)
    },
    async googleAuth (activePopup) {
      await this.$store.dispatch('profile/actions/handler/fetchGoogleAuth')
      await this.$store.dispatch('dictionaries/actions/handler/showPopup', activePopup)
    },
    async smsAuth (activePopup) {
      await this.$store.dispatch('profile/actions/handler/fetchSmsAuth')
      await this.$store.dispatch('dictionaries/actions/handler/showPopup', activePopup)
    },
    async emailAuth (activePopup) {
      await this.$store.dispatch('profile/actions/handler/fetchEmailAuth')
      await this.$store.dispatch('dictionaries/actions/handler/showPopup', activePopup)
    }
  }
}
</script>
