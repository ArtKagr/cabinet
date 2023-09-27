export const mutations = {
  // обновление баланса
  UPDATE_TRADING_BALANCE (state, payload) {
    const data = payload.data
    const account = payload.rootData.account

    switch (data.type) {
      case 'balance':
        if (account.server === data.server && account.login === data.login) {
          payload.rootData.account.balance += data.profit
        } else {
          payload.rootData.investments = payload.rootData.investments.map((investment) => {
            if (investment.server === data.server && investment.login === data.login) {
              investment.balance += data.profit
              investment = this.$trading.updateInvestmentValues(investment)
            }
            return investment
          })
        }
        break
      case 'commission':
        payload.rootData.investments = payload.rootData.investments.map((investment) => {
          if (investment.server === data.server && investment.login === data.login) {
            investment.profit_closed += data.profit
            investment = this.$trading.updateInvestmentValues(investment)
          }
          return investment
        })
        break
    }
  },
  // обновление кредита
  UPDATE_TRADING_CREDIT (state, payload) {
    const data = payload.data
    const account = payload.rootData.account

    if (account.server === data.server && account.login === data.login) {
      payload.rootData.account.credit += data.profit
    } else {
      payload.rootData.investments = payload.rootData.investments.map((investment) => {
        if (investment.server === data.server && investment.login === data.login) {
          investment.credit += data.profit
          investment = this.$trading.updateInvestmentValues(investment)
        }
        return investment
      })
    }
  }
}
