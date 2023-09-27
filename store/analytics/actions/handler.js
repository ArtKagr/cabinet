export const actions = {
  // Получение ленты аналитики
  async fetchAnalyticsData ({ commit, dispatch, rootGetters, rootState }, page) {
    const params = { ...rootGetters['dictionaries/getters/handler/getParams'].params }
    const types = rootGetters['analytics/getters/handler/getAnalyticsDataFilterActiveKeys'].types
    const instruments = rootGetters['analytics/getters/handler/getAnalyticsDataFilterActiveKeys'].instruments.reduce((acc, value, index) => {
      acc[`instrument[${index}]`] = value
      return acc
    }, {})
    params.timeZoneOffset = rootGetters['analytics/getters/handler/getActiveTimeZone']
    params.type = types.length ? types : undefined
    params.page = page || 1

    try {
      const { data } = await this.$axios.get('v3/analytics', { params: { ...params, ...instruments } })

      if (data.status === 'success') {
        await commit('analytics/mutations/handler/SAVE_ANALYTICS_DATA', { rootData: rootState.analytics.state.handler, data }, { root: true })
      }
    } catch (e) {
      dispatch('dictionaries/actions/auth/checkError', e, { root: true })
    }
  },
  // Получение сигналов
  async fetchAnalyticsSignals ({ commit, dispatch, rootGetters, rootState }) {
    dispatch('dictionaries/actions/handler/togglePreloader', true, { root: true })

    const params = { ...rootGetters['dictionaries/getters/handler/getParams'].params }
    const signals = rootGetters['analytics/getters/handler/getAnalyticsDataFilterActiveKeys'].signals
    params.timeZoneOffset = rootGetters['analytics/getters/handler/getActiveTimeZone']
    params.type = rootGetters['analytics/getters/handler/getActiveSignalsMenuItem']
    params.period = rootGetters['analytics/getters/handler/getActiveSignalPeriod']
    params.recommend = signals.length ? signals : undefined

    try {
      const { data } = await this.$axios.get('v3/analytics/signals', { params })

      if (data.status === 'success') {
        await commit('analytics/mutations/handler/SAVE_ANALYTICS_FAVORITE_SIGNALS', { rootData: rootState.analytics.state.handler, data: data.favorite }, { root: true })
        await commit('analytics/mutations/handler/SAVE_ANALYTICS_SIGNALS', { rootData: rootState.analytics.state.handler, data: data.data }, { root: true })
      }
    } catch (e) {
      dispatch('dictionaries/actions/auth/checkError', e, { root: true })
    }

    dispatch('dictionaries/actions/handler/togglePreloader', false, { root: true })
  },
  // Обновление инструмента
  async toggleFavoriteSignal ({ commit, dispatch, rootGetters, rootState }, symbol) {
    dispatch('dictionaries/actions/handler/togglePreloader', true, { root: true })

    const params = { ...rootGetters['dictionaries/getters/handler/getParams'].params }
    params.symbol = symbol

    try {
      const { data } = await this.$axios.get('v3/trading/switch-favorite', { params })

      if (data.status === 'success') {
        await dispatch('fetchAnalyticsSignals')
      }
    } catch (e) {
      dispatch('dictionaries/actions/auth/checkError', e, { root: true })
    }

    dispatch('dictionaries/actions/handler/togglePreloader', false, { root: true })
  },
  // Получение календаря
  async fetchAnalyticsCalendar ({ commit, dispatch, rootGetters, rootState }, page) {
    const params = { ...rootGetters['dictionaries/getters/handler/getParams'].params }
    const priority = rootGetters['analytics/getters/handler/getAnalyticsDataFilterActiveKeys'].priority
    const countries = rootGetters['analytics/getters/handler/getAnalyticsDataFilterActiveKeys'].countries.reduce((acc, value, index) => {
      acc[`country[${index}]`] = value
      return acc
    }, {})
    params.timeZoneOffset = rootGetters['analytics/getters/handler/getActiveTimeZone']
    params.period = rootGetters['analytics/getters/handler/getAnalyticsActiveCalendarPeriod']
    params.priority = priority.length ? priority : undefined
    params.countries = countries.length ? countries : undefined
    params.page = page || 1

    try {
      const { data } = await this.$axios.get('v3/analytics/calendar', { params: { ...params, ...countries } })

      if (data.status === 'success') {
        await commit('analytics/mutations/handler/SAVE_ANALYTICS_CALENDAR', { rootData: rootState.analytics.state.handler, data }, { root: true })
      }
    } catch (e) {
      dispatch('dictionaries/actions/auth/checkError', e, { root: true })
    }
  },
  // Получение списков для календаря
  async fetchAnalyticsCalendarFilter ({ commit, dispatch, rootGetters, rootState }) {
    try {
      const { data } = await this.$axios.get('v3/analytics/calendar-filter', rootGetters['dictionaries/getters/handler/getParams'])

      if (data.status === 'success') {
        await commit('analytics/mutations/handler/SAVE_ANALYTICS_CALENDAR_FILTER', { rootData: rootState.analytics.state.handler, data }, { root: true })
      }
    } catch (e) {
      dispatch('dictionaries/actions/auth/checkError', e, { root: true })
    }
  },
  // Получение процентных ставок
  async fetchAnalyticsInterestRates ({ commit, dispatch, rootGetters, rootState }) {
    dispatch('dictionaries/actions/handler/togglePreloader', true, { root: true })

    try {
      const { data } = await this.$axios.get('v3/analytics/interest-rates', rootGetters['dictionaries/getters/handler/getParams'])

      if (data.status === 'success') {
        await commit('analytics/mutations/handler/SAVE_ANALYTICS_INTEREST_RATES', { rootData: rootState.analytics.state.handler, data: data.rates }, { root: true })
      }
    } catch (e) {
      dispatch('dictionaries/actions/auth/checkError', e, { root: true })
    }

    dispatch('dictionaries/actions/handler/togglePreloader', false, { root: true })
  },
  async fetchTwitterWatcherData ({ commit, dispatch, rootState, rootGetters }) {
    try {
      const { data } = await this.$axios.get('v3/analytics/twitter-watcher', rootGetters['dictionaries/getters/handler/getParams'])

      if (data.status === 'success') {
        await commit('analytics/mutations/handler/SAVE_ANALYTICS_TWITTER_WATCHER', { rootData: rootState.analytics.state.handler, data }, { root: true })
      }
    } catch (e) {
      dispatch('dictionaries/actions/auth/checkError', e, { root: true })
    }
  }
}
