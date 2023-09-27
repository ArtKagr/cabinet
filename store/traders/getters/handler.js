export const getters = {
  // Информация о трейдерах
  getTraders: (state, getters, rootState) => JSON.parse(JSON.stringify(rootState.traders.state.handler.traders)),
  // Активный период отображения трейдеров
  getActivePeriod: (state, getters, rootState) => rootState.traders.state.handler.activePeriod || localStorage.getItem('traders_period') || 'all',
  // Активная сортировка трейдеров
  getActiveTradersSorting: (state, getters, rootState) => rootState.traders.state.handler.activeSorting || localStorage.getItem('traders_sorting') || 'total_equity',
  // Настройки вида карточки трейдера
  getTraderCardSettings: (state, getters, rootState) => JSON.parse(JSON.stringify(rootState.traders.state.handler.traderCardSettings)),
  // Настройки вида карточки трейдера
  getTraderCardSettingsCopy: (state, getters, rootState) => JSON.parse(JSON.stringify(rootState.traders.state.handler.traderCardSettingsCopy)),
  // Режим просмотра карточек трейдеров
  getTraderViewMode: (state, getters, rootState) => rootState.traders.state.handler.viewMode,
  // Информация о трейдере
  getCurrentTrader: (state, getters, rootState) => JSON.parse(JSON.stringify(rootState.traders.state.handler.currentTrader)),
  // Активная вкладка меню для возврата со страницы трейдера
  getActiveTraderMenuItem: (state, getters, rootState) => rootState.traders.state.handler.traderMenuItem,
  // Информация о трейдере
  getTraderInfo: (state, getters, rootState) => JSON.parse(JSON.stringify(rootState.traders.state.handler.traderInfo)),
  // История торговли трейдера
  getTraderHistory: (state, getters, rootState) => JSON.parse(JSON.stringify(rootState.traders.state.handler.traderHistory)),
  // Данные фильтра трейдеров
  getTradersCount: (state, getters, rootState) => JSON.parse(JSON.stringify(rootState.traders.state.handler.tradersCount)),
  //
  getTradersFilter: (state, getters, rootState) => JSON.parse(JSON.stringify(rootState.traders.state.handler.tradersFilter)),
  // Информация о трейдере с информацией о копировании
  getCurrentTraderInvestment: (state, getters, rootState, rootGetters) => {
    const currentTrader = getters.getCurrentTrader.data
    if (currentTrader.user_id) {
      currentTrader.investment = rootGetters['trading/getters/trading/getInvestments'].find(currentInvestment => currentInvestment.user_id === currentTrader.user_id) || {}
    } else {
      currentTrader.investment = { user_id: null, status: null }
    }
    currentTrader.copyData = {
      sl: currentTrader.investment && currentTrader.investment.sl ? currentTrader.investment.sl : 0,
      tp: currentTrader.investment && currentTrader.investment.tp ? currentTrader.investment.tp : 0,
      copy_type: currentTrader.investment && currentTrader.investment.copy_type ? currentTrader.investment.copy_type : 4,
      copy_value: currentTrader.investment && currentTrader.investment.copy_value ? currentTrader.investment.copy_value : 100
    }
    return currentTrader
  }
}
