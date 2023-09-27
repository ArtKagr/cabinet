<template>
  <div class="popup-verification-need-docs">
    <div class="popup-verification-need-docs-head">
      <span class="popup-verification-need-docs-head-title" :class="`-${dir}`" v-text="title" />
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
        class="popup-verification-need-docs-body-text"
        :class="`-${dir}`"
        v-text="texts[1].content"
      />
      <span
        class="popup-verification-need-docs-body-text -bold mb-0"
        :class="`-${dir}`"
        v-html="texts[2].content"
      />
    </div>
    <span
      class="popup-status"
      :class="`-${verificationData.name_docs}`"
      v-text="getDocStatus"
    />
    <div class="popup-verification-need-docs-upload_block">
      <div class="popup-verification-need-docs-upload_block-container">
        <div class="popup-verification-need-docs-upload_block-container-icon">
          <lfx-icon-waiting v-if="verificationData.name_docs === 'process'" class="popup-verification-need-docs-upload_block-container-icon-flag" />
          <lfx-icon-error-fill v-else-if="verificationData.name_docs === 'rejected'" class="popup-verification-need-docs-upload_block-container-icon-flag" />
          <lfx-icon-success-fill v-else-if="verificationData.name_docs === 'verified'" class="popup-verification-need-docs-upload_block-container-icon-flag" />
          <lfx-icon-add v-else class="popup-verification-need-docs-upload_block-container-icon-flag" />
          <lfx-icon-doc class="popup-verification-need-docs-upload_block-container-icon-image" />
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
import LfxIconAdd from '~/components/icons/lfx-icon-add'
import LfxIconWaiting from '~/components/icons/lfx-icon-waiting'
import LfxIconDoc from '~/components/icons/lfx-icon-doc'
import LfxIconErrorFill from '~/components/icons/lfx-icon-error-fill'
import LfxIconSuccessFill from '~/components/icons/lfx-icon-success-fill'
export default {
  name: 'PopupVerificationEditIdentity',
  components: { LfxIconSuccessFill, LfxIconErrorFill, LfxIconDoc, LfxIconWaiting, LfxIconAdd },
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
      const result = this.info.filter((item, key) => [1, 3, 4].includes(key))

      if (result && result.length) {
        return result
      }

      return []
    },
    list () {
      const result = this.info.filter(item => item.type === 'list')

      if (result && result.length) {
        return result[0].content
      }

      return []
    },
    documentStatus () {
      return this.$store.getters['dictionaries/getters/handler/getUploadDocumentStatus']
    },
    getDocStatus () {
      return this.getUploadDocStatus(this.verificationData.name_docs)
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
          this.$store.dispatch('profile/actions/handler/uploadVerificationDocuments', { type: 'id', file: newValue })
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
      this.$store.dispatch('profile/actions/handler/uploadVerificationDocumentsInfo', 'id')
    }
  }
}
</script>
