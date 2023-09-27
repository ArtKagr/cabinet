<template>
  <div class="popup-google_auth">
    <div class="popup-google_auth-head">
      <span class="popup-google_auth-head-title" :class="`-${dir}`" v-text="$t('Введите код из SMS')" />
    </div>
    <div class="popup-google_auth-body">
      <div class="d-flex flex-column">
        <span
          v-if="isTitleVisible"
          class="text-secondary-13 mb-3"
          :class="isRtlMode ? 'text-right' : ''"
          v-text="$t('На номер {phone} в течении минуты должно прийти сообщение с кодом.', { phone: user.phone })"
        />
        <b-input
          v-model="smsCode"
          :placeholder="$t('Введите проверочный код из SMS')"
          :dir="dir"
          style="padding: 9px 10px;"
        />
        <div class="d-flex flex-column mt-3 mb-4">
          <span
            v-if="timer === 0"
            class="text-primary-13 font-weight-500 w-100 pointer"
            :class="isRtlMode ? '' : 'text-right'"
            @click="resendSmsCode"
            v-text="$t('Отправить код повторно')"
          />
          <span
            v-else
            class="text-secondary-13 w-100"
            :class="isRtlMode ? '' : 'text-right'"
          >
            {{ $t('Запросить код повторно можно через {time}', { time: moment(timer).format('mm:ss') }) }}
          </span>
        </div>
        <b-button class="text-white-16" variant="primary" @click="toggleSmsAuth" v-text="$t('Подтвердить')" />
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  name: 'PopupSmsAuth',
  data () {
    return {
      moment,
      smsCode: null,
      timer: 0,
      isTitleVisible: false
    }
  },
  computed: {
    isRtlMode () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode']
    },
    dir () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode'] ? 'rtl' : 'ltr'
    },
    smsAuth () {
      return this.$store.getters['profile/getters/handler/getSmsAuth']
    },
    user () {
      return this.$store.getters['dictionaries/getters/user/getUser']
    }
  },
  watch: {
    smsAuth: {
      handler (newValue) {
        if (newValue.timer > 0) {
          this.isTitleVisible = true
          this.timer = newValue.timer * 1000
          setInterval(() => {
            if (this.timer > 0) {
              this.timer = this.timer - 100
            }
          }, 100)
        }
      },
      deep: true
    }
  },
  created () {
    if (this.smsAuth.timer > 0) {
      this.timer = this.smsAuth.timer * 1000
      setInterval(() => {
        if (this.timer > 0) {
          this.timer = this.timer - 100
        }
      }, 100)
    }
  },
  destroyed () {
    this.$store.commit('profile/mutations/handler/SAVE_SMS_AUTH', {
      rootData: this.$store.state.profile.state.handler,
      data: { message: null, timer: 0, trigger: null }
    })
  },
  methods: {
    togglePopup (value) {
      this.$store.commit('dictionaries/mutations/handler/TOGGLE_POPUP', {
        rootData: this.$store.state.dictionaries.state.handler,
        data: value
      })
    },
    toggleSmsAuth () {
      this.$store.dispatch('profile/actions/handler/toggleSmsAuth', this.smsCode)
      this.togglePopup(false)
    },
    resendSmsCode () {
      this.$store.dispatch('profile/actions/handler/resendSmsCode')
    }
  }
}
</script>
