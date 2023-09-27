export const actions = {
  // Поиск по кабинету
  async cabinetSearch ({ commit, dispatch, rootState, rootGetters }, query) {
    const token = rootGetters['dictionaries/getters/handler/getParams'].params.token

    await commit('dictionaries/mutations/handler/SAVE_CABINET_SEARCH', { rootData: rootState.dictionaries.state.handler, data: { instruments: [], traders: [], referrals: [] } }, { root: true })

    try {
      const { data } = await this.$axios.get('v3/search', { params: { token, query } })

      if (data.status === 'success') {
        await dispatch('dictionaries/actions/handler/toggleSearchPopup', true, { root: true })
        if (data.result === 'empty') {
          await commit('dictionaries/mutations/handler/SAVE_CABINET_SEARCH', { rootData: rootState.dictionaries.state.handler, data: { instruments: [], traders: [], referrals: [] } }, { root: true })
        } else {
          await commit('dictionaries/mutations/handler/SAVE_CABINET_SEARCH', { rootData: rootState.dictionaries.state.handler, data: data.result }, { root: true })
        }
      }
    } catch (e) {
      dispatch('dictionaries/actions/auth/checkError', e, { root: true })
    }
  },
  // Открытие success тоста
  openSuccessToast ({ commit, rootState }, { title = 'success', description = '' }) {
    commit('dictionaries/mutations/handler/SAVE_TOAST', {
      rootData: rootState.dictionaries.state.handler,
      data: { title, description, variant: 'success' }
    }, { root: true })
  },
  // Открытие error тоста
  openErrorToast ({ commit, rootState }, { title = 'error', description = 'Произошла ошибка' }) {
    commit('dictionaries/mutations/handler/SAVE_TOAST', {
      rootData: rootState.dictionaries.state.handler,
      data: { title, description, variant: 'danger' }
    }, { root: true })
  },
  // Показать / скрыть preloader
  togglePreloader ({ commit, rootState }, value) {
    commit('dictionaries/mutations/handler/TOGGLE_PRELOADER', { rootData: rootState.dictionaries.state.handler, data: value }, { root: true })
  },
  // Показать / скрыть модальное окно
  toggleModal ({ commit, rootState }, value) {
    commit('dictionaries/mutations/handler/TOGGLE_MODAL', { rootData: rootState.dictionaries.state.handler, data: value }, { root: true })
  },
  // Показать / скрыть попап
  togglePopup ({ commit, rootState }, value) {
    commit('dictionaries/mutations/handler/TOGGLE_POPUP', { rootData: rootState.dictionaries.state.handler, data: value }, { root: true })
  },
  // Тексты empty layout
  async fetchEmptyLayoutText ({ commit, dispatch, rootState, rootGetters }) {
    try {
      const { data } = await this.$axios.get('v3/layout/out', rootGetters['dictionaries/getters/handler/getParams'])

      if (data.status === 'success') {
        await commit('dictionaries/mutations/handler/SAVE_EMPTY_LAYOUT_TEXT', {
          rootData: rootState.dictionaries.state.handler,
          data: data.translates
        }, { root: true })
      }
    } catch (e) {
      dispatch('dictionaries/actions/auth/checkError', e, { root: true })
    }
  },
  // Загрузка аватарки
  async saveAvatar ({ dispatch, rootGetters }, payload) {
    const token = rootGetters['dictionaries/getters/handler/getParams'].params.token

    const formData = new FormData()
    formData.append('file', payload)

    try {
      const { data } = await this.$axios.post('v3/user/upload-avatar', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        params: { token }
      })

      if (data.status === 'success') {
        await dispatch('dictionaries/actions/handler/openSuccessToast', { description: 'Данные успешно изменены' }, { root: true })
      }
    } catch (e) {
      dispatch('dictionaries/actions/auth/checkError', e, { root: true })
    }
  },
  toggleSearchPopup ({ commit, rootState }, flag) {
    commit('dictionaries/mutations/handler/TOGGLE_SEARCH_POPUP', { rootData: rootState.dictionaries.state.handler, data: flag }, { root: true })
  },
  toggleTradeOpenPopup ({ commit, rootState }, flag) {
    commit('dictionaries/mutations/handler/TOGGLE_TRADE_OPEN_SHOWN_FLAG', { rootData: rootState.dictionaries.state.handler, data: flag }, { root: true })
  },
  toggleTradeClosePopup ({ commit, rootState }, flag) {
    commit('dictionaries/mutations/handler/TOGGLE_TRADE_CLOSE_SHOWN_FLAG', { rootData: rootState.dictionaries.state.handler, data: flag }, { root: true })
  },
  showPopup ({ commit, rootState }, popupName) {
    commit('dictionaries/mutations/handler/SAVE_POPUP_NAME', { rootData: rootState.dictionaries.state.handler, data: popupName }, { root: true })
    commit('dictionaries/mutations/handler/TOGGLE_POPUP', { rootData: rootState.dictionaries.state.handler, data: true }, { root: true })
  }
}
