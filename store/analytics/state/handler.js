export const state = () => ({
  // Активная временная зона пользователя
  activeTimeZone: '0',
  // Активная вкладка меню сигналов
  activeSignalsMenuItem: 'currency',
  // Активный период сигналов
  activeSignalPeriod: 5,
  // Лента аналитики
  analyticsData: [],
  // Страница ленты аналитики
  analyticsDataPage: 1,
  // id открыт новости аналитики
  currentAnalyticsId: null,
  // Сигналы
  analyticsSignals: [],
  // Избранные сигналы
  analyticsFavoriteSignals: [],
  // Календарь
  analyticsCalendar: [],
  // Страница календаря
  analyticsCalendarPage: 1,
  // id открытых событий календаря
  analyticsCalendarIds: [],
  // Активные табы открытых событий календаря
  analyticsCalendarTabs: [],
  // Событие календаря аналитики (открытое в попапе)
  currentCalendarEvent: {},
  // Активный период в календаре
  analyticsActiveCalendarPeriod: 'week',
  // Процентные ставки
  analyticsRates: [],
  // Список стран
  analyticsCountriesList: [],
  // Периоды сигналов
  signalPeriods: [
    { description: 'M1', flag: 5 },
    { description: 'M5', flag: 6 },
    { description: 'M15', flag: 7 },
    { description: 'M30', flag: 1 },
    { description: 'H1', flag: 2 },
    { description: 'H4', flag: 3 },
    { description: 'D1', flag: 4 }
  ],
  // Фильтр ленты аналитики
  analyticsDataFilter: {
    types: [
      { flag: '1', is_active: false },
      { flag: '2', is_active: false }
    ],
    instruments: [
      { flag: 'currency', is_active: false },
      { flag: 'crypto', is_active: false },
      { flag: 'commodities', is_active: false },
      { flag: 'cfd-nyse', is_active: false },
      { flag: 'cfd-nasdaq', is_active: false },
      { flag: 'cfd-epa', is_active: false },
      { flag: 'index', is_active: false }
    ],
    priority: [
      { flag: '1', is_active: false },
      { flag: '2', is_active: false },
      { flag: '3', is_active: false }
    ],
    signals: [
      { flag: 'sell_active', is_active: false },
      { flag: 'sell', is_active: false },
      { flag: 'neutral', is_active: false },
      { flag: 'buy', is_active: false },
      { flag: 'buy_active', is_active: false }
    ]
  },
  twitterWatcherData: {
    status: null,
    signals: [],
    days_left: null
  }
})
