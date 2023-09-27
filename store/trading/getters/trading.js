export const getters = {
  // Вся торговая информация
  getTrading: (state, getters, rootState) => rootState.trading.state.handler,
  // Аккаунт
  getAccount: (state, getters, rootState) => rootState.trading.state.handler.account,
  // Инструменты
  getInstruments: (state, getters, rootState) => rootState.trading.state.handler.instruments,
  // Инструменты основного аккаунта
  getActiveInstruments: (state, getters) => {
    if (Object.keys(getters.getInstruments) && getters.getAccount.server && getters.getAccount.group) {
      return getters.getInstruments[getters.getAccount.server][getters.getAccount.group]
    } else {
      return {}
    }
  },
  // Сделки основного аккаунта
  getAccountTrades: (state, getters, rootState) => rootState.trading.state.handler.account.trades.filter(trade => trade.current_price),
  // Котировки { bid: number, ask: number }
  getQuotes: (state, getters, rootState) => rootState.trading.state.handler.quotes,
  // Котировка по символу
  getCurrentQuote: (state, getters) => ({ server, symbol }) => {
    const quote = getters.getQuotes && getters.getQuotes[server] ? getters.getQuotes[server][symbol] : { bid: 0, ask: 0 }
    return [symbol, quote.bid, quote.ask]
  },
  // Котировки, приведенные к оригинальному символу { bid: number, ask: number }
  getConvertQuotes: (state, getters, rootState) => rootState.trading.state.handler.convertQuotes,
  // Торговые карточки
  getTradingCards: (state, getters, rootState) => rootState.trading.state.handler.tradingCards,
  // Торговая карточка по категории и символу
  getTradingCard: (state, getters) => (category, symbol) => {
    return getters.getTradingCards[category].find(card => card.symbol_original === symbol)
  },
  // Инвестиции основного аккаунта
  getInvestments: (state, getters, rootState) => rootState.trading.state.handler.investments,
  // Получение конкретной сделки с расчетами
  getCurrentInvestment: (state, getters) => (userId) => {
    return getters.getInvestments.find(investment => investment.user_id === userId)
  },
  // Инструмент с полной информацией
  getInstrumentFull: (state, getters, rootState) => JSON.parse(JSON.stringify(rootState.trading.state.handler.instrumentFull)),
  // Портфель
  getAccountPortfolio: (state, getters) => [...getters.getAccountTrades, ...getters.getInvestments].sort((a, b) => a.open_time < b.open_time ? 1 : -1) || [],
  // Сумма прибылей всех сделок в основном аккаунте
  getTradesProfit: (state, getters, rootState) => rootState.trading.state.handler.account.trades.reduce((acc, trade) => {
    acc += trade.changedProfit
    return acc
  }, 0),
  //
  getTradingSignalsSymbol: (state, getters, rootState) => rootState.trading.state.handler.tradingSignalsSymbol,
  // Расчеты показателей в инвестициях
  getInvestmentsValues: (state, getters) => getters.getInvestments.reduce((acc, investment) => {
    // Сумма прибылей всех инвестиций в основном аккаунте
    acc.profit += investment.changedProfit
    acc.profitClosed += investment.profit_closed
    acc.credit += investment.credit
    // Сумма балансов и прибылей всех инвестиций в основном аккаунте
    acc.floating += investment.floating
    return acc
  }, { profit: 0, profitClosed: 0, credit: 0, floating: 0 }),
  // Всего капитал
  getAccountBalance: (state, getters) => {
    return (
      getters.getAccount.balance +
      getters.getAccount.credit +
      getters.getTradesProfit +
      getters.getInvestmentsValues.credit +
      getters.getInvestmentsValues.floating
    )
  },
  // Задействовано средств
  getAccountInvolvedFunds: (state, getters, rootState) => {
    return (
      rootState.trading.state.handler.account.margin +
      getters.getInvestmentsValues.credit +
      getters.getInvestmentsValues.floating
    )
  },
  // Доступно для операций
  getAccountAvailableFunds: (state, getters) => {
    return (
      getters.getAccount.balance +
      getters.getAccount.credit +
      getters.getTradesProfit -
      getters.getAccount.margin
    )
  },
  // Текущее изменение
  getAccountProfit: (state, getters) => {
    return (
      getters.getTradesProfit +
      getters.getInvestmentsValues.profit
    )
  }
}
