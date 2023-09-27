export const actions = {
  // Установить юзера
  async userInit ({ rootGetters }, data) {
    await rootGetters['socket/getSocketIo'].emit('user_init', { id: data.id, secret: data.secret_id })
  },
  // Получение торговой информации
  async tradingInit ({ rootGetters }) {
    await rootGetters['socket/getSocketIo'].emit('trading_init')
  },
  // Полная информация по инструменту
  async fetchTradingInstrument ({ rootGetters }, payload) {
    await rootGetters['socket/getSocketIo'].emit('trading_instrument', payload)
  },
  // Открытие сделки
  async openCurrentTrade ({ rootGetters }, payload) {
    await rootGetters['socket/getSocketIo'].emit('position_open', payload)
  },
  // Изменение сделки
  async changeCurrentTrade ({ rootGetters }, payload) {
    await rootGetters['socket/getSocketIo'].emit('position_modify', payload)
  },
  // Закрытие сделки
  async closeCurrentTrade ({ rootGetters }, payload) {
    await rootGetters['socket/getSocketIo'].emit('position_close', payload)
  },
  // Открытие ордера
  async openCurrentOrder ({ rootGetters }, payload) {
    await rootGetters['socket/getSocketIo'].emit('order_open', payload)
  },
  // Изменение ордера
  async changeCurrentOrder ({ rootGetters }, payload) {
    await rootGetters['socket/getSocketIo'].emit('order_modify', payload)
  },
  // Закрытие ордера
  async closeCurrentOrder ({ rootGetters }, payload) {
    await rootGetters['socket/getSocketIo'].emit('order_close', payload)
  },
  // Статистика по инструментам
  async tradingStatistics ({ rootGetters }, payload) {
    await rootGetters['socket/getSocketIo'].emit('trading_statistics', { period: payload })
  },
  // Подписка на график
  async chartSubscribe ({ rootGetters }, payload) {
    await rootGetters['socket/getSocketIo'].emit('chart_subscribe', payload)
  },
  // Отписка от графика
  async chartUnsubscribe ({ rootGetters }, payload) {
    await rootGetters['socket/getSocketIo'].emit('chart_unsubscribe', payload)
  },
  // Переключатель "избранного" у инструмента
  async toggleFavoriteInstrument ({ rootGetters }, payload) {
    await rootGetters['socket/getSocketIo'].emit('trading_favorite_update', payload)
  },
  //
  async tradingSignalsSymbol ({ rootGetters }, payload) {
    await rootGetters['socket/getSocketIo'].emit('trading_signals_symbol', payload)
  },
  // Запуск/изменение копирования трейдера
  async copyAction ({ commit, dispatch, rootState, rootGetters }, payload) {
    dispatch('dictionaries/actions/handler/togglePreloader', true, { root: true })
    try {
      const { data } = await this.$axios.post('/v3/traders/copy-action', payload, rootGetters['dictionaries/getters/handler/getParams'])

      if (data.status === 'success') {
        await dispatch('traders/actions/handler/fetchCurrentTrader', payload.id, { root: true })
        await dispatch('dictionaries/actions/handler/openSuccessToast', { description: data.result || 'success' }, { root: true })
      } else {
        await dispatch('dictionaries/actions/handler/openErrorToast', { description: data.message || data.code }, { root: true })
      }
    } catch (e) {
      dispatch('dictionaries/actions/auth/checkError', e, { root: true })
    }

    dispatch('dictionaries/actions/handler/togglePreloader', false, { root: true })
  },
  // Остановка копирования трейдера
  async stopCopying ({ commit, dispatch, rootState, rootGetters }, id) {
    const token = rootGetters['dictionaries/getters/handler/getParams'].params.token

    dispatch('dictionaries/actions/handler/togglePreloader', true, { root: true })

    try {
      const { data } = await this.$axios.get('/v3/traders/copy-close', { params: { token, id } })

      if (data.status === 'success') {
        await dispatch('traders/actions/handler/fetchCurrentTrader', id, { root: true })
        // await commit('trading/mutations/handler/SAVE_STOP_COPYING_DATA', data, { root: true })
        await dispatch('dictionaries/actions/handler/openSuccessToast', { description: data.result || 'success' }, { root: true })
      } else {
        await dispatch('dictionaries/actions/handler/openErrorToast', { description: data.message || data.code }, { root: true })
      }
    } catch (e) {
      dispatch('dictionaries/actions/auth/checkError', e, { root: true })
    }

    dispatch('dictionaries/actions/handler/togglePreloader', false, { root: true })
  },
  // Аналитика по инструменту
  async fetchInstrumentAnalytics ({ commit, dispatch, rootState, rootGetters }, symbol) {
    const token = rootGetters['dictionaries/getters/handler/getParams'].params.token

    try {
      const { data } = await this.$axios.get('/v3/trading/analytics', { params: { token, symbol } })

      if (data.status === 'success') {
        await commit('trading/mutations/handler/SAVE_INSTRUMENT_ANALYTICS', { rootData: rootState.trading.state.handler, data: data.result }, { root: true })
      }
    } catch (e) {
      dispatch('dictionaries/actions/auth/checkError', e, { root: true })
    }
  },
  //
  tradingCardsSort ({ commit, rootState }, payload) {
    let tradingSort

    if (payload) {
      localStorage.setItem('trade_sorting', payload)
      tradingSort = payload
    } else {
      tradingSort = localStorage.getItem('trade_sorting')
    }

    commit('trading/mutations/handler/UPDATE_TRADING_CARDS_SORT', {
      rootData: rootState.trading.state.handler,
      data: tradingSort
    }, { root: true })
  }
}
