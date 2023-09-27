export const getters = {
  params: (state, getters, rootState, rootGetters) => ({
    server: rootGetters['trading/getters/trading/getAccount'].server,
    login: rootGetters['trading/getters/trading/getAccount'].login,
    _lang: rootGetters['dictionaries/getters/handler/getRoutePages'].locale,
    token: rootGetters['dictionaries/getters/user/getAuthorization'].token || localStorage.getItem('user_token')
  })
}

export const actions = {
  async fetchForm ({ commit, dispatch, getters, rootState, rootGetters }, formTitle) {
    await dispatch('saveFormTitle', formTitle)

    const form = rootGetters['forms/getters/handler/getForm']
    const formData = rootGetters['forms/getters/handler/getFormData'](formTitle)
    const amount = rootGetters['forms/getters/handler/getDemoDepositAmount']
    const params = this.$form.setFormParams(form, getters.params, formTitle, amount)

    switch (formTitle) {
      case 'addCard':
      case 'addBank':
      case 'addWallet':
      case 'addBankCard':
      case 'addBankTransfer':
      case 'editBank':
        dispatch('dictionaries/actions/handler/togglePreloader', true, { root: true })
        break
    }

    try {
      const { data } = await this.$axios.get(`/v3/${formData.url}`, { params })

      if (data.status === 'success') {
        await dispatch('checkFormRules', data)
      } else {
        await dispatch('checkFormErrors', data)
      }
    } catch (e) {
      dispatch('dictionaries/actions/auth/checkError', e, { root: true })
    }

    dispatch('dictionaries/actions/handler/togglePreloader', false, { root: true })
  },
  async saveForm ({ commit, dispatch, getters, rootState, rootGetters }, payload) {
    const bodyFormData = new FormData()

    if (payload.values && payload.values.file) {
      bodyFormData.append('file', payload.values.file)
    }

    const form = rootGetters['forms/getters/handler/getFormData'](payload.formId)

    let values = payload.values
    const params = getters.params

    if (payload.formId === 'affiliatePromoMakeApp') {
      let handoutData = localStorage.getItem('handout_data')

      if (handoutData) {
        handoutData = JSON.parse(handoutData)
        values = { ...payload.values, file: handoutData.file, type: handoutData.activeCategory }
        localStorage.removeItem('handout_data')
      }
    }

    switch (payload.formId) {
      case 'copyAction':
        values = { ...payload.values, id: rootGetters['trading/getters/handler/getOpenedTrade'].user_id }
        break
      case 'addCard':
      case 'addBank':
      case 'addWallet':
      case 'addBankTransfer':
        values = { ...payload.values }
        params.method = rootGetters['finance/getters/handler/getActiveMethod']
        break
      case 'editBank':
        dispatch('dictionaries/actions/handler/togglePreloader', true, { root: true })
        values = { ...payload.values, id: rootGetters['finance/getters/handler/getActiveCard'].id }
        break
      case 'addBankCard':
      case 'affiliateEditCompany':
        values = { ...payload.values }
        break
      case 'questionnaireEu':
      case 'questionnaireTrader':
        params.step = rootGetters['profile/getters/handler/getQuestionnaireEuSteps'].step
        break
      case 'depositRequest':
      case 'depositRequestModal':
      case 'depositRequestCard':
      case 'withdrawalRequest':
      case 'withdrawalRequestModal':
        dispatch('dictionaries/actions/handler/togglePreloader', true, { root: true })
        params.method = rootGetters['finance/getters/handler/getActiveMethod']
        break
    }

    Object.entries(values).forEach((field) => {
      if (payload.formId === 'affiliatePromoMakeApp') {
        bodyFormData.append(field[0], field[1] === null ? '' : field[1])
      } else if (field[0] !== 'file') {
        bodyFormData.append(field[0], field[1] === null ? '' : field[1])
      }
    })

    try {
      const { data } = await this.$axios.post(`/v3/${form.url}`, bodyFormData, { params })

      if (data.status === 'success') {
        await dispatch('applyFormConditions', { data, payload })
        await dispatch('dictionaries/actions/handler/openSuccessToast', { title: form.success.title, description: form.success.description }, { root: true })
      } else if (data.errors) {
        const description = Object.values(data.errors).reduce((acc, val) => {
          acc = `${acc} ${val}`
          return acc
        }, '')
        await commit('forms/mutations/handler/UPDATE_FORM_ERRORS', { rootData: rootState.forms.state.handler, data: data.errors }, { root: true })
        await dispatch('dictionaries/actions/handler/openErrorToast', { description }, { root: true })
      }
    } catch (e) {
      dispatch('dictionaries/actions/auth/checkError', e, { root: true })
    }

    dispatch('dictionaries/actions/handler/togglePreloader', false, { root: true })
  },
  async saveFormTitle ({ commit, rootState }, formTitle) {
    await commit('forms/mutations/handler/SAVE_FORM_TITLE', { rootData: rootState.forms.state.handler, data: formTitle }, { root: true })
  },
  async saveFormResponse ({ commit, rootState }, form) {
    await commit('forms/mutations/handler/SAVE_FORM', { rootData: rootState.forms.state.handler, data: form }, { root: true })
  },
  async checkFormRules ({ commit, dispatch, rootState, rootGetters }, data) {
    const formTitle = rootGetters['forms/getters/handler/getFormTitle']

    switch (formTitle) {
      case 'registration':
      case 'registrationPage':
        await dispatch('savePopupName', 'registration-warning')
        await dispatch('saveIsEuCountry', data.is_eu)
        await dispatch('saveFormResponse', data.form)
        break
      case 'withdrawalRequest':
      case 'withdrawalRequestModal':
        await dispatch('saveWithdrawalInfo', data.info)
        await dispatch('saveFormResponse', data.form)

        if (data.local) {
          await dispatch('saveWithdrawalLocal', data.local)
        }
        break
      case 'depositRequest':
      case 'depositRequestModal':
      case 'depositRequestCard':
        await dispatch('saveDepositInfo', data.info)
        await dispatch('saveFormResponse', data.form)

        if (data.local) {
          await dispatch('saveDepositLocal', data.local)
        }
        break
      case 'questionnaireEu':
      case 'questionnaireTrader':
        await dispatch('saveQuestionnaireEu', { max_step: data.max_step, step: data.step })
        await dispatch('saveFormResponse', data.form)
        break
      case 'traderEdit':
        await dispatch('saveNeedProfileTrader', {
          need_balance: data.need_balance,
          need_trader_questionnaire: data.need_trader_questionnaire,
          need_username: data.need_username
        })
        await dispatch('saveFormResponse', data.form)
        break
      case 'affiliatePromoMakeApp':
        await dispatch('saveHandoutFormData', { fileName: data.file_name, url: data.url })
        await dispatch('saveFormResponse', data.form)
        break
      default:
        await dispatch('saveFormResponse', data.form)
    }
  },
  async applyFormConditions ({ commit, dispatch, getters, rootState, rootGetters }, data) {
    const payload = data.data
    const formTitle = rootGetters['forms/getters/handler/getFormTitle']
    const page = rootGetters['dictionaries/getters/handler/getRoutePages'].current

    switch (formTitle) {
      case 'copyAction':
        await dispatch('toggleModal', false)
        break
      case 'registration':
        await dispatch('toggleModal', false)
        await dispatch('dictionaries/actions/auth/saveAuthorizationData', payload.auth, { root: true })
        await dispatch('dictionaries/actions/auth/fetchRealUser', null, { root: true })
        break
      case 'registrationPage':
        await dispatch('dictionaries/actions/auth/saveAuthorizationData', payload.auth, { root: true })
        await dispatch('dictionaries/actions/auth/fetchRealUser', null, { root: true })
        await this.$router.push(`/${rootGetters['dictionaries/getters/handler/getRoutePages'].locale}`)
        break
      case 'login':
        await dispatch('toggleModal', false)
        await dispatch('dictionaries/actions/auth/deleteAccountCurrency', null, { root: true })
        dispatch('dictionaries/actions/auth/saveAuthorizationData', payload.auth, { root: true })
        dispatch('dictionaries/actions/auth/fetchRealUser', null, { root: true })
        break
      case 'loginPage':
        await dispatch('dictionaries/actions/auth/deleteAccountCurrency', null, { root: true })
        dispatch('dictionaries/actions/auth/saveAuthorizationData', payload.auth, { root: true })
        dispatch('dictionaries/actions/auth/fetchRealUser', null, { root: true })
        await this.$router.push(`/${rootGetters['dictionaries/getters/handler/getRoutePages'].locale}`)
        break
      case 'resetPassword':
        await this.$router.push(`/${rootGetters['dictionaries/getters/handler/getRoutePages'].locale}/confirm-email`)
        break
      case 'confirmEmail':
        await this.$router.push(`/${rootGetters['dictionaries/getters/handler/getRoutePages'].locale}`)
        break
      case 'financeHistory':
        await dispatch('toggleModal', false)
        await commit('finance/mutations/handler/SAVE_FINANCE_HISTORY', { rootData: rootState.finance.state.handler, data: payload }, { root: true })
        break
      case 'addWallet':
      case 'addCard':
      case 'addBank':
        await dispatch('toggleModal', false)
        await dispatch('fetchForm', 'withdrawalRequest')
        break
      case 'addBankCard':
      case 'addBankTransfer':
        await dispatch('finance/actions/handler/fetchFinanceWallets', null, { root: true })
        await dispatch('toggleModal', false)
        break
      case 'depositRequest':
      case 'depositRequestModal':
      case 'depositRequestCard':
        await dispatch('saveDepositInfoResponse', payload.result.info)
        await dispatch('saveDepositDataResponse', payload.result.data)
        if (!data.payload.flag) {
          await dispatch('openCurrentFinanceForm', { type: payload.result.type, data: payload.result.data })
        }
        break
      case 'withdrawalRequest':
      case 'withdrawalRequestModal':
        await dispatch('saveWithdrawalResponse', data)
        await dispatch('savePopupName', 'finance-withdrawal-info')
        await dispatch('togglePopup', true)
        break
      case 'editEmail':
        if (payload.need_docs && payload.need_docs.includes('change-email')) {
          await dispatch('toggleModal', false)
          await dispatch('savePopupName', 'verification-change-email')
          await dispatch('togglePopup', true)
        }
        break
      case 'editPhone':
        if (payload.need_docs && (payload.need_docs.includes('change-phone') || payload.need_docs.includes('change-phone-contr'))) {
          await dispatch('toggleModal', false)
          await dispatch('savePopupName', 'verification-change-phone')
          await dispatch('togglePopup', true)
        }
        break
      case 'editIdentity':
        await dispatch('toggleModal', false)
        await dispatch('savePopupName', 'verification-edit-identity')
        await dispatch('togglePopup', true)
        break
      case 'editAddress':
        await dispatch('toggleModal', false)
        await dispatch('savePopupName', 'verification-edit-address')
        await dispatch('togglePopup', true)
        break
      case 'pepStatus':
        await dispatch('toggleModal', false)
        await dispatch('savePopupName', 'verification-pep')
        await dispatch('togglePopup', true)
        break
      case 'affiliateCalculator':
        await dispatch('saveAffiliateCalculator', payload)
        break
      case 'questionnaireEu':
        if (payload.step && payload.step !== 9) {
          localStorage.setItem('step_quest_eu', payload.step)
          dispatch('fetchForm', formTitle)
        } else {
          await dispatch('toggleModal', false)
          await dispatch('profile/actions/handler/fetchProfileVerificationData', null, { root: true })
        }
        break
      case 'traderEdit':
        await dispatch('toggleModal', false)
        await dispatch('dictionaries/actions/auth/fetchRealUser', null, { root: true })
        break
      case 'editUsername':
        await dispatch('toggleModal', false)
        await dispatch('dictionaries/actions/auth/fetchRealUser', null, { root: true })
        break
      case 'questionnaireTrader':
        if (payload.code === 'STEP') {
          localStorage.setItem('step_quest_eu', payload.step)
          dispatch('fetchForm', formTitle)
        } else {
          await dispatch('toggleModal', false)
          await dispatch('dictionaries/actions/auth/fetchRealUser', null, { root: true })
        }
        break
      case 'twitterWatcher':
        await dispatch('analytics/actions/handler/fetchTwitterWatcherData', null, { root: true })
        await commit('dictionaries/mutations/user/TOGGLE_TWITTER_WATCHER', { rootData: rootState.dictionaries.state.user, data: true }, { root: true })
        await dispatch('toggleModal', false)
        break
      case 'affiliatePromoMakeApp':
        await dispatch('toggleModal', false)
        break
      default:
        await dispatch('toggleModal', false)
    }

    switch (page) {
      case 'mt':
        setTimeout(() => dispatch('metatrader/actions/handler/fetchMetatraderData', null, { root: true }), 2000)
        break
      case 'profile':
        setTimeout(() => dispatch('profile/actions/handler/fetchProfileAboutPage', null, { root: true }), 1000)
        break
      case 'verification':
        console.warn('applyFormConditions', payload)
        break
    }
  },
  async checkFormErrors ({ dispatch }, { code, result, message }) {
    if (code || result || message) {
      await dispatch('dictionaries/actions/handler/openErrorToast', { description: result || message }, { root: true })
    }
  },
  saveIsEuCountry ({ commit, rootState }, data) {
    commit('forms/mutations/handler/SAVE_IS_EU_COUNTRY', { rootData: rootState.forms.state.handler, data }, { root: true })
  },
  savePopupName ({ commit, rootState }, data) {
    commit('dictionaries/mutations/handler/SAVE_POPUP_NAME', { rootData: rootState.dictionaries.state.handler, data }, { root: true })
  },
  toggleModal ({ commit, rootState }, data) {
    commit('dictionaries/mutations/handler/TOGGLE_MODAL', { rootData: rootState.dictionaries.state.handler, data }, { root: true })
  },
  togglePopup ({ commit, rootState }, data) {
    commit('dictionaries/mutations/handler/TOGGLE_POPUP', { rootData: rootState.dictionaries.state.handler, data }, { root: true })
  },
  saveWithdrawalInfo ({ commit, rootState }, data) {
    commit('finance/mutations/handler/SAVE_WITHDRAWAL_INFO', { rootData: rootState.finance.state.handler, data }, { root: true })
  },
  saveDepositInfo ({ commit, rootState }, data) {
    commit('finance/mutations/handler/SAVE_DEPOSIT_INFO', { rootData: rootState.finance.state.handler, data }, { root: true })
  },
  saveDepositInfoResponse ({ commit, rootState }, data) {
    commit('finance/mutations/handler/SAVE_DEPOSIT_INFO_RESPONSE', { rootData: rootState.finance.state.handler, data }, { root: true })
  },
  saveDepositLocal ({ commit, rootState }, data) {
    commit('finance/mutations/handler/SAVE_DEPOSIT_LOCAL_DATA', { rootData: rootState.finance.state.handler, data }, { root: true })
  },
  saveWithdrawalLocal ({ commit, rootState }, data) {
    commit('finance/mutations/handler/SAVE_WITHDRAWAL_LOCAL_DATA', { rootData: rootState.finance.state.handler, data }, { root: true })
  },
  saveDepositDataResponse ({ commit, rootState }, data) {
    commit('finance/mutations/handler/SAVE_DEPOSIT_DATA_RESPONSE', { rootData: rootState.finance.state.handler, data }, { root: true })
  },
  saveWithdrawalResponse ({ commit, rootState }, data) {
    commit('finance/mutations/handler/SAVE_WITHDRAWAL_RESPONSE', { rootData: rootState.finance.state.handler, data }, { root: true })
  },
  saveDepositInfoData ({ commit, rootState }, data = { min_amount: null, commission: null, amount: null, promo_code_url: null }) {
    commit('finance/mutations/handler/SAVE_DEPOSIT_INFO_DATA', { rootData: rootState.finance.state.handler, data }, { root: true })
  },
  saveWithdrawalInfoData ({ commit, rootState }, data = { min_amount: null, amount: null, transfer: null }) {
    commit('finance/mutations/handler/SAVE_WITHDRAWAL_INFO_DATA', { rootData: rootState.finance.state.handler, data }, { root: true })
  },
  openCurrentFinanceForm ({ dispatch }, { type, data }) {
    switch (type) {
      case 'redirect':
        window.open(data.url)
        break
      case 'message':
        dispatch('savePopupName', 'finance-deposit-message')
        dispatch('togglePopup', true)
        break
      case 'crypto':
        dispatch('savePopupName', 'finance-deposit-crypto')
        dispatch('togglePopup', true)
        break
      case 'form':
        dispatch('savePopupName', 'finance-deposit-form')
        dispatch('togglePopup', true)
        break
      case 'bank':
        dispatch('savePopupName', 'finance-deposit-bank')
        dispatch('togglePopup', true)
        break
    }
  },
  saveAffiliateCalculator ({ commit, rootState }, payload) {
    commit('partners/mutations/handler/SAVE_AFFILIATE_CALCULATOR_RESULT', { rootData: rootState.partners.state.handler, data: payload.result }, { root: true })
  },
  saveQuestionnaireEu ({ commit, rootState }, payload) {
    commit('profile/mutations/handler/SAVE_QUESTIONNAIRE_EU_STEPS', { rootData: rootState.profile.state.handler, data: payload }, { root: true })
  },
  saveNeedProfileTrader ({ commit, rootState }, payload) {
    commit('profile/mutations/handler/SAVE_NEED_PROFILE_TRADER', { rootData: rootState.profile.state.handler, data: payload }, { root: true })
  },
  saveHandoutFormData ({ commit, rootState }, payload) {
    commit('partners/mutations/handler/SAVE_PROMO_FORM_IMAGE_DATA', { rootData: rootState.partners.state.handler, data: payload }, { root: true })
  },
  async fetchDepositResult ({ commit, dispatch, getters, rootState, rootGetters }, payload) {
    // eslint-disable-next-line prefer-const,camelcase
    let { account, amount, currency, promo, promo_code } = payload && payload.values
      ? payload.values
      : { account: null, amount: null, currency: null, promo: null, promo_code: null }
    const method = rootGetters['finance/getters/handler/getActiveMethod'] || rootGetters['dictionaries/getters/handler/getRoutePages'].current

    if (!promo) {
      // eslint-disable-next-line camelcase
      promo = promo_code || ''
    }

    try {
      const { data } = await this.$axios.get('/v3/deposit/info', { params: { ...getters.params, method, account, amount, currency, promo } })

      if (data.status === 'success') {
        dispatch('saveDepositInfoData', data.result)
      } else if (data.errors) {
        await dispatch('dictionaries/actions/handler/openErrorToast', { description: '' }, { root: true })
      }
    } catch (e) {
      dispatch('dictionaries/actions/auth/checkError', e, { root: true })
    }
  },
  async fetchWithdrawalResult ({ commit, dispatch, getters, rootState, rootGetters }, payload) {
    // eslint-disable-next-line prefer-const
    let { account, amount = '', currency, transfer, inPaymentCurrency } = payload && payload.values
      ? payload.values
      : { account: null, amount: '', currency: null, promo: null, inPaymentCurrency: 0 }
    const method = rootGetters['finance/getters/handler/getActiveMethod'] || rootGetters['dictionaries/getters/handler/getRoutePages'].current

    if (inPaymentCurrency === 1) {
      amount = transfer
    }

    try {
      const { data } = await this.$axios.get('/v3/withdrawal/info', { params: { ...getters.params, account, amount, currency, method, inPaymentCurrency } })

      if (data.status === 'success') {
        dispatch('saveWithdrawalInfoData', data.result)
      } else if (data.errors) {
        await dispatch('dictionaries/actions/handler/openErrorToast', { description: '' }, { root: true })
      }
    } catch (e) {
      dispatch('dictionaries/actions/auth/checkError', e, { root: true })
    }
  }
}
