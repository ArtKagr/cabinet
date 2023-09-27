export const actions = {
  // Получение данных страницы метатрейдер
  async fetchMetatraderData ({ commit, dispatch, rootGetters, rootState }) {
    try {
      const { data } = await this.$axios.get('v3/mt/get-list', rootGetters['dictionaries/getters/handler/getParams'])

      if (data.status === 'success') {
        await commit('metatrader/mutations/handler/SAVE_METATRADER_DATA', { rootData: rootState.metatrader.state.handler, data }, { root: true })
      }
    } catch (e) {
      dispatch('dictionaries/actions/auth/checkError', e, { root: true })
    }
  },
  // Присваивание аккаунту статуса "основной"
  async setPrimaryAccount ({ dispatch, rootGetters }) {
    dispatch('dictionaries/actions/handler/togglePreloader', true, { root: true })

    const params = {
      token: rootGetters['dictionaries/getters/user/getUserToken'],
      server: rootGetters['metatrader/getters/handler/getActualAccount'].server,
      login: rootGetters['metatrader/getters/handler/getActualAccount'].login
    }

    try {
      const { data } = await this.$axios.get('v3/mt/set-primary', { params })

      if (data.status === 'success') {
        await dispatch('metatrader/actions/handler/fetchMetatraderData', null, { root: true })
        await dispatch('trading/actions/handler/tradingInit', null, { root: true })
      }
    } catch (e) {
      dispatch('dictionaries/actions/auth/checkError', e, { root: true })
    }

    dispatch('dictionaries/actions/handler/togglePreloader', false, { root: true })
  },
  // Информация о VPS
  async fetchVpsInfo ({ commit, dispatch, rootState, rootGetters }) {
    try {
      const { data } = await this.$axios.get('/v3/vps/get-info', rootGetters['dictionaries/getters/handler/getParams'])

      if (data.status === 'success') {
        await commit('metatrader/mutations/handler/SAVE_VPS_INFO', { rootData: rootState.metatrader.state.handler, data }, { root: true })
      }
    } catch (e) {
      dispatch('dictionaries/actions/auth/checkError', e, { root: true })
    }
  },
  // Обнулить торговую статистику
  async userTraderReset ({ dispatch, rootGetters }) {
    dispatch('dictionaries/actions/handler/togglePreloader', true, { root: true })

    try {
      const { data } = await this.$axios.get('/v3/mt/reset-trader', rootGetters['dictionaries/getters/handler/getParams'])

      if (data.status === 'success') {
        await dispatch('metatrader/actions/handler/fetchMetatraderData', null, { root: true })
        await dispatch('trading/actions/handler/tradingInit', null, { root: true })
        await dispatch('dictionaries/actions/handler/openSuccessToast', { title: 'Обнуление статистики', description: 'Статистика счета была обнулена' }, { root: true })
      }
      console.warn('data', data)
    } catch (e) {
      dispatch('dictionaries/actions/auth/checkError', e, { root: true })
    }

    dispatch('dictionaries/actions/handler/togglePreloader', false, { root: true })
  }
}
