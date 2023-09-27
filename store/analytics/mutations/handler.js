export const mutations = {
  // Показать/закрыть описание новости в ленте аналитики
  TOGGLE_CURRENT_NEWS_DESCRIPTION (state, payload) {
    if (payload.rootData.currentAnalyticsId === payload.data) {
      payload.rootData.currentAnalyticsId = null
    } else {
      payload.rootData.currentAnalyticsId = payload.data
    }
  },
  // Показать/закрыть событие календаря
  TOGGLE_CALENDAR_EVENT (state, payload) {
    if (payload.rootData.analyticsCalendarIds.includes(payload.data)) {
      payload.rootData.analyticsCalendarIds = payload.rootData.analyticsCalendarIds.filter(id => id !== payload.data)
      payload.rootData.analyticsCalendarTabs = payload.rootData.analyticsCalendarTabs.filter(item => item.id !== payload.data)
    } else {
      payload.rootData.analyticsCalendarIds.push(payload.data)
    }
  },
  // Переключение табов открытых событий календаря
  TOGGLE_CALENDAR_EVENT_ACTIVE_TAB (state, payload) {
    if (payload.rootData.analyticsCalendarTabs.some(item => item.id === payload.data.id)) {
      payload.rootData.analyticsCalendarTabs = payload.rootData.analyticsCalendarTabs.map((item) => {
        if (item.id === payload.data.id) {
          item = payload.data
        }
        return item
      })
    } else {
      payload.rootData.analyticsCalendarTabs.push(payload.data)
    }
  },
  // Показать/закрыть процентные ставки
  TOGGLE_INTEREST_RATES (state, payload) {
    payload.rootData.analyticsRates = payload.rootData.analyticsRates.map((rates) => {
      if (rates.id === payload.data) {
        rates.is_shown = !rates.is_shown
      }
      return rates
    })
  },
  // Сохранение данных события календаря аналитики
  SAVE_CURRENT_EVENT_ANALYTICS_CALENDAR (state, payload) {
    payload.rootData.currentCalendarEvent = payload.data
  },
  // Сохранение ленты аналитики
  SAVE_ANALYTICS_DATA (state, payload) {
    payload.rootData.analyticsDataPage = payload.data.page
    payload.rootData.analyticsData = this.$analytics.saveAnalyticsFeed({ analytics: payload.rootData.analyticsData, ...payload.data })
  },
  // Сохранение сигналов
  SAVE_ANALYTICS_SIGNALS (state, payload) {
    payload.rootData.analyticsSignals = payload.data
  },
  // Сохранение избранных сигналов
  SAVE_ANALYTICS_FAVORITE_SIGNALS (state, payload) {
    payload.rootData.analyticsFavoriteSignals = payload.data
  },
  // Сохранение календаря
  SAVE_ANALYTICS_CALENDAR (state, payload) {
    payload.rootData.analyticsCalendarPage = payload.data.page
    payload.rootData.analyticsCalendar = this.$analytics.saveAnalyticsCalendar({ events: payload.rootData.analyticsCalendar, ...payload.data })
  },
  // Сохранение активного периода календаря
  SAVE_ACTIVE_CALENDAR_PERIOD (state, payload) {
    payload.rootData.analyticsActiveCalendarPeriod = payload.data
  },
  // Сохранение процентных ставок
  SAVE_ANALYTICS_INTEREST_RATES (state, payload) {
    if (payload.data && payload.data.length) {
      payload.rootData.analyticsRates = payload.data.map((rate, index) => {
        return {
          id: index,
          country: rate.country_code,
          name: rate.bank,
          rates: rate.history,
          is_shown: false
        }
      })
    }
  },
  // Сохранение списков для календаря
  SAVE_ANALYTICS_CALENDAR_FILTER (state, payload) {
    payload.rootData.analyticsCountriesList = payload.data.countryList.map((country) => {
      country.push(false)
      return country
    })
  },
  // Изменить временную зону
  CHANGE_ANALYTICS_TIMEZONE (state, payload) {
    payload.rootData.activeTimeZone = payload.data
  },
  // Обновить активную вкладку меню сигналов
  UPDATE_ACTIVE_SIGNALS_MENU_ITEM (state, payload) {
    payload.rootData.activeSignalsMenuItem = payload.data
  },
  // Обновить активный период сигналов
  UPDATE_ACTIVE_SIGNAL_PERIOD (state, payload) {
    payload.rootData.activeSignalPeriod = payload.data
  },
  // Обновление фильтра аналитики
  UPDATE_ANALYTICS_FILTER (state, payload) {
    if (payload.data.field === 'countries') {
      payload.rootData.analyticsCountriesList = payload.rootData.analyticsCountriesList.map((item) => {
        if (item[0] === payload.data.flag) {
          item[2] = !item[2]
        }
        return item
      })
    } else {
      payload.rootData.analyticsDataFilter[payload.data.field] = payload.rootData.analyticsDataFilter[payload.data.field].map((item) => {
        if (item.flag === payload.data.flag) {
          item.is_active = !item.is_active
        }
        return item
      })
    }
  },
  // Сбросить настройки фильтра аналитики
  CLEAR_ANALYTICS_FILTER (state, payload) {
    if (payload.data.fields) {
      payload.data.fields.forEach((field) => {
        if (field === 'countries') {
          payload.rootData.analyticsCountriesList = payload.rootData.analyticsCountriesList.map((item) => {
            item[2] = false
            return item
          })
        } else {
          payload.rootData.analyticsDataFilter[field] = payload.rootData.analyticsDataFilter[field].map((item) => {
            item.is_active = false
            return item
          })
        }
      })
    } else {
      payload.rootData.analyticsDataFilter[payload.data.field] = payload.rootData.analyticsDataFilter[payload.data.field].map((item) => {
        item.is_active = false
        return item
      })
    }
  },
  // Сохранение данных twitter watcher
  SAVE_ANALYTICS_TWITTER_WATCHER (state, payload) {
    payload.rootData.twitterWatcherData = payload.data
  }
}
