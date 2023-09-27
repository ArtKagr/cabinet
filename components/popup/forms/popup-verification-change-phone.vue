<template>
  <div class="popup-verification-need-docs">
    <div class="popup-verification-need-docs-head">
      <span class="popup-verification-need-docs-head-title" :class="`-${dir}`" v-text="title" />
    </div>
    <div v-if="texts && texts.length" class="popup-verification-need-docs-body">
      <span
        v-for="(item, key) in texts"
        :key="key"
        class="popup-verification-need-docs-body-text"
        :class="[`-${dir}`, key === texts.length - 1 ? 'mb-0' : '']"
        v-html="item.content"
      />
    </div>
    <div class="popup-verification-need-docs-upload_blocks">
      <span
        class="popup-status"
        :class="`-${verificationData.change_phone_docs}`"
        v-text="getChangePhoneDocStatus"
      />
      <div class="popup-verification-need-docs-upload_block" :style="{ marginBottom: phoneDocsStatus ? '0' : '20px' }">
        <div class="popup-verification-need-docs-upload_block-container">
          <div class="popup-verification-need-docs-upload_block-container-icon">
            <lfx-icon-waiting v-if="verificationData.change_phone_docs === 'process'" class="popup-verification-need-docs-upload_block-container-icon-flag" />
            <lfx-icon-error-fill v-else-if="verificationData.change_phone_docs === 'rejected'" class="popup-verification-need-docs-upload_block-container-icon-flag" />
            <lfx-icon-success-fill v-else-if="verificationData.change_phone_docs === 'verified'" class="popup-verification-need-docs-upload_block-container-icon-flag" />
            <lfx-icon-add v-else class="popup-verification-need-docs-upload_block-container-icon-flag" />
            <lfx-icon-selfie class="popup-verification-need-docs-upload_block-container-icon-image" />
          </div>
          <div class="popup-status-field">
            <b-form-file
              v-model="phoneDocs"
              variant="transparent-primary"
              placeholder=""
              :browse-text="$t('Добавить файл')"
            />
          </div>
        </div>
      </div>
      <span
        v-if="phoneDocsStatus"
        class="popup-status"
        :style="{ marginBottom: '20px' }"
        :class="phoneDocsStatus === 'success' ? '-verified' : '-rejected'"
        v-text="phoneDocsStatus === 'success' ? $t('Документ успешно загружен') : $t('Произошла ошибка при загрузке файла')"
      />
      <span
        class="popup-status"
        :class="`-${verificationData.change_phone_contract_docs}`"
        v-text="getChangePhoneContractStatus"
      />
      <div class="popup-verification-need-docs-upload_block">
        <div class="popup-verification-need-docs-upload_block-container">
          <div class="popup-verification-need-docs-upload_block-container-icon">
            <lfx-icon-waiting v-if="verificationData.change_phone_contract_docs === 'process'" class="popup-verification-need-docs-upload_block-container-icon-flag" />
            <lfx-icon-error-fill v-else-if="verificationData.change_phone_contract_docs === 'rejected'" class="popup-verification-need-docs-upload_block-container-icon-flag" />
            <lfx-icon-success-fill v-else-if="verificationData.change_phone_contract_docs === 'verified'" class="popup-verification-need-docs-upload_block-container-icon-flag" />
            <lfx-icon-add v-else class="popup-verification-need-docs-upload_block-container-icon-flag" />
            <lfx-icon-document class="popup-verification-need-docs-upload_block-container-icon-image" />
          </div>
          <div class="popup-status-field">
            <b-form-file
              v-model="phoneContractDocs"
              variant="transparent-primary"
              placeholder=""
              :browse-text="$t('Добавить файл')"
            />
          </div>
        </div>
      </div>
      <span
        v-if="phoneContractDocsStatus"
        class="popup-status"
        :class="phoneContractDocsStatus === 'success' ? '-verified' : '-rejected'"
        v-text="phoneContractDocsStatus === 'success' ? $t('Документ успешно загружен') : $t('Произошла ошибка при загрузке файла')"
      />
    </div>
    <div class="popup-verification-need-docs-button">
      <b-button variant="primary" @click="togglePopup(false)" v-text="$t('Продолжить')" />
    </div>
  </div>
</template>

<script>
import LfxIconAdd from '~/components/icons/lfx-icon-add'
import LfxIconWaiting from '~/components/icons/lfx-icon-waiting'
import LfxIconSelfie from '~/components/icons/lfx-icon-selfie'
import LfxIconDocument from '~/components/icons/lfx-icon-document'
import LfxIconErrorFill from '~/components/icons/lfx-icon-error-fill'
import LfxIconSuccessFill from '~/components/icons/lfx-icon-success-fill'
export default {
  name: 'PopupVerificationChangePhone',
  components: { LfxIconSuccessFill, LfxIconErrorFill, LfxIconDocument, LfxIconSelfie, LfxIconWaiting, LfxIconAdd },
  data () {
    return {
      phoneDocs: null,
      phoneContractDocs: null
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
      return result && result.content ? result.content : ''
    },
    texts () {
      return this.info.filter(item => item.type === 'text')
    },
    phoneDocsStatus () {
      return this.$store.getters['dictionaries/getters/handler/getUploadPhoneDocStatus']
    },
    phoneContractDocsStatus () {
      return this.$store.getters['dictionaries/getters/handler/getUploadPhoneContractDocStatus']
    },
    getChangePhoneDocStatus () {
      return this.getUploadDocStatus(this.verificationData.change_phone_docs)
    },
    getChangePhoneContractStatus () {
      return this.getUploadDocStatus(this.verificationData.change_phone_contract_docs)
    }
  },
  watch: {
    phoneDocs: {
      handler (newValue) {
        if (newValue && newValue.name) {
          this.$store.commit('dictionaries/mutations/handler/SAVE_UPLOAD_PHONE_DOC_STATUS', {
            rootData: this.$store.state.dictionaries.state.handler,
            data: null
          })
          this.$store.dispatch('profile/actions/handler/uploadVerificationDocuments', { type: 'change-phone', file: newValue })
          this.file = null
        }
      },
      deep: true
    },
    phoneContractDocs: {
      handler (newValue) {
        if (newValue && newValue.name) {
          this.$store.commit('dictionaries/mutations/handler/SAVE_UPLOAD_PHONE_DOC_CONTRACT_STATUS', {
            rootData: this.$store.state.dictionaries.state.handler,
            data: null
          })
          this.$store.dispatch('profile/actions/handler/uploadVerificationDocuments', { type: 'change-phone-contr', file: newValue })
          this.file = null
        }
      },
      deep: true
    }
  },
  destroyed () {
    this.$store.commit('dictionaries/mutations/handler/SAVE_UPLOAD_PHONE_DOC_STATUS', {
      rootData: this.$store.state.dictionaries.state.handler,
      data: null
    })
    this.$store.commit('dictionaries/mutations/handler/SAVE_UPLOAD_PHONE_DOC_CONTRACT_STATUS', {
      rootData: this.$store.state.dictionaries.state.handler,
      data: null
    })
  },
  created () {
    this.uploadVerDocInfo()
  },
  methods: {
    getUploadDocStatus (status) {
      switch (status) {
        case 'no':
          return `${this.$t('Статус')}: ${this.$t('документы не загружены')}`
        case 'process':
          return `${this.$t('Статус')}: ${this.$t('на рассмотрении')}`
        case 'verified':
          return `${this.$t('Статус')}: ${this.$t('Верифицировано')}`
        case 'rejected':
          return `${this.$t('Статус')}: ${this.$t('Отклоненo')}`
        default:
          return ''
      }
    },
    togglePopup (value) {
      this.$store.commit('dictionaries/mutations/handler/TOGGLE_POPUP', {
        rootData: this.$store.state.dictionaries.state.handler,
        data: value
      })
    },
    uploadVerDocInfo () {
      this.$store.dispatch('profile/actions/handler/uploadVerificationDocumentsInfo', 'phone')
    }
  }
}
</script>
