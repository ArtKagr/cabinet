import moment from 'moment'

export const getters = {
  // Активная временная зона
  getActiveTimeZone: (state, getters, rootState) => JSON.parse(JSON.stringify(rootState.analytics.state.handler.activeTimeZone)),
  // id открытой новости аналитики
  getCurrentAnalyticsId: (state, getters, rootState) => rootState.analytics.state.handler.currentAnalyticsId,
  // Лента аналитики
  getAnalyticsData: (state, getters, rootState, rootGetters) => {
    return rootState.analytics.state.handler.analyticsData.reduce((preVal, value, index) => {
      let date = ''
      if (['ar', 'ps', 'my', 'fa'].includes(rootGetters['dictionaries/getters/handler/getRoutePages'].locale)) {
        date = value.date
      } else {
        date = moment(value.date).format('DD.MM.YYYY')
      }
      if (!Object.keys(preVal).includes(date)) {
        preVal[date] = []
      }
      preVal[date].push({
        id: index,
        category: value.category,
        type: value.type === 1 ? 'tech' : 'fund',
        date_time: value.date,
        symbol: value.pair || 'Другое',
        title: value.title,
        description: value.text,
        is_shown: getters.getCurrentAnalyticsId === index
      })
      return preVal
    }, {})
  },
  // Страница ленты аналитики
  getAnalyticsDataPage: (state, getters, rootState) => rootState.analytics.state.handler.analyticsDataPage,
  // Сигналы
  getAnalyticsSignals: (state, getters, rootState) => {
    return rootState.analytics.state.handler.analyticsSignals.map((signal, index) => {
      return {
        id: index,
        favorite: getters.getAnalyticsFavoriteSignals.includes(signal.pair),
        date_time: signal.date,
        symbol: signal.pair,
        recommendations: null,
        ...signal
      }
    })
  },
  // Избранные сигналы
  getAnalyticsFavoriteSignals: (state, getters, rootState) => JSON.parse(JSON.stringify(rootState.analytics.state.handler.analyticsFavoriteSignals)),
  // id открытого календаря
  getAnalyticsCalendarIds: (state, getters, rootState) => rootState.analytics.state.handler.analyticsCalendarIds,
  // Активные табы открытых событий календаря
  getAnalyticsCalendarTabs: (state, getters, rootState) => rootState.analytics.state.handler.analyticsCalendarTabs,
  // Календарь
  getAnalyticsCalendar: (state, getters, rootState) => rootState.analytics.state.handler.analyticsCalendar.reduce((acc, value, index) => {
    const date = value.date.split(' ')[0]
    const currenTab = getters.getAnalyticsCalendarTabs.find(item => item.id === index)
    if (!Object.keys(acc).includes(date)) {
      acc[date] = []
    }
    acc[date].push({
      id: index,
      date_time: value.date.split(' ')[1],
      before_news: null,
      priority: Number(value.priority),
      country: value.country_code,
      title: value.event,
      description: value.event_description,
      lastEvents: value.lastEvents,
      chartData: value.chartData,
      previous: value.previous,
      forecast: value.forecast,
      actual: value.actual,
      is_shown: getters.getAnalyticsCalendarIds.includes(index),
      activeTab: currenTab && currenTab.activeTab ? currenTab.activeTab : 'description'
    })
    return acc
  }, {}),
  // Страница календаря
  getAnalyticsCalendarPage: (state, getters, rootState) => rootState.analytics.state.handler.analyticsCalendarPage,
  // Событие календаря аналитики (открытое в попапе)
  getCurrentCalendarEvent: (state, getters, rootState) => {
    return JSON.parse(JSON.stringify(rootState.analytics.state.handler.currentCalendarEvent))
  },
  // Активный период в календаре
  getAnalyticsActiveCalendarPeriod: (state, getters, rootState) => JSON.parse(JSON.stringify(rootState.analytics.state.handler.analyticsActiveCalendarPeriod)),
  // Процентные ставки
  getAnalyticsRates: (state, getters, rootState) => {
    return rootState.analytics.state.handler.analyticsRates.map((rate) => {
      rate.countryArray = getters.getAnalyticsCountriesList.find(item => item[0] === rate.country)
      rate.countryTitle = rate.countryArray && rate.countryArray.length ? rate.countryArray[1] : null
      rate.ratesShort = rate.rates && rate.rates.length
        ? rate.rates.slice(0, 5).reduce((result, item) => {
          result[moment(item.date).format('DD.MM.YYYY')] = item.rate
          return result
        }, {})
        : {}
      return rate
    })
  },
  // Список стран
  getAnalyticsCountriesList: (state, getters, rootState) => JSON.parse(JSON.stringify(rootState.analytics.state.handler.analyticsCountriesList)),
  // Периоды сигналов
  getSignalPeriods: (state, getters, rootState) => JSON.parse(JSON.stringify(rootState.analytics.state.handler.signalPeriods)),
  // Активный период сигналов
  getActiveSignalPeriod: (state, getters, rootState) => JSON.parse(JSON.stringify(rootState.analytics.state.handler.activeSignalPeriod)),
  // Активная вкладка меню сигналов
  getActiveSignalsMenuItem: (state, getters, rootState) => JSON.parse(JSON.stringify(rootState.analytics.state.handler.activeSignalsMenuItem)),
  // Фильтр аналитики
  getAnalyticsDataFilter: (state, getters, rootState) => {
    return {
      ...rootState.analytics.state.handler.analyticsDataFilter,
      countries: rootState.analytics.state.handler.analyticsCountriesList
    }
  },
  // Ключи активных фильтров аналитики
  getAnalyticsDataFilterActiveKeys: (state, getters) => {
    const keys = ['types', 'instruments', 'priority', 'signals', 'countries']
    return keys.reduce((preVal, field) => {
      if (field === 'countries') {
        preVal.countries = getters.getAnalyticsDataFilter.countries.filter(item => item[2]).map(item => item[0].toLowerCase())
      } else {
        preVal[field] = getters.getAnalyticsDataFilter[field].filter(item => item.is_active).map(item => item.flag)
      }
      return preVal
    }, { types: [], instruments: [], priority: [], signals: [], countries: [] })
  },
  // Данные twitter watcher
  getTwitterWatcherData: (state, getters, rootState) => JSON.parse(JSON.stringify(rootState.analytics.state.handler.twitterWatcherData))
}
