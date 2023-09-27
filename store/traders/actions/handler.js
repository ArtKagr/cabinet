export const actions = {
  // Получение списка трейдеров
  async fetchTraders ({ commit, dispatch, getters, rootState, rootGetters }, page = 1) {
    const token = rootGetters['dictionaries/getters/handler/getParams'].params.token

    const data = localStorage.getItem('traders_filter_settings')

    const isFavoritePage = rootGetters['dictionaries/getters/handler/getActiveMenuLinksItem'] === 'favorite'

    let filters

    if (data) {
      const parseData = JSON.parse(data)

      filters = {
        sort: localStorage.getItem('traders_sorting') || rootGetters['traders/getters/handler/getActiveTradersSorting'],
        period: rootGetters['traders/getters/handler/getActivePeriod'],
        'filter[profit][from]': parseData.profit[0],
        'filter[profit][to]': parseData.profit[1],
        'filter[days][from]': parseData.days,
        'filter[investors_count][from]': parseData.investors_count,
        'filter[risk][to]': parseData.risk,
        'filter[profit_sharing][to]': parseData.profit_sharing,
        'filter[trader_equity][from]': parseData.trader_equity,
        'filter[investors_equity][from]': parseData.investors_equity,
        'filter[country]': parseData.country,
        'filter[favorite]': isFavoritePage
      }
    } else {
      filters = {
        sort: localStorage.getItem('traders_sorting') || rootGetters['traders/getters/handler/getActiveTradersSorting'],
        period: rootGetters['traders/getters/handler/getActivePeriod'],
        'filter[favorite]': isFavoritePage
      }
    }

    try {
      const { data } = await this.$axios.get('/v3/traders/get-traders', { params: { token, ...filters, page } })

      if (data.status === 'success') {
        await commit('traders/mutations/handler/SAVE_TRADERS_DATA', { data: data.traders, rootData: rootState.traders.state.handler }, { root: true })
        await dispatch('fetchTradersCount', filters)
      } else {
        await dispatch('dictionaries/actions/handler/openErrorToast', { description: data.error }, { root: true })
      }
    } catch (e) {
      dispatch('dictionaries/actions/auth/checkError', e, { root: true })
    }
  },
  //
  async fetchTradersCount ({ commit, dispatch, rootState, rootGetters }, filter) {
    const token = rootGetters['dictionaries/getters/handler/getParams'].params.token
    const _lang = rootGetters['dictionaries/getters/handler/getRoutePages'].locale

    try {
      const { data } = await this.$axios.get('/v3/traders/get-traders-count', { params: { token, ...filter, _lang } })

      if (data.status === 'success') {
        await commit('traders/mutations/handler/SAVE_TRADERS_COUNT', { data, rootData: rootState.traders.state.handler }, { root: true })
      } else {
        await dispatch('dictionaries/actions/handler/openErrorToast', null, { root: true })
      }
    } catch (e) {
      dispatch('dictionaries/actions/auth/checkError', e, { root: true })
    }
  },
  // Переключение избранного трейдера
  async toggleFavoriteTrader ({ commit, dispatch, rootState, rootGetters }, payload) {
    const token = rootGetters['dictionaries/getters/handler/getParams'].params.token

    try {
      const { data } = await this.$axios.get('/v3/traders/switch-favorite', { params: { token, trader: payload.trader } })

      if (data.status === 'success') {
        // dispatch('fetchCurrentTrader', rootGetters['dictionaries/getters/handler/getRoutePages'].current)

        if (payload.source === 'list') {
          await dispatch('fetchTraders')
        } else {
          await dispatch('fetchCurrentTrader', payload.trader)
        }
      } else {
        await dispatch('dictionaries/actions/handler/openErrorToast', { description: data.error }, { root: true })
      }
    } catch (e) {
      dispatch('dictionaries/actions/auth/checkError', e, { root: true })
    }
  },
  // Получение информации о трейдере
  async fetchCurrentTrader ({ commit, dispatch, rootState, rootGetters }, id) {
    const token = rootGetters['dictionaries/getters/handler/getParams'].params.token
    const _lang = rootGetters['dictionaries/getters/handler/getRoutePages'].locale

    try {
      const { data } = await this.$axios.get('/v3/traders/get-trader-info', { params: { token, id, _lang } })

      if (data.status === 'success') {
        await commit('traders/mutations/handler/SAVE_CURRENT_TRADER', { data: data.trader, rootData: rootState.traders.state.handler }, { root: true })
      } else {
        await dispatch('dictionaries/actions/handler/openErrorToast', { description: data.error }, { root: true })
      }
    } catch (e) {
      dispatch('dictionaries/actions/auth/checkError', e, { root: true })
    }

    // status (newValue) {
    //   switch (newValue) {
    //     case 'trader-successfully-favorite':
    //     case 'copying-successfully-changed':
    //     case 'copying-successfully-stopped':
    //       this.$store.dispatch('traders/actions/handler/fetchCurrentTrader', this.routePages.current)
    //       break
    //   }
    // }
  },
  // Получение портфеля трейдера
  async fetchCurrentTraderPortfolio ({ commit, dispatch, rootState, rootGetters }, id) {
    const token = rootGetters['dictionaries/getters/handler/getParams'].params.token
    const _lang = rootGetters['dictionaries/getters/handler/getRoutePages'].locale

    try {
      const { data } = await this.$axios.get('/v3/traders/get-portfolio', { params: { token, id, _lang } })

      if (data.status === 'success') {
        await commit('traders/mutations/handler/SAVE_TRADER_INFO', { data, rootData: rootState.traders.state.handler }, { root: true })
      } else {
        await dispatch('dictionaries/actions/handler/openErrorToast', { description: data.error }, { root: true })
      }
    } catch (e) {
      dispatch('dictionaries/actions/auth/checkError', e, { root: true })
    }
  },
  // Получение истории торговли трейдера
  async fetchCurrentTraderHistory ({ commit, dispatch, rootState, rootGetters }, payload) {
    const token = rootGetters['dictionaries/getters/handler/getParams'].params.token
    const _lang = rootGetters['dictionaries/getters/handler/getRoutePages'].locale

    try {
      const { data } = await this.$axios.get('/v3/traders/get-history', { params: { token, ...payload, _lang } })

      if (data.status === 'success') {
        await commit('traders/mutations/handler/SAVE_TRADER_HISTORY', { data, rootData: rootState.traders.state.handler }, { root: true })
      } else {
        await dispatch('dictionaries/actions/handler/openErrorToast', { description: data.error }, { root: true })
      }
    } catch (e) {
      dispatch('dictionaries/actions/auth/checkError', e, { root: true })
    }
  }
}
