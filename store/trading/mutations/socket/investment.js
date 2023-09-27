export const mutations = {
  // обновление или добавление инвестиции
  INVESTMENT_UPDATE (state, payload) {
    const server = payload.data.server
    const login = payload.data.login
    let updatingInvestment = payload.data.investment

    updatingInvestment.trades = updatingInvestment.trades.map((trade) => {
      const quote = payload.rootData.quotes[updatingInvestment.server][trade.symbol]
      trade = this.$trading.updateTrade(trade, quote, updatingInvestment)
      return trade
    })
    updatingInvestment = this.$trading.setInvestmentValues(updatingInvestment)

    const isExistInvestment = payload.rootData.investments.some(investment => investment.server === server && investment.login === login)

    if (isExistInvestment) {
      payload.rootData.investments = payload.rootData.investments.map((investment) => {
        if (investment.server === server && investment.login === login) {
          investment = updatingInvestment
        }
        return investment
      })
    } else {
      payload.rootData.investments.push(updatingInvestment)
    }
  },
  // удаление инвестиции
  INVESTMENT_DELETE (state, payload) {
    payload.rootData.investments = payload.rootData.investments.filter((investment) => {
      return !(investment.server === payload.data.server && investment.login === payload.data.login)
    })
  },
  // обновление статуса инвестиции
  INVESTMENT_STATUS_UPDATE (state, payload) {
    payload.rootData.investments = payload.rootData.investments.map((investment) => {
      if (investment.server === payload.data.server && investment.login === payload.data.login) {
        investment.status = payload.data.status
        investment.statusClass = this.$copyTrading.getStatusClass(investment.status)
        investment.statusLabel = this.$copyTrading.getStatusLabel(investment.status)
      }
      return investment
    })
  }
}
