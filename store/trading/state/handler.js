export const state = () => ({
  // primary account
  account: {
    balance: 0,
    credit: 0,
    currency: null,
    factor: 1,
    floating: 0,
    group: null,
    isBet: false,
    leverage: 0,
    login: null,
    margin: 0,
    server: null,
    trades: []
  },
  favorite: [],
  instruments: {},
  investments: [],
  quotes: {},
  convertQuotes: {},
  tradingCards: {
    0: [],
    1: [],
    2: [],
    3: [],
    5: [],
    6: [],
    7: [],
    8: []
  },
  activeSorting: 'popularity',
  // stat
  period: '1m',
  statistics: {},
  // trading filter
  activeCategory: 1,
  symbols: [],
  instrumentCategories: [0, 1, 2, 3, 5, 6, 7, 8],
  instrumentFull: {
    symbol_original: null
  },
  // Открытая сделка
  openedTrade: {
    symbol: null,
    order: null,
    open_time: null,
    volume: null,
    cmd: null,
    open_price: null,
    current_price: null,
    sl: null,
    tp: null,
    changedProfit: null,
    profit: null,
    profitability: null,
    instrument: {}
  },
  // Информация о закрытой сделке
  closedCurrentTrade: {
    cmd: null,
    login: null,
    order: null,
    price: null,
    server: null,
    sl: null,
    status: null,
    symbol: null,
    tp: null,
    volume: null
  },
  // Объем сделки при открытии позиции в режиме быстрой торговли
  activeVolumeInput: null,
  //
  instrumentAnalytics: {
    analytics: [],
    marketSentiment: {
      sale: 0,
      purchase: 0
    },
    signals: []
  },
  //
  viewMode: 'cards',
  //
  tradingCardSettings: {
    chart: true,
    info: false,
    buttons: false
  },
  //
  tradingCardSettingsCopy: {
    chart: true,
    info: false,
    buttons: false,
    mode: 'assign'
  },
  //
  tradingSignalsSymbol: {
    symbol: null,
    period: null,
    signals: null
  }
})
