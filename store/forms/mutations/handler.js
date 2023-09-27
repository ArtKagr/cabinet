export const mutations = {
  SAVE_FORM_TITLE (state, payload) {
    payload.rootData.formTitle = payload.data
  },
  SAVE_FORM (state, payload) {
    if (Object.keys(this.$form.formFieldsOrder).includes(payload.rootData.formTitle)) {
      payload.rootData.form = this.$form.updateForm(this.$form.resortForm(payload.data, this.$form.formFieldsOrder[payload.rootData.formTitle]))
    } else {
      payload.rootData.form = this.$form.updateForm(payload.data)
    }
  },
  UPDATE_FORM (state, payload) {
    payload.rootData.form = payload.data
  },
  UPDATE_FORM_ERRORS (state, payload) {
    payload.rootData.form = this.$form.updateFormErrors(payload.rootData.form, payload.data)
  },
  SAVE_IS_EU_COUNTRY (state, payload) {
    payload.rootData.isEuCountry = payload.data
  },
  SAVE_DEMO_DEPOSIT_AMOUNT (state, payload) {
    payload.rootData.demoDepositAmount = payload.data
  }
}
