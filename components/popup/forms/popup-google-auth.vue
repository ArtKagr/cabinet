<template>
  <div class="popup-google_auth">
    <div class="popup-google_auth-head">
      <span class="popup-google_auth-head-title" :class="`-${dir}`" v-text="$t('Введите проверочный код')" />
    </div>
    <div class="popup-google_auth-body">
      <div class="d-flex flex-column">
        <span class="text-secondary-13 mb-2" :class="isRtlMode ? 'text-right' : ''">
          <span v-if="isRtlMode" class="font-weight-500 ml-1" v-text="googleAuth.setup_key" />
          {{ $t('Ваш ключ настройки') }}
          <span v-if="!isRtlMode" class="font-weight-500 ml-1" v-text="googleAuth.setup_key" />
        </span>
        <span
          class="text-secondary-13 mb-3"
          :class="isRtlMode ? 'text-right' : ''"
          v-text="$t('Просканируйте QR-код с помощью приложения Google Authenticator')"
        />
        <img class="mx-auto" style="width: 200px; height: 200px;" :src="googleAuth.qr" alt>
        <div class="d-flex flex-column" style="padding-bottom: 30px;">
          <span
            class="text-dark-primary-12 mt-3 mb-1"
            :class="isRtlMode ? 'text-right' : ''"
            style="color: #6d788a;"
            v-text="$t('Введите проверочный код из приложения Google Authenticator')"
          />
          <b-input
            v-model="googleCode"
            style="padding: 9px 10px;"
            :dir="dir"
          />
        </div>
        <b-button class="text-white-16" variant="primary" @click="toggleGoogleAuth" v-text="$t('Подтвердить')" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PopupGoogleAuth',
  data () {
    return {
      googleCode: null
    }
  },
  computed: {
    isRtlMode () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode']
    },
    dir () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode'] ? 'rtl' : 'ltr'
    },
    googleAuth () {
      return this.$store.getters['profile/getters/handler/getGoogleAuth']
    }
  },
  methods: {
    togglePopup (value) {
      this.$store.commit('dictionaries/mutations/handler/TOGGLE_POPUP', {
        rootData: this.$store.state.dictionaries.state.handler,
        data: value
      })
    },
    toggleGoogleAuth () {
      this.$store.dispatch('profile/actions/handler/toggleGoogleAuth', this.googleCode)
      this.togglePopup(false)
    }
  }
}
</script>
<style lang="scss">
  .popup-google_auth {
    display: flex;
    flex-direction: column;

    &-head {
      display: flex;
      padding: 24px 30px;
      border-bottom: 1px solid #d9dce1;

      &-title {
        font-size: 20px;
        color: #3B4B68;

        &.-rtl {
          text-align: right;
        }
      }
    }

    &-body {
      padding: 20px 30px;
    }
  }
</style>
