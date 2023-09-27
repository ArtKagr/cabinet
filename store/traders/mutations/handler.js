export const mutations = {
  // Сохранение информации о трейдерах
  SAVE_TRADERS_DATA (state, { rootData, data }) {
    const tradersList = this.$trading.updateTradersList(data.data)

    rootData.traders = {
      data: data.page === 1 ? tradersList : [...rootData.traders.data, ...tradersList],
      has_favorite: data.has_favorite,
      page: data.page,
      page_total: data.page_total,
      pagination: data.pagination
    }
  },
  // Данные фильтра трейдеров
  SAVE_TRADERS_COUNT (state, { rootData, data }) {
    rootData.tradersCount = data
    data.filters.forEach((field) => {
      switch (field.name) {
        case 'profit':
          rootData.tradersFilter['filter[profit][from]'] = Number(field.min)
          rootData.tradersFilter['filter[profit][to]'] = Math.round(Number(field.max) / 10) * 10
          break
        case 'days':
          rootData.tradersFilter['filter[days][from]'] = Number(field.min)
          break
        case 'investors_count':
          rootData.tradersFilter['filter[investors_count][from]'] = Number(field.min)
          break
        case 'risk':
          rootData.tradersFilter['filter[risk][to]'] = Math.round(Number(field.max) / 10) * 10
          break
        case 'profit_sharing':
          rootData.tradersFilter['filter[profit_sharing][to]'] = Math.round(Number(field.max) / 10) * 10
          break
        case 'trader_equity':
          rootData.tradersFilter['filter[trader_equity][from]'] = Number(field.min)
          break
        case 'investors_equity':
          rootData.tradersFilter['filter[investors_equity][from]'] = Number(field.min)
          break
        case 'country':
          rootData.tradersFilter['filter[country]'] = Object.keys(field.items)[0]
          break
      }
    })
  },
  UPDATE_TRADERS_FILTER (state, { rootData, data }) {
    rootData.tradersFilter.page = data.page
    rootData.tradersFilter.period = data.period
    rootData.tradersFilter.sort = data.sort
    rootData.tradersFilter['filter[profit][from]'] = data['filter[profit][from]']
    rootData.tradersFilter['filter[profit][to]'] = data['filter[profit][to]']
    rootData.tradersFilter['filter[days][from]'] = data['filter[days][from]']
    rootData.tradersFilter['filter[investors_count][from]'] = data['filter[investors_count][from]']
    rootData.tradersFilter['filter[risk][to]'] = data['filter[risk][to]']
    rootData.tradersFilter['filter[profit_sharing][to]'] = data['filter[profit_sharing][to]']
    rootData.tradersFilter['filter[trader_equity][from]'] = data['filter[trader_equity][from]']
    rootData.tradersFilter['filter[investors_equity][from]'] = data['filter[investors_equity][from]']
    rootData.tradersFilter['filter[country]'] = data['filter[profit]']
  },
  // Сохранение информации о трейдере
  SAVE_CURRENT_TRADER (state, { rootData, data }) {
    if (data) {
      rootData.currentTrader = data
    }
  },
  // Сохранение информации о трейдере
  SAVE_TRADER_INFO (state, { rootData, data }) {
    rootData.traderInfo = data
  },
  // Активная сортировка списка трейдеров
  SAVE_ACTIVE_TRADERS_SORTING (state, { rootData, data }) {
    rootData.activeSorting = data
  },
  // Активный период списка трейдеров
  SAVE_ACTIVE_TRADERS_PERIOD (state, { rootData, data }) {
    rootData.activePeriod = data
  },
  // Изменение отображения карточек трейдеров
  TOGGLE_TRADER_VIEW_MODE (state, { rootData, data }) {
    rootData.viewMode = data
  },
  // Сохранение истории торговли трейдера
  SAVE_TRADER_HISTORY (state, { rootData, data }) {
    if (Number(data.page) === 1) {
      rootData.traderHistory = data
    } else {
      rootData.traderHistory.history = [...rootData.traderHistory.history, ...data.history]
      rootData.traderHistory.page = data.page
      rootData.traderHistory.pagination = data.pagination
    }
  },
  // Активная вкладка меню страницы трейдеров для возврата со страницы трейдера
  SET_ACTIVE_TRADER_MENU_ITEM (state, { rootData, data }) {
    rootData.traderMenuItem = data
  },
  //
  //
  SAVE_TRADERS_CURRENT_PAGE (state, payload) {
    payload.rootData.tradersFilter.page = payload.data
  },
  UPDATE_TRADER_CARD_SETTINGS (state, payload) {
    payload.rootData.traderCardSettings = Object.assign(payload.rootData.traderCardSettings, payload.data)
  },
  UPDATE_TRADER_CARD_SETTINGS_COPY (state, payload) {
    if (payload.mode === 'assign') {
      payload.rootData.traderCardSettingsCopy.chart = payload.data.chart
      payload.rootData.traderCardSettingsCopy.info = payload.data.info
      payload.rootData.traderCardSettingsCopy.buttons = payload.data.buttons
      payload.rootData.traderCardSettingsCopy.mode = 'assign'
    } else {
      payload.rootData.traderCardSettingsCopy[payload.data.field] = payload.data.flag
      payload.rootData.traderCardSettingsCopy.mode = 'update'
    }
  },
  // Удаление информации о трейдере
  CLEAR_CURRENT_TRADER (state, payload) {
    payload.rootData.currentTrader = Object.assign(payload.rootData.currentTrader, {
      bars: [],
      data: {
        user_id: null,
        is_copying: false
      },
      trades: {}
    })
  }
}
