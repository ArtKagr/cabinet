export const mutations = {
  // инициализация торговли
  TRADING_INIT (state, payload) {
    // присваиваем аккаунт
    payload.rootData.account = JSON.parse(JSON.stringify(payload.data.account))
    // присваиваем избранные инструменты
    payload.rootData.favorite = JSON.parse(JSON.stringify(payload.data.favorite))
    // присваиваем конвертированные котировки
    Object.entries(payload.data.quotes).forEach(([server = null, quotes]) => {
      Object.defineProperty(payload.rootData.quotes, server, {
        value: quotes.reduce((acc, quote) => {
          acc[quote[0]] = { bid: quote[1], ask: quote[2] }
          return acc
        }, {}),
        writable: true,
        enumerable: true,
        configurable: true
      })
      Object.defineProperty(payload.rootData.convertQuotes, server, {
        value: quotes.reduce((acc, quote) => {
          acc[this.$instrument.getOriginalSymbol(quote[0])] = { bid: quote[1], ask: quote[2] }
          return acc
        }, {}),
        writable: true,
        enumerable: true,
        configurable: true
      })
    })
    // присваиваем и конвертируем инструменты
    Object.entries(payload.data.instruments).forEach(([server = null, obj = { '': [] }]) => {
      Object.defineProperty(payload.rootData.instruments, server, { value: {}, writable: true, enumerable: true, configurable: true })

      Object.entries(obj).forEach(([group, instruments]) => {
        Object.defineProperty(
          payload.rootData.instruments[server],
          group,
          {
            value: this.$instrument.convertInstruments(instruments),
            writable: true,
            enumerable: true,
            configurable: true
          }
        )
      })
    })
    // обновляем сделки в основном аккаунте
    payload.rootData.account.trades = payload.rootData.account.trades.map((trade) => {
      const quote = payload.rootData.quotes[payload.data.account.server][trade.symbol]
      trade = this.$trading.updateTrade(trade, quote, payload.rootData.account)
      return trade
    })
    // обновляем сделки в инвестициях
    payload.rootData.investments = payload.data.investments.map((investment) => {
      investment.trades = investment.trades.map((trade) => {
        const quote = payload.rootData.quotes[investment.server][trade.symbol]
        trade = this.$trading.updateTrade(trade, quote, investment)
        return trade
      })
      investment = this.$trading.setInvestmentValues(investment)
      return investment
    })
    //
    payload.rootData.account.margin = this.$portfolio.updateMargin()
    payload.rootData.tradingCards = this.$trading.setTradingCards(payload.data.account.server, payload.data.account.group, payload.data.favorite)
    if (Object.keys(payload.rootData.statistics).length) {
      payload.rootData.tradingCards = this.$trading.setTradingCardsStat(payload.rootData)
    }
    payload.rootData.symbols = this.$instrument.getSymbols(payload.rootData)
    console.warn('trading data', payload.rootData)
  },
  // присвоение статистики и периода статистики
  SAVE_TRADING_STATISTICS (state, payload) {
    payload.rootData.period = payload.data.period
    payload.rootData.statistics = payload.data.statistics.reduce((acc, stat) => {
      acc[stat[0]] = [stat[0], stat[1] || 0, stat[2] || 0, stat[3] || 0, stat[4] || 0, stat[5] || []]
      return acc
    }, {})
    if (Object.keys(payload.rootData.instruments).length) {
      payload.rootData.tradingCards = this.$trading.setTradingCardsStat(payload.rootData)
    }
  },
  // удалить информацию о валюте
  DELETE_ACCOUNT_CURRENCY (state, payload) {
    payload.rootData.account = { ...payload.rootData.account, currency: null }
  }
}
