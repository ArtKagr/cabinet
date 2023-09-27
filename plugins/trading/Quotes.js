export default ({ app }, inject) => {
  const quotes = app.store.getters['trading/getters/trading/getConvertQuotes']

  function convert (server, from, to, amount) {
    const quote = quotes[server]
    amount = typeof amount !== 'undefined' ? amount : 1

    if (from === to || amount === 0) {
      return amount
    }
    if (quote[`${from}${to}`]) {
      return amount * quote[`${from}${to}`].bid
    } else if (quote[`${to}${from}`]) {
      return amount * (1 / quote[`${to}${from}`].ask)
    } else if (
      (quote[`${from}USD`] && quote[`USD${to}`]) ||
      (quote[`USD${from}`] && quote[`USD${to}`]) ||
      (quote[`USD${from}`] && quote[`${to}USD`]) ||
      (quote[`${from}USD`] && quote[`${to}USD`])
    ) {
      return amount * convert(server, from, 'USD', 1) * convert(server, 'USD', to, 1)
    }
  }
  inject('quotes', {
    convert
  })
}
