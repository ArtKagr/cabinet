<template>
  <div class="popup-verification-islamic">
    <div class="popup-verification-islamic-head">
      <span class="popup-verification-islamic-head-title" v-text="$t('Заявка на исламский счет')" />
    </div>
    <div class="popup-verification-islamic-body">
      <a
        class="popup-verification-islamic-body-conditions"
        href="https://www.litefinance.org/uploads/documents/pdf-litefinance/litefinance-swap-free-accounts-terms-of-use-ru.pdf"
        target="_blank"
        v-text="$t('Условия предоставления сервиса {name}', { name: 'Islamic Account' })"
      />
      <div class="popup-verification-islamic-body-accept" :class="{ '-error': error }" @click="toggleAccept">
        <lfx-icon-checkbox-error v-if="error" class="popup-verification-islamic-body-accept-icon" :class="`-${dir}`" />
        <lfx-icon-checkbox-fill v-else-if="isAccept" class="popup-verification-islamic-body-accept-icon" :class="`-${dir}`" />
        <lfx-icon-checkbox v-else class="popup-verification-islamic-body-accept-icon" :class="`-${dir}`" />
        <span
          class="popup-verification-islamic-body-accept-text"
          v-text="$t('Я прочитал и принимаю условия предоставления сервиса')"
        />
      </div>
      <span
        v-if="error"
        class="popup-verification-islamic-body-accept_error"
        :class="`-${dir}`"
        v-text="$t('Вам необходимо подтвердить согласие с условиями соглашения для продолжения')"
      />
      <b-button
        class="popup-verification-islamic-body-button"
        variant="primary"
        @click="sendAcceptation"
        v-text="$t('Отправить')"
      />
    </div>
  </div>
</template>

<script>
import LfxIconCheckbox from '~/components/icons/lfx-icon-checkbox'
import LfxIconCheckboxFill from '~/components/icons/lfx-icon-checkbox-fill'
import LfxIconCheckboxError from '~/components/icons/lfx-icon-checkbox-error'
export default {
  name: 'PopupVerificationIslamic',
  components: { LfxIconCheckboxError, LfxIconCheckboxFill, LfxIconCheckbox },
  data () {
    return {
      isAccept: false,
      error: false
    }
  },
  computed: {
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
    toggleAccept () {
      this.isAccept = !this.isAccept

      if (this.isAccept) {
        this.error = false
      }
    },
    sendAcceptation () {
      if (!this.isAccept) {
        this.error = true
      } else {
        this.$store.dispatch('profile/actions/handler/swapFreeEnable')
        this.togglePopup(false)
      }
    }
  }
}
</script>
<style lang="scss">
  .popup-verification-islamic {
    display: flex;
    flex-direction: column;

    &-head {
      display: flex;
      align-items: center;
      padding: 28px 30px;
      border-bottom: 1px solid #d9dce1;

      &-title {
        font-size: 20px;
        color: #3B4B68;
        line-height: 1;
      }
    }

    &-body {
      display: flex;
      flex-direction: column;
      padding: 20px 30px 30px 30px;

      &-conditions {
        font-size: 12px;
        padding: 10px 15px;
        border-radius: 3px;
        border: 1px solid #3498db;
        width: 100%;
        text-align: center;

        &:hover {
          text-decoration: none;
          color: #3498db;
        }
      }

      &-accept {
        display: flex;
        align-items: center;
        cursor: pointer;
        margin: 30px 0;

        &.-error {
          margin: 30px 0 5px;
        }

        &-icon {

          &.-ltr {
            margin-right: 20px;
          }

          &.-rtl {
            margin-left: 20px;
          }
        }

        &-text {
          font-size: 12px;
          color: #6d788a;
        }
      }

      &-accept_error {
        font-size: 10px;
        text-transform: uppercase;
        color: #ff4b5f;
        margin-bottom: 30px;

        &.-rtl {
          text-align: right;
        }
      }

      &-button {
        width: 100%;
      }
    }
  }
</style>
