export const getters = {
  getForm: (state, getters, rootState) => rootState.forms.state.handler.form,
  getFormTitle: (state, getters, rootState) => rootState.forms.state.handler.formTitle,
  getDefaultFormData: (state, getters, rootState) => (formTitle) => {
    return rootState.forms.state.handler.formsData[formTitle] || rootState.forms.state.handler.emptyFormData
  },
  getFormData: (state, getters, rootState) => (name) => {
    const formTitle = name || getters.getFormTitle

    return rootState.forms.state.handler.formsData[formTitle] || rootState.forms.state.handler.emptyFormData
  },
  getIsEuCountry: (state, getters, rootState) => rootState.forms.state.handler.isEuCountry,
  getDemoDepositAmount: (state, getters, rootState) => rootState.forms.state.handler.demoDepositAmount
}
