<template>
  <div class="metatrader-container -page">
    <span class="metatrader-container-title" :class="isRtlMode ? 'text-right' : ''" v-text="$t(formData.head)" />
    <div class="metatrader-container-block-transfer">
      <form-standard
        :id="formTitle"
        ref="modal-form"
        :form-title="formTitle"
        :prop-form="form"
        :is-button-shown="false"
        :direction="windowWidth > 768 ? 'flex-row justify-content-between' : 'flex-column'"
        :field-classes="windowWidth > 768 ? 'px-3 m-0' : 'pl-3 mb-4'"
      />
      <div class="internal-button">
        <b-button
          type="submit"
          class="w-100"
          variant="primary"
          @click="obSubmit"
          v-text="$t(formData.button)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import FormStandard from '~/components/modal/forms/form-standard'
export default {
  name: 'MetatraderInternalTransfer',
  components: {
    FormStandard
  },
  data () {
    return {
      form: [],
      formTitle: 'internalTransfer'
    }
  },
  computed: {
    windowWidth () {
      return this.$store.getters['dictionaries/getters/handler/getCurrentNumberWindowWidth']
    },
    formData () {
      return this.$store.getters['forms/getters/handler/getDefaultFormData'](this.formTitle)
    },
    isRtlMode () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode']
    },
    dir () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode'] ? 'rtl' : 'ltr'
    }
  },
  async created () {
    await this.$store.dispatch('forms/actions/handler/fetchForm', this.formTitle)
    await this.copyForm()
  },
  methods: {
    copyForm () {
      this.form = this.$store.getters['forms/getters/handler/getForm']
    },
    saveFormTitle () {
      this.$store.commit('forms/mutations/handler/SAVE_FORM_TITLE', {
        rootData: this.$store.state.forms.state.handler,
        data: this.formTitle
      })
    },
    updateForm () {
      this.$store.commit('forms/mutations/handler/UPDATE_FORM', {
        rootData: this.$store.state.forms.state.handler,
        data: this.form
      })
    },
    obSubmit (event) {
      this.saveFormTitle()
      this.updateForm()
      this.$refs['modal-form'].onSubmit(event)
    }
  }
}
</script>
<style lang="scss">
  .internal-button {
    width: 25%;
    margin-top: 23px;
    padding-left: 16px;

    @media screen and (max-width: 1300px) {
      width: 100%;
    }

    @media screen and (max-width: 768px) {
      margin-top: 0;
    }
  }
</style>
