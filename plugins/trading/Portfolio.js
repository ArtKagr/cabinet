import {
  CMD_BUY,
  CMD_SELL
} from '@/plugins/trading/Constants'

export default ({ app }, inject) => {
  const data = app.store.getters['trading/getters/trading/getTrading']
  function updateMargin () {
    const bySymbol = {}
    const margin = {}

    const avgRate = {}
    for (const trade of data.account.trades) {
      if (!avgRate[trade.symbol]) {
        avgRate[trade.symbol] = { sum_margin: 0, sum_open: 0, weight: 0 }
      }

      avgRate[trade.symbol].sum_margin += trade.margin_rate * trade.volume
      avgRate[trade.symbol].sum_open += trade.open_price * trade.volume
      avgRate[trade.symbol].weight += trade.volume
    }

    for (const trade of data.account.trades) {
      if (app.store.$trade.isCurrentTrade(trade.cmd)) {
        if (!bySymbol[trade.symbol]) {
          margin[trade.symbol] = 0
          bySymbol[trade.symbol] = {}
          bySymbol[trade.symbol][CMD_BUY] = 0
          bySymbol[trade.symbol][CMD_SELL] = 0
        }

        bySymbol[trade.symbol][trade.cmd] += app.store.$instrument.getMargin(
          data.account.server,
          data.account.group,
          trade.symbol,
          trade.volume * (avgRate[trade.symbol].sum_margin / avgRate[trade.symbol].weight),
          data.account.leverage,
          avgRate[trade.symbol].sum_open / avgRate[trade.symbol].weight
        )
      }
    }

    for (const symbol in bySymbol) {
      const instrument = app.store.$instrument.getInstrument(data.account.server, data.account.group, symbol)
      if (instrument) {
        let marginLocked = 0
        let marginNormal = 0
        if (bySymbol[symbol][CMD_BUY] < bySymbol[symbol][CMD_SELL]) {
          marginNormal = bySymbol[symbol][CMD_SELL] - bySymbol[symbol][CMD_BUY]
          marginLocked = bySymbol[symbol][CMD_BUY]
        } else if (bySymbol[symbol][CMD_SELL] < bySymbol[symbol][CMD_BUY]) {
          marginNormal = bySymbol[symbol][CMD_BUY] - bySymbol[symbol][CMD_SELL]
          marginLocked = bySymbol[symbol][CMD_SELL]
        }

        margin[symbol] += (marginNormal + marginLocked * (instrument.margin_hedged / instrument.contract_size)) * data.account.factor
      }
    }

    return Object.values(margin).reduce((a, b) => a + b, 0)
  }
  inject('portfolio', {
    updateMargin
  })
}
