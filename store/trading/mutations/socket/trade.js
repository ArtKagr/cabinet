export const mutations = {
  // обновление или добавление сделки в основной аккаунт или инвестицию
  UPDATE_TRADE (state, payload) {
    const account = payload.rootData.account
    const updatingTrade = payload.data
    const quote = payload.rootData.quotes[updatingTrade.server][updatingTrade.symbol]

    if (account.server === updatingTrade.server && account.login === updatingTrade.login) {
      const isExistTrade = payload.rootData.account.trades.some(trade => trade.order === updatingTrade.order)

      if (isExistTrade) {
        payload.rootData.account.trades = payload.rootData.account.trades.map((trade) => {
          if (trade.order === updatingTrade.order) {
            trade = this.$trading.updateTrade(updatingTrade, quote, account)
          }
          return trade
        })
      } else {
        const trade = this.$trading.updateTrade(updatingTrade, quote, account)
        payload.rootData.account.trades.push(trade)
      }
      payload.rootData.account.margin = this.$portfolio.updateMargin()
    } else {
      payload.rootData.investments = payload.rootData.investments.map((investment) => {
        if (investment.server === updatingTrade.server && investment.login === updatingTrade.login) {
          const isExistTrade = investment.trades.some(trade => trade.order === updatingTrade.order)

          if (isExistTrade) {
            investment.trades = investment.trades.map((trade) => {
              if (trade.order === updatingTrade.order) {
                trade = this.$trading.updateTrade(updatingTrade, quote, investment)
              }
              return trade
            })
          } else {
            const trade = this.$trading.updateTrade(updatingTrade, quote, investment)
            investment.trades.push(trade)
          }
        }
        return investment
      })
    }
  },
  // удаление сделки из основного аккаунта или инвестиции
  DELETE_TRADE (state, payload) {
    const account = payload.rootData.account
    const deletingTrade = payload.data

    if (account.server === deletingTrade.server && account.login === deletingTrade.login) {
      payload.rootData.account.trades = payload.rootData.account.trades.filter(trade => trade.order !== deletingTrade.order)
      payload.rootData.account.balance += deletingTrade.profit + deletingTrade.swaps + deletingTrade.commission
      payload.rootData.account.margin = this.$portfolio.updateMargin()
    } else {
      payload.rootData.investments = payload.rootData.investments.map((investment) => {
        if (investment.server === deletingTrade.server && investment.login === deletingTrade.login) {
          investment.trades = investment.trades.filter(trade => trade.order !== deletingTrade.order)
          investment.profit_closed += deletingTrade.profit + deletingTrade.swaps + deletingTrade.commission
        }
        return investment
      })
    }
  },
  //
  UPDATE_POSITION (state, payload) {
    if (payload.data.trade && payload.data.trade.status === 'confirmed') {
      payload.rootData.closedCurrentTrade = payload.data.trade
    }
  },
  //
  TRADING_SIGNALS_SYMBOL (state, payload) {
    console.warn('TRADING_SIGNALS_SYMBOL', payload.data)
    payload.rootData.tradingSignalsSymbol = payload.data
  }
}
