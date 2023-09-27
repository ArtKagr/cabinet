<template>
  <div class="popup-verification-need-docs">
    <div class="popup-verification-need-docs-head">
      <span class="popup-verification-need-docs-head-title" :class="`-${dir}`" v-text="title" />
    </div>
    <div v-if="texts && texts.length" class="popup-verification-need-docs-body">
      <span
        class="popup-verification-need-docs-body-text"
        :class="`-${dir}`"
        v-text="texts[0].content"
      />
      <span
        class="popup-verification-need-docs-body-text"
        :class="`-${dir}`"
        v-text="texts[1].content"
      />
      <span
        class="popup-verification-need-docs-body-text mb-0"
        :class="`-${dir}`"
        v-html="texts[2].content"
      />
    </div>
    <span
      class="popup-status"
      :class="`-${verificationData.politically_exposed_person_docs}`"
      v-text="getDocStatus"
    />
    <div class="popup-verification-need-docs-upload_block">
      <div class="popup-verification-need-docs-upload_block-container">
        <div class="popup-verification-need-docs-upload_block-container-icon">
          <lfx-icon-waiting v-if="verificationData.politically_exposed_person_docs === 'process'" class="popup-verification-need-docs-upload_block-container-icon-flag" />
          <lfx-icon-error-fill v-else-if="verificationData.politically_exposed_person_docs === 'rejected'" class="popup-verification-need-docs-upload_block-container-icon-flag" />
          <lfx-icon-success-fill v-else-if="verificationData.politically_exposed_person_docs === 'verified'" class="popup-verification-need-docs-upload_block-container-icon-flag" />
          <lfx-icon-add v-else class="popup-verification-need-docs-upload_block-container-icon-flag" />
          <lfx-icon-document class="popup-verification-need-docs-upload_block-container-icon-image" />
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
import LfxIconWaiting from '~/components/icons/lfx-icon-waiting'
import LfxIconErrorFill from '~/components/icons/lfx-icon-error-fill'
import LfxIconSuccessFill from '~/components/icons/lfx-icon-success-fill'
import LfxIconAdd from '~/components/icons/lfx-icon-add'
import LfxIconDocument from '~/components/icons/lfx-icon-document'

export default {
  name: 'PopupVerificationPep',
  components: { LfxIconDocument, LfxIconAdd, LfxIconSuccessFill, LfxIconErrorFill, LfxIconWaiting },
  data () {
    return {
      file: null
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
    texts () {
      const result = this.info.filter((item, key) => [1, 2, 3].includes(key))

      if (result && result.length) {
        return result
      }

      return []
    },
    documentStatus () {
      return this.$store.getters['dictionaries/getters/handler/getPepStatus']
    },
    getDocStatus () {
      return this.getUploadDocStatus(this.verificationData.politically_exposed_person_docs)
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
          this.$store.dispatch('profile/actions/handler/uploadVerificationDocuments', { type: 'pep', file: newValue })
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
    togglePopup (value) {
      this.$store.commit('dictionaries/mutations/handler/TOGGLE_POPUP', {
        rootData: this.$store.state.dictionaries.state.handler,
        data: value
      })
    },
    uploadVerDocInfo () {
      this.$store.dispatch('profile/actions/handler/uploadVerificationDocumentsInfo', 'pep')
    }
  }
}
</script>
