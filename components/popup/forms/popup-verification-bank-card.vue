<template>
  <div class="popup-verification-need-docs">
    <div class="popup-verification-need-docs-head">
      <span class="popup-verification-need-docs-head-title" :class="`-${dir}`" v-text="`${title} ${activeTransaction.number}`" />
    </div>
    <div v-if="texts && texts.length" class="popup-verification-need-docs-body">
      <span
        class="popup-verification-need-docs-body-text mb-0"
        :class="`-${dir}`"
        v-text="texts[0].content"
      />
      <span
        v-for="(item, key) in list"
        :key="key"
        class="popup-verification-need-docs-body-text"
        :class="[`-${dir}`, key === list.length - 1 ? '' : 'mb-0']"
        v-text="item"
      />
      <span
        class="popup-verification-need-docs-body-text -bold mb-0"
        :class="`-${dir}`"
        v-html="texts[1].content"
      />
    </div>
    <span
      class="popup-status"
      :class="`-${currentBankCard.doc_front}`"
      v-text="getDocFrontStatus"
    />
    <div class="popup-verification-need-docs-upload_block" :style="{ marginBottom: cardFrontStatus ? '0' : '20px' }">
      <div class="popup-verification-need-docs-upload_block-container">
        <span class="popup-verification-bank-card-block-container-hint" :class="`-${dir}`" v-text="cardFrontHint" />
        <div class="popup-verification-need-docs-upload_block-container-icon">
          <lfx-icon-waiting v-if="currentBankCard.doc_front === 'process'" class="popup-verification-need-docs-upload_block-container-icon-flag" />
          <lfx-icon-error-fill v-else-if="currentBankCard.doc_front === 'rejected'" class="popup-verification-need-docs-upload_block-container-icon-flag" />
          <lfx-icon-success-fill v-else-if="currentBankCard.doc_front === 'verified'" class="popup-verification-need-docs-upload_block-container-icon-flag" />
          <lfx-icon-add v-else class="popup-verification-need-docs-upload_block-container-icon-flag" />
          <lfx-icon-card-front class="popup-verification-need-docs-upload_block-container-icon-image" />
        </div>
        <div class="popup-status-field">
          <b-form-file
            v-model="cardFront"
            variant="transparent-primary"
            placeholder=""
            :browse-text="$t('Добавить файл')"
          />
        </div>
      </div>
    </div>
    <span
      v-if="cardFrontStatus"
      class="popup-status"
      :style="{ marginBottom: '20px' }"
      :class="cardFrontStatus === 'success' ? '-verified' : '-rejected'"
      v-text="cardFrontStatus === 'success' ? $t('Документ успешно загружен') : $t('Произошла ошибка при загрузке файла')"
    />
    <span
      class="popup-status"
      :class="`-${currentBankCard.doc_back}`"
      v-text="getDocBackStatus"
    />
    <div class="popup-verification-need-docs-upload_block">
      <div class="popup-verification-need-docs-upload_block-container">
        <span class="popup-verification-bank-card-block-container-hint" :class="`-${dir}`" v-text="cardBackHint" />
        <div class="popup-verification-need-docs-upload_block-container-icon">
          <lfx-icon-waiting v-if="currentBankCard.doc_back === 'process'" class="popup-verification-need-docs-upload_block-container-icon-flag" />
          <lfx-icon-error-fill v-else-if="currentBankCard.doc_back === 'rejected'" class="popup-verification-need-docs-upload_block-container-icon-flag" />
          <lfx-icon-success-fill v-else-if="currentBankCard.doc_back === 'verified'" class="popup-verification-need-docs-upload_block-container-icon-flag" />
          <lfx-icon-add v-else class="popup-verification-need-docs-upload_block-container-icon-flag" />
          <lfx-icon-card-back class="popup-verification-need-docs-upload_block-container-icon-image" />
        </div>
        <div class="popup-status-field">
          <b-form-file
            v-model="cardBack"
            variant="transparent-primary"
            placeholder=""
            :browse-text="$t('Добавить файл')"
          />
        </div>
      </div>
    </div>
    <span
      v-if="cardBackStatus"
      class="popup-status"
      :class="cardBackStatus === 'success' ? '-verified' : '-rejected'"
      v-text="cardBackStatus === 'success' ? $t('Документ успешно загружен') : $t('Произошла ошибка при загрузке файла')"
    />
    <div class="popup-verification-need-docs-button">
      <b-button variant="primary" @click="togglePopup(false)" v-text="$t('Продолжить')" />
    </div>
  </div>
</template>

<script>
import LfxIconCardFront from '~/components/icons/lfx-icon-card-front'
import LfxIconCardBack from '~/components/icons/lfx-icon-card-back'
import LfxIconWaiting from '~/components/icons/lfx-icon-waiting'
import LfxIconErrorFill from '~/components/icons/lfx-icon-error-fill'
import LfxIconAdd from '~/components/icons/lfx-icon-add'
import LfxIconSuccessFill from '~/components/icons/lfx-icon-success-fill'
export default {
  name: 'PopupVerificationBankCard',
  components: {
    LfxIconSuccessFill,
    LfxIconAdd,
    LfxIconErrorFill,
    LfxIconWaiting,
    LfxIconCardBack,
    LfxIconCardFront
  },
  data () {
    return {
      cardFront: null,
      cardBack: null
    }
  },
  computed: {
    dir () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode'] ? 'rtl' : 'ltr'
    },
    verificationData () {
      return this.$store.getters['profile/getters/handler/getVerificationData']
    },
    info () {
      return this.$store.getters['profile/getters/handler/getVerificationDocInfo']
    },
    title () {
      const result = this.info.find(item => item.type === 'title')

      if (result && result.content) {
        return result.content
      }

      return ''
    },
    list () {
      const result = this.info.filter(item => item.type === 'list')

      if (result && result.length) {
        return result[0].content
      }

      return []
    },
    texts () {
      const result = this.info.filter((item, key) => [1, 5].includes(key))

      if (result && result.length) {
        return result
      }

      return []
    },
    cardFrontHint () {
      const result = this.info.find(item => item.type === 'card-front')

      if (result && result.content) {
        return result.content
      }

      return ''
    },
    cardBackHint () {
      const result = this.info.find(item => item.type === 'card-back')

      if (result && result.content) {
        return result.content
      }

      return ''
    },
    cardFrontStatus () {
      return this.$store.getters['dictionaries/getters/handler/getUploadCardFrontStatus']
    },
    cardBackStatus () {
      return this.$store.getters['dictionaries/getters/handler/getUploadCardBackStatus']
    },
    activeBankCard () {
      return this.$store.getters['profile/getters/handler/getActiveBankCard']
    },
    currentBankCard () {
      return this.verificationData.cards.find(card => card.id === this.activeBankCard.id)
    },
    activeTransaction () {
      return this.$store.getters['finance/getters/handler/getActiveTransaction']
    },
    getDocFrontStatus () {
      return this.getUploadDocStatus(this.currentBankCard.doc_front)
    },
    getDocBackStatus () {
      return this.getUploadDocStatus(this.currentBankCard.doc_back)
    }
  },
  watch: {
    cardFront: {
      handler (newValue) {
        if (newValue && newValue.name) {
          this.$store.commit('dictionaries/mutations/handler/SAVE_UPLOAD_CARD_FRONT_STATUS', {
            rootData: this.$store.state.dictionaries.state.handler,
            data: null
          })
          this.$store.dispatch('profile/actions/handler/uploadVerificationDocuments', {
            type: 'card-front',
            ext: this.currentBankCard.id,
            file: newValue
          })
          this.cardFront = null
        }
      },
      deep: true
    },
    cardBack: {
      handler (newValue) {
        if (newValue && newValue.name) {
          this.$store.commit('dictionaries/mutations/handler/SAVE_UPLOAD_CARD_BACK_STATUS', {
            rootData: this.$store.state.dictionaries.state.handler,
            data: null
          })
          this.$store.dispatch('profile/actions/handler/uploadVerificationDocuments', {
            type: 'card-back',
            ext: this.currentBankCard.id,
            file: newValue
          })
          this.cardFront = null
        }
      },
      deep: true
    }
  },
  destroyed () {
    this.$store.commit('dictionaries/mutations/handler/SAVE_UPLOAD_CARD_FRONT_STATUS', {
      rootData: this.$store.state.dictionaries.state.handler,
      data: null
    })
    this.$store.commit('dictionaries/mutations/handler/SAVE_UPLOAD_CARD_BACK_STATUS', {
      rootData: this.$store.state.dictionaries.state.handler,
      data: null
    })
  },
  created () {
    this.uploadVerDocInfo()
  },
  methods: {
    togglePopup (value) {
      this.$store.commit('dictionaries/mutations/handler/TOGGLE_POPUP', {
        rootData: this.$store.state.dictionaries.state.handler,
        data: value
      })
    },
    uploadVerDocInfo () {
      this.$store.dispatch('profile/actions/handler/uploadVerificationDocumentsInfo', 'card')
    }
  }
}
</script>
<style lang="scss" scoped>

  .popup-verification-bank-card-block {
      display: flex;
      flex-direction: column;
      margin-bottom: 20px;

      &-status {
        line-height: 1.4;
        padding: 6px 13px;
        font-size: 13px;
        text-align: center;
        color: white;

        &.-no {
          background-color: #a8acb2;
        }
      }

      &-container {
        display: flex;
        flex-direction: column;
        background-color: #d9dce1;

        &-hint {
          padding: 20px 13px 0;
          font-size: 14px;
          color: #6d788a;
          text-align: center;
          line-height: 1.4;
        }

        &-elem {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          margin: 20px;
          border: 1px dashed #a1a4a7;
        }

        &-icon {
          margin: 35px 0 25px;
        }

        &-add_field {
          margin-bottom: 30px;
          width: 190px;
        }

        &-status {
          line-height: 1.4;
          padding: 6px 13px;
          font-size: 13px;
          text-align: center;
          color: white;

          &.-verified {
            background-color: #47bf6f;
          }
        }
      }
    }
</style>
