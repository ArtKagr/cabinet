export const state = () => ({
  traders: {
    data: [],
    has_favorite: false,
    page: 1,
    page_total: 1,
    pagination: {
      page: 1,
      page_count: 1,
      page_size: 1,
      total_count: 1
    }
  },
  activeSorting: 'total_equity',
  activePeriod: 'all',
  viewMode: 'cards',
  traderMenuItem: 'total-equity',
  traderHistory: {
    history: [],
    page: 1,
    pagination: {}
  },
  tradersCount: {
    count: 0,
    filters: [],
    status: null
  },
  tradersFilter: {
    page: 1,
    period: null,
    sort: null,
    'filter[favorite]': null,
    'filter[language]': null,
    'filter[profit][to]': null,
    'filter[profit][from]': null,
    'filter[days][from]': null,
    'filter[investors_count][from]': null,
    'filter[risk][to]': null,
    'filter[profit_sharing][to]': null,
    'filter[trader_equity][from]': null,
    'filter[investors_equity][from]': null,
    'filter[country]': null
  },
  traderCardSettings: {
    chart: true,
    info: false,
    buttons: false
  },
  traderCardSettingsCopy: {
    chart: true,
    info: false,
    buttons: false,
    mode: 'assign'
  },
  currentTrader: {
    bars: [],
    data: {
      username: null,
      user_id: null,
      is_copying: false
    },
    trades: {}
  },
  traderInfo: {
    accounts: {},
    currency: null,
    list: [],
    listSub: [],
    servers: [],
    status: null,

    total: {},
    trades: {}
  }
})
