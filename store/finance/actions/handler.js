export const actions = {
  // Получение списка способов пополнения
  async fetchDepositList ({ commit, dispatch, rootGetters, rootState }) {
    try {
      const { data } = await this.$axios.get('v3/deposit/list', rootGetters['dictionaries/getters/handler/getParams'])

      if (data.status === 'success') {
        await commit('finance/mutations/handler/SAVE_DEPOSIT_LIST', { rootData: rootState.finance.state.handler, data: data.list }, { root: true })
      }
    } catch (e) {
      dispatch('dictionaries/actions/auth/checkError', e, { root: true })
    }
  },
  // Получение сгруппированного списка способов пополнения
  async fetchGroupedDepositList ({ commit, dispatch, rootGetters, rootState }) {
    try {
      const { data } = await this.$axios.get('v3/deposit/list-grouped', rootGetters['dictionaries/getters/handler/getParams'])

      if (data.status === 'success') {
        await commit('finance/mutations/handler/SAVE_FAVORITE_DEPOSIT_METHODS', { rootData: rootState.finance.state.handler, data: data.favorite }, { root: true })
        await commit('finance/mutations/handler/SAVE_GROUPED_DEPOSIT_LIST', { rootData: rootState.finance.state.handler, data: data.types }, { root: true })
      }
    } catch (e) {
      dispatch('dictionaries/actions/auth/checkError', e, { root: true })
    }
  },
  // Получение списка способов вывода
  async fetchWithdrawalList ({ commit, dispatch, rootGetters, rootState }) {
    try {
      const { data } = await this.$axios.get('v3/withdrawal/list', rootGetters['dictionaries/getters/handler/getParams'])

      if (data.status === 'success') {
        await commit('finance/mutations/handler/SAVE_WITHDRAWAL_LIST', { rootData: rootState.finance.state.handler, data: data.list }, { root: true })
      }
    } catch (e) {
      dispatch('dictionaries/actions/auth/checkError', e, { root: true })
    }
  },
  // Получение сгруппированного списка способов вывода
  async fetchGroupedWithdrawalList ({ commit, dispatch, rootGetters, rootState }) {
    try {
      const { data } = await this.$axios.get('v3/withdrawal/list-grouped', rootGetters['dictionaries/getters/handler/getParams'])

      if (data.status === 'success') {
        await commit('finance/mutations/handler/SAVE_FAVORITE_WITHDRAWAL_METHODS', { rootData: rootState.finance.state.handler, data: data.favorite }, { root: true })
        await commit('finance/mutations/handler/SAVE_GROUPED_WITHDRAWAL_LIST', { rootData: rootState.finance.state.handler, data: data.types }, { root: true })
      }
    } catch (e) {
      dispatch('dictionaries/actions/auth/checkError', e, { root: true })
    }
  },
  // Получение истории переводов
  async fetchFinanceHistory ({ commit, dispatch, rootGetters, rootState }, page) {
    const params = { ...rootGetters['dictionaries/getters/handler/getParams'].params }
    params.page = page || 1

    try {
      const { data } = await this.$axios.post('v3/finance/get-history', {}, { params })

      if (data.status === 'success') {
        await commit('finance/mutations/handler/SAVE_FINANCE_HISTORY', { rootData: rootState.finance.state.handler, data }, { root: true })
      }
    } catch (e) {
      dispatch('dictionaries/actions/auth/checkError', e, { root: true })
    }
  },
  // Отмена вывода
  async cancelWithdrawal ({ dispatch, rootGetters }) {
    dispatch('dictionaries/actions/handler/togglePreloader', true, { root: true })

    const params = { ...rootGetters['dictionaries/getters/handler/getParams'].params }
    params.id = rootGetters['finance/getters/handler/getActiveTransaction'].id

    try {
      const { data } = await this.$axios.get('v3/withdrawal/cancel', { params })

      if (data.status === 'success') {
        await dispatch('fetchFinanceHistory')
      }
    } catch (e) {
      dispatch('dictionaries/actions/auth/checkError', e, { root: true })
    }

    dispatch('dictionaries/actions/handler/togglePreloader', false, { root: true })
  },
  // Данные страницы "Финансы / кошелек"
  async fetchFinanceWallets ({ dispatch, commit, rootState, rootGetters }) {
    dispatch('dictionaries/actions/handler/togglePreloader', true, { root: true })

    try {
      const { data } = await this.$axios.get('v3/finance/wallets', rootGetters['dictionaries/getters/handler/getParams'])

      if (data.status === 'success') {
        await commit('finance/mutations/handler/SAVE_FINANCE_WALLETS', { rootData: rootState.finance.state.handler, data: data.result }, { root: true })
      }
    } catch (e) {
      dispatch('dictionaries/actions/auth/checkError', e, { root: true })
    }

    dispatch('dictionaries/actions/handler/togglePreloader', false, { root: true })
  },
  //
  async fetchFinanceHistoryCount ({ commit, dispatch, rootState, rootGetters }, payload) {
    const params = {
      token: rootGetters['dictionaries/getters/handler/getParams'].params.token,
      _lang: rootGetters['dictionaries/getters/handler/getParams'].params._lang,
      ...payload
    }
    try {
      const { data } = await this.$axios.get('v3/finance/get-history-count', { params })

      if (data.status === 'success') {
        await commit('finance/mutations/handler/SAVE_FINANCE_HISTORY_COUNT', { rootData: rootState.finance.state.handler, data: data.count }, { root: true })
      }
    } catch (e) {
      dispatch('dictionaries/actions/auth/checkError', e, { root: true })
    }
  },
  // Удаление кошелька
  async deleteWallet ({ dispatch, rootState, rootGetters }, id) {
    try {
      const { data } = await this.$axios.post('v3/finance/delete-wallets', { id }, rootGetters['dictionaries/getters/handler/getParams'])

      if (data.status === 'success') {
        dispatch('fetchFinanceWallets')
      }
    } catch (e) {
      dispatch('dictionaries/actions/auth/checkError', e, { root: true })
    }
  },
  // Код подтверждения (вывод)
  async sendWithdrawalConfirmCode ({ commit, dispatch, rootState, rootGetters }) {
    try {
      const { data } = await this.$axios.get('v3/withdrawal/confirm-send', rootGetters['dictionaries/getters/handler/getParams'])

      if (data.status === 'success') {
        await commit('finance/mutations/handler/SAVE_WITHDRAWAL_CONFIRM_PAYLOAD', { rootData: rootState.finance.state.handler, data }, { root: true })
      }
    } catch (e) {
      dispatch('dictionaries/actions/auth/checkError', e, { root: true })
    }
  },
  // Подверждение вывода
  async confirmWithdrawal ({ commit, dispatch, rootState, rootGetters }, code) {
    const params = {
      token: rootGetters['dictionaries/getters/handler/getParams'].params.token,
      _lang: rootGetters['dictionaries/getters/handler/getParams'].params._lang,
      code
    }
    try {
      const { data } = await this.$axios.get('v3/withdrawal/confirm-check', { params })

      if (data.status === 'success') {
        await dispatch('dictionaries/actions/handler/openSuccessToast', { description: data.message }, { root: true })
        await commit('dictionaries/mutations/handler/TOGGLE_POPUP', { rootData: rootState.dictionaries.state.handler, data: false }, { root: true })
      } else {
        dispatch('dictionaries/actions/handler/openErrorToast', { description: data.error }, { root: true })
      }
    } catch (e) {
      dispatch('dictionaries/actions/auth/checkError', e, { root: true })
    }
  },
  async clearDepositData ({ commit, rootState }) {
    await commit('forms/mutations/handler/SAVE_FORM', { rootData: rootState.forms.state.handler, data: [] }, { root: true })
    await commit('finance/mutations/handler/SAVE_DEPOSIT_INFO', { rootData: rootState.finance.state.handler, data: {} }, { root: true })
    await commit('finance/mutations/handler/SAVE_DEPOSIT_INFO_RESPONSE', { rootData: rootState.finance.state.handler, data: [] }, { root: true })
    await commit('finance/mutations/handler/SAVE_DEPOSIT_DATA_RESPONSE', { rootData: rootState.finance.state.handler, data: {} }, { root: true })
  },
  async clearWithdrawalData ({ commit, rootState }) {
    //
  }
}
