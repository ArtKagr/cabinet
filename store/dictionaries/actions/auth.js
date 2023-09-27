export const actions = {
  // Получение гостевого пользователя
  async fetchGuestUser ({ dispatch, rootGetters }) {
    dispatch('dictionaries/actions/handler/togglePreloader', true, { root: true })

    try {
      const { data } = await this.$axios.get('v3/guest/get', rootGetters['dictionaries/getters/handler/getParams'])

      if (data.status === 'success') {
        await dispatch('saveAuthorizationData', data.auth)
        await dispatch('useUser', { user: data.user, auth: data.auth })
      }
    } catch (e) {
      dispatch('checkError', e)
    }

    dispatch('dictionaries/actions/handler/togglePreloader', false, { root: true })
  },
  // Создание демо-тур пользователя
  async demoCreate ({ dispatch }) {
    dispatch('dictionaries/actions/handler/togglePreloader', true, { root: true })

    try {
      const { data } = await this.$axios.get('v3/guest/demo-create')

      if (data.status === 'success') {
        await dispatch('deleteAccountCurrency')
        await dispatch('saveAuthorizationData', data.auth)
        await dispatch('fetchRealUser')
      }
    } catch (e) {
      dispatch('checkError', e)
    }

    dispatch('dictionaries/actions/handler/togglePreloader', false, { root: true })
  },
  // Получение реального юзера
  async fetchRealUser ({ dispatch, rootGetters }) {
    dispatch('dictionaries/actions/handler/togglePreloader', true, { root: true })

    const auth = rootGetters['dictionaries/getters/user/getAuthorization']

    try {
      const { data } = await this.$axios.get('v3/user/get', rootGetters['dictionaries/getters/handler/getParams'])

      if (data.status === 'success') {
        await dispatch('changeAnalyticsTimezone', data.user)
        await dispatch('useUser', { user: data.user, auth })
      } else if (data.status === 'error' && data.code) {
        await dispatch('dictionaries/actions/handler/openErrorToast', { description: data.code }, { root: true })
      }
    } catch (e) {
      dispatch('checkError', e)
    }

    dispatch('dictionaries/actions/handler/togglePreloader', false, { root: true })
  },
  // Получение реального суб юзера
  async fetchRealSubUser ({ dispatch, commit, rootGetters }, id) {
    const token = rootGetters['dictionaries/getters/handler/getParams'].params.token

    try {
      const { data } = await this.$axios.get('v3/user/sub', { params: { token, id } })

      if (data.status === 'success') {
        await dispatch('saveAuthorizationData', data.auth)
        await dispatch('useUser', { user: data.user, auth: data.auth })
      }
    } catch (e) {
      dispatch('checkError', e)
    }
  },
  // Переключение режимов торговли в реальном юзере (real/demo)
  async switchRealUserMode ({ dispatch, rootGetters }, type) {
    try {
      const { data } = await this.$axios.get(`v3/user/switch-${type}`, rootGetters['dictionaries/getters/handler/getParams'])

      if (data.status === 'success') {
        await dispatch('fetchRealUser')
      }
    } catch (e) {
      dispatch('checkError', e)
    }
  },
  // Logout (Выход из реального юзера в гостевого юзера)
  async logout ({ dispatch, rootGetters }) {
    await dispatch('fetchGuestUser')
    await this.$router.push(`/${rootGetters['dictionaries/getters/handler/getRoutePages'].locale}`)
  },
  //
  //
  saveAuthorizationData ({ commit, rootState }, auth) {
    commit('dictionaries/mutations/user/SAVE_AUTHORIZATION_USER_DATA', { rootData: rootState.dictionaries.state.user, data: auth }, { root: true })
  },
  //
  saveUser ({ commit, dispatch, rootState }, user) {
    commit('dictionaries/mutations/user/SAVE_USER', { rootData: rootState.dictionaries.state.user, data: user }, { root: true })
  },
  //
  async connectSocket ({ dispatch }) {
    await dispatch('socket/socketIoConnect', null, { root: true })
  },
  //
  togglePartnerMode ({ commit, rootState }, user) {
    commit('partners/mutations/handler/TOGGLE_PARTNER_MODE', {
      rootData: { partners: rootState.partners.state.handler, user: rootState.dictionaries.state.user },
      data: user.mode
    }, { root: true })
  },
  //
  changeAnalyticsTimezone ({ commit, rootState }, user) {
    commit('analytics/mutations/handler/CHANGE_ANALYTICS_TIMEZONE', { rootData: rootState.analytics.state.handler, data: user.time_offset }, { root: true })
  },
  //
  deleteAccountCurrency ({ commit, rootState }) {
    commit('trading/mutations/socket/account/DELETE_ACCOUNT_CURRENCY', { rootData: rootState.trading.state.handler }, { root: true })
  },
  //
  async useUser ({ dispatch, rootGetters }, { user, auth }) {
    const currentPage = rootGetters['dictionaries/getters/handler/getRoutePages'].current

    await dispatch('saveUser', user)
    await dispatch('togglePartnerMode', user)
    await dispatch('trading/actions/handler/userInit', auth, { root: true })
    await dispatch('connectSocket')

    switch (user.mode) {
      case 2:
        await dispatch('partners/actions/handler/fetchPartnerValues', null, { root: true })
        break
    }

    switch (currentPage) {
      case 'twitter-watcher':
        if (user.is_twitter_watcher) {
          await dispatch('analytics/actions/handler/fetchTwitterWatcherData', null, { root: true })
        }
        break
    }
  },
  //
  async checkError ({ dispatch }, e) {
    if (e && e.response && e.response.status) {
      switch (e.response.status) {
        case 401:
          await dispatch('dictionaries/actions/auth/logout', null, { root: true })
          break
        case 500:
          await dispatch('dictionaries/actions/handler/openErrorToast', { title: 'Server error', description: '' }, { root: true })
          break
      }
    }
  }
}
