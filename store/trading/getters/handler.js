export const getters = {
  // Иконки символов валют
  getSymbols: (state, getters, rootState) => rootState.trading.state.handler.symbols,
  // Открытая сделка
  getOpenedTrade: (state, getters, rootState) => rootState.trading.state.handler.openedTrade,
  // Аналитика инструмента
  getInstrumentAnalytics: (state, getters, rootState) => rootState.trading.state.handler.instrumentAnalytics,
  // Объем сделки в режиме быстрой торговли
  getActiveInputVolume: (state, getters, rootState) => rootState.trading.state.handler.activeVolumeInput,
  // Режим отображения торговых инструментов
  getTradingViewMode: (state, getters, rootState) => rootState.trading.state.handler.viewMode,
  // Настройки вида карточки инструмента
  getTradingCardSettings: (state, getters, rootState) => rootState.trading.state.handler.tradingCardSettings,
  // Настройки вида карточки инструмента (обновление)
  getTradingCardSettingsCopy: (state, getters, rootState) => rootState.trading.state.handler.tradingCardSettingsCopy,
  // Активная сортировка инструментов
  getActiveTradeSorting: (state, getters, rootState) => rootState.trading.state.handler.activeSorting || localStorage.getItem('trade_sorting') || 'popularity',
  // Информация о закрытой позиции
  getClosedCurrentTrade: (state, getters, rootState) => rootState.trading.state.handler.closedCurrentTrade,
  // Период торговой статистики
  getTradingPeriod: (state, getters, rootState) => rootState.trading.state.handler.period
}
