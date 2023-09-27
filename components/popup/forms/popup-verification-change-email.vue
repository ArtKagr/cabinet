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
    <span
      class="popup-status"
      :class="`-${verificationData.change_email_docs}`"
      v-text="getDocStatus"
    />
    <div class="popup-verification-need-docs-upload_block">
      <div class="popup-verification-need-docs-upload_block-container">
        <div class="popup-verification-need-docs-upload_block-container-icon">
          <lfx-icon-waiting v-if="verificationData.change_email_docs === 'process'" class="popup-verification-need-docs-upload_block-container-icon-flag" />
          <lfx-icon-error-fill v-else-if="verificationData.change_email_docs === 'rejected'" class="popup-verification-need-docs-upload_block-container-icon-flag" />
          <lfx-icon-success-fill v-else-if="verificationData.change_email_docs === 'verified'" class="popup-verification-need-docs-upload_block-container-icon-flag" />
          <lfx-icon-add v-else class="popup-verification-need-docs-upload_block-container-icon-flag" />
          <lfx-icon-selfie class="popup-verification-need-docs-upload_block-container-icon-image" />
        </div>
        <div class="popup-status-field">
          <b-form-file
            v-model="file"
            variant="transparent-primary"
            placeholder=""
            :browse-text="$t('Добавить файл')"
          />
        </div>
      </div>
    </div>
    <span
      v-if="documentStatus"
      class="popup-status"
      :class="documentStatus === 'success' ? '-verified' : '-rejected'"
      v-text="documentStatus === 'success' ? $t('Документ успешно загружен') : $t('Произошла ошибка при загрузке файла')"
    />
    <div class="popup-verification-need-docs-button">
      <b-button variant="primary" @click="togglePopup(false)" v-text="$t('Продолжить')" />
    </div>
  </div>
</template>

<script>
import LfxIconSelfie from '~/components/icons/lfx-icon-selfie'
import LfxIconAdd from '~/components/icons/lfx-icon-add'
import LfxIconWaiting from '~/components/icons/lfx-icon-waiting'
import LfxIconErrorFill from '~/components/icons/lfx-icon-error-fill'
import LfxIconSuccessFill from '~/components/icons/lfx-icon-success-fill'
export default {
  name: 'PopupVerificationChangeEmail',
  components: { LfxIconSuccessFill, LfxIconErrorFill, LfxIconWaiting, LfxIconAdd, LfxIconSelfie },
  data () {
    return {
      file: null
    }
  },
  computed: {
    routePages () {
      return this.$store.getters['dictionaries/getters/handler/getRoutePages']
    },
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
    documentStatus () {
      return this.$store.getters['dictionaries/getters/handler/getUploadDocumentStatus']
    },
    getDocStatus () {
      return this.getUploadDocStatus(this.verificationData.change_email_docs)
    }
  },
  watch: {
    file: {
      handler (newValue) {
        if (newValue && newValue.name) {
          this.$store.commit('dictionaries/mutations/handler/SAVE_UPLOAD_DOCUMENT_STATUS', {
            rootData: this.$store.state.dictionaries.state.handler,
            data: null
          })
          this.$store.dispatch('profile/actions/handler/uploadVerificationDocuments', { type: 'change-email', file: newValue })
          this.file = null
        }
      },
      deep: true
    }
  },
  destroyed () {
    this.$store.commit('dictionaries/mutations/handler/SAVE_UPLOAD_DOCUMENT_STATUS', {
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
      this.$store.dispatch('profile/actions/handler/uploadVerificationDocumentsInfo', 'email')
    }
  }
}
</script>
<style lang="scss">

.popup-verification-need-docs {
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

      &.-rtl {
        text-align: right;
      }
    }
  }

  &-body {
    display: flex;
    flex-direction: column;
    padding: 20px 30px;

    &-text {
      font-size: 13px;
      color: #8e9aac;
      margin-bottom: 13px;
      line-height: 1.4;

      &.-bold {
        font-weight: 500;
      }

      &.-rtl {
        text-align: right;
      }
    }
  }

  &-status {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 6px 13px;
    background-color: #a8acb2;

    &-text {
      text-align: center;
      font-size: 13px;
      color: white;
    }
  }

  &-upload_blocks {
    display: flex;
    flex-direction: column;
  }

  &-upload_block {
    display: flex;
    width: 100%;
    padding: 20px;
    background-color: #d9dce1;

    &-container {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 100%;
      border: 1px dashed #a1a4a7;

      &-icon {
        position: relative;
        margin: 35px 0 25px;

        &-flag {
          width: 30px;
          height: 30px;
          position: absolute;
          top: -15px;
          right: -15px;
        }

        &-image {
          //
        }
      }

      &-button {
        width: 190px;
        color: #3498db !important;
        background-color: white !important;
        margin-bottom: 30px;
      }
    }
  }

  &-button {
    padding: 30px;

    button {
      width: 100%;
    }
  }
}
</style>
