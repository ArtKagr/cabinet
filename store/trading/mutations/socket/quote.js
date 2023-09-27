export const mutations = {
  // добавление / обновление котировок
  UPDATE_QUOTES (state, payload) {
    const account = payload.rootData.account
    const server = payload.data[0]
    const quotes = payload.data[1]

    // const isExistServer = Object.keys(payload.rootData.quotes).includes(server) || payload.rootData.investments.some(investment => investment.server === server)

    quotes.forEach((quote) => {
      if (account.server === server) {
        const instrument = payload.rootData.instruments[account.server][account.group][quote[0]]

        let isFavorite = false

        if (instrument && instrument.symbol_original) {
          isFavorite = payload.rootData.favorite.includes(instrument.symbol_original)
        }
        // обновление котировок в сделках основного аккаунта, обновление итоговых значений сделки
        payload.rootData.account.trades = payload.rootData.account.trades.map((trade) => {
          return quote[0] === trade.symbol ? this.$trading.updateTradeValues(trade, { bid: quote[1], ask: quote[2] }, payload.rootData.account) : trade
        })
        // обновление котировок в торговых карточках по категориям
        if (instrument) {
          payload.rootData.tradingCards[instrument.category] = payload.rootData.tradingCards[instrument.category].map((tradingCard) => {
            if (tradingCard.symbol === quote[0]) {
              return this.$trading.updateTradingCardValues(tradingCard, quote)
            } else {
              return tradingCard
            }
          })
        }
        // обновление котировок в избранных торговых карточках
        if (isFavorite) {
          payload.rootData.tradingCards[0] = payload.rootData.tradingCards[0].map((tradingCard) => {
            if (tradingCard.symbol === quote[0]) {
              return this.$trading.updateTradingCardValues(tradingCard, quote)
            } else {
              return tradingCard
            }
          })
        }
      } else {
        // обновление котировок в сделках инвестиций, обновление итогового значения инвестиций
        payload.rootData.investments = payload.rootData.investments.map((investment) => {
          if (investment.server === server) {
            investment.trades = investment.trades.map((trade) => {
              return quote[0] === trade.symbol ? this.$trading.updateTradeValues(trade, { bid: quote[1], ask: quote[2] }, investment) : trade
            })
            investment = this.$trading.updateInvestmentValues(investment)
          }
          return investment
        })
      }
    })
    // if (isExistServer) {
    //   //
    // } else {
    //   // добавление новых котировок
    //   payload.rootData.quotes = {
    //     ...payload.rootData.quotes,
    //     [server]: quotes.reduce((acc, quote) => {
    //       acc[quote[0]] = { bid: quote[1], ask: quote[2] }
    //       return acc
    //     }, {})
    //   }
    //   payload.rootData.convertQuotes = {
    //     ...payload.rootData.convertQuotes,
    //     [server]: quotes.reduce((acc, quote) => {
    //       acc[this.$instrument.getOriginalSymbol(quote[0])] = { bid: quote[1], ask: quote[2] }
    //       return acc
    //     }, {})
    //   }
    // }
  }
}
