<template>
  <div class="finance-transfer">
    <span class="finance-transfer-title" :class="`-${dir}`" v-text="$t('Партнерский перевод')" />
    <div v-if="changedForm && changedForm.length" class="finance-transfer-form">
      <form-finance-affiliate-transfer
        id="affiliateTransfer"
        ref="modal-form"
        form-title="affiliateTransfer"
        :prop-form="changedForm"
        :direction="windowWidth > 768 ? 'flex-row justify-content-between' : 'flex-column'"
        :style="{ maxWidth: windowWidth > 768 ? '100%' : '' }"
        :field-classes="windowWidth > 768 ? 'px-3 m-0' : 'pl-3 mb-4'"
      />
    </div>
  </div>
</template>

<script>
import form from '~/mixins/form'
import FormFinanceAffiliateTransfer from '~/components/modal/forms/form-finance-affiliate-transfer'
export default {
  name: 'AffiliateTransfer',
  components: { FormFinanceAffiliateTransfer },
  mixins: [form],
  computed: {
    windowWidth () {
      return this.$store.getters['dictionaries/getters/handler/getCurrentNumberWindowWidth']
    },
    formData () {
      return this.$store.getters['forms/getters/handler/getDefaultFormData']('affiliateTransfer')
    },
    isRtlMode () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode']
    },
    dir () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode'] ? 'rtl' : 'ltr'
    }
  },
  async created () {
    await this.fetchForm('affiliateTransfer')
  },
  methods: {
    copyForm () {
      this.changedForm = this.$store.getters['forms/getters/handler/getForm']
    },
    saveFormTitle () {
      this.$store.commit('forms/mutations/handler/SAVE_FORM_TITLE', {
        rootData: this.$store.state.forms.state.handler,
        data: 'affiliateTransfer'
      })
    },
    updateForm () {
      this.$store.commit('forms/mutations/handler/UPDATE_FORM', {
        rootData: this.$store.state.forms.state.handler,
        data: this.changedForm
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
  .finance-transfer {
    display: flex;
    flex-direction: column;
    max-width: 1200px;

    &-title {
      padding: 0 30px 15px;
      font-size: 20px;
      color: #3B4B68;

      &.-rtl {
        text-align: right;
      }

      @media screen and (max-width: 767px) {
        font-size: 18px;
        padding: 30px 10px 20px;
      }
    }

    &-form {
      background-color: white;
      margin: 0 30px;
      padding: 15px 0;

      @media screen and (max-width: 767px) {
        margin: 0 10px;
      }
    }
  }
</style>
