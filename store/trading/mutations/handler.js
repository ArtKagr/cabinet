export const mutations = {
  // Сохранение открытой сделки
  SAVE_OPENED_TRADE (state, payload) {
    payload.rootData.openedTrade = payload.data
  },
  // Сохранение открытой категории инструментов
  UPDATE_TRADING_CATEGORY (state, payload) {
    payload.rootData.activeCategory = payload.data
  },
  // Сохранение объема сделки в режиме быстрой торговли
  SAVE_ACTIVE_VOLUME_INPUT (state, payload) {
    payload.rootData.activeVolumeInput = payload.data
  },
  // Сохранение аналитики инструмента
  SAVE_INSTRUMENT_ANALYTICS (state, payload) {
    payload.data.analytics = payload.data.analytics
      ? payload.data.analytics.map((item) => {
        item.is_shown = false
        return item
      })
      : []
    payload.rootData.instrumentAnalytics = Object.assign(payload.rootData.instrumentAnalytics, payload.data)
  },
  // Изменение режима отображения торговых инструментов
  TOGGLE_TRADING_VIEW_MODE (state, payload) {
    payload.rootData.viewMode = payload.data
  },
  // Обновление настроек отображение карточки инструмента
  UPDATE_TRADING_CARD_SETTINGS (state, payload) {
    payload.rootData.tradingCardSettings = Object.assign(payload.rootData.tradingCardSettings, payload.data)
  },
  // Обновление настроек отображение карточки инструмента
  UPDATE_TRADING_CARD_SETTINGS_COPY (state, payload) {
    if (payload.mode === 'assign') {
      payload.rootData.tradingCardSettingsCopy.chart = payload.data.chart
      payload.rootData.tradingCardSettingsCopy.info = payload.data.info
      payload.rootData.tradingCardSettingsCopy.buttons = payload.data.buttons
      payload.rootData.tradingCardSettingsCopy.mode = 'assign'
    } else if (payload.mode === 'update') {
      payload.rootData.tradingCardSettingsCopy[payload.data.field] = payload.data.flag
      payload.rootData.tradingCardSettingsCopy.mode = 'update'
    }
  },
  // Показать полное описание карты аналитики
  SHOW_ANALYTICS_CARD_DESCRIPTION (state, payload) {
    payload.rootData.instrumentAnalytics.analytics = payload.rootData.instrumentAnalytics.analytics.map((item) => {
      if (item.id === payload.data) {
        item.is_shown = true
      }
      return item
    })
  },
  // Сортировка торговых карточек
  UPDATE_TRADING_CARDS_SORT (state, payload) {
    const categories = [0, 1, 2, 3, 5, 6, 7, 8]
    payload.rootData.activeSorting = payload.data

    categories.forEach((category) => {
      payload.rootData.tradingCards[category] = payload.rootData.tradingCards[category].sort((a, b) => {
        switch (payload.data) {
          case 'name':
            return a.symbol > b.symbol ? 1 : a.symbol < b.symbol ? -1 : 0
          case 'popularity':
            return b.popularity - a.popularity
          case 'volatility':
            return b.volatility - a.volatility
          case 'rise':
            return b.priceChange - a.priceChange
          case 'fall':
            return a.priceChange - b.priceChange
          default:
            return b.popularity - a.popularity
        }
      })
    })
  }
}
