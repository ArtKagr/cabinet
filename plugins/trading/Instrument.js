import {
  PROFIT_CALC_FOREX,
  PROFIT_CALC_FUTURES,
  PROFIT_CALC_CFD,
  MARGIN_CALC_FOREX,
  MARGIN_CALC_FUTURES,
  MARGIN_CALC_CFD,
  MARGIN_CALC_CFD_INDEX,
  MARGIN_CALC_CFD_LEV,
  MARGIN_CALC_FOREX_NO_LEV
} from '@/plugins/trading/Constants'

export default ({ app }, inject) => {
  const account = app.store.getters['trading/getters/trading/getAccount']
  const instruments = app.store.getters['trading/getters/trading/getInstruments']
  const activeInstruments = app.store.getters['trading/getters/trading/getActiveInstruments']
  const symbolsList = app.store.getters['symbols/getters/handler/symbols']
  const routePages = app.store.getters['dictionaries/getters/handler/getRoutePages']

  function convertInstruments (instruments = []) {
    return instruments.reduce((preVal, instrument = []) => {
      // конвертирование инструмента
      preVal[instrument[0]] = instrument.reduce((acc, value, index) => {
        acc[[
          'symbol', // инструмент
          'symbol_original', // оригинальный инструмент
          'category', // категория инструмента
          'trade_mode', // режим торговли
          'point', // минимальное изменение цены
          'digits', // кол-во цифр в цене после запятой
          'multiply', // 1/point
          'currency_base', // базовая валюта
          'currency_profit', // валюты профита
          'currency_margin', // валюты маржи
          'profit_mode', // режим расчета прибыли
          'margin_mode', // режим расчета маржи
          'contract_size', // размер контракта
          'tick_size',
          'tick_value',
          'margin_rate', // множитель в расчете маржи
          'margin_initial', // начальная маржа
          'margin_hedged', // шаг объема
          'session', // торговые сессии
          'lot_min', // мин. объем
          'lot_max', // макс. объем
          'lot_step' // шаг объема
        ][index]] = value
        return acc
      }, {})
      return preVal
    }, {})
  }
  function getSymbols ({ instruments, account }) {
    let symbols = []

    const symbolIcons = Object.entries(symbolsList).reduce((acc, icon) => {
      const field = icon[0].toUpperCase()
      acc[field] = icon[1]
      return acc
    }, {})

    if (account.server && account.group) {
      symbols = Object.keys(instruments[account.server][account.group])
    }
    symbols = symbols.reduce((acc, s) => {
      const symbol = getOriginalSymbol(s)
      let icon

      if (symbol.includes('#')) {
        icon = symbolIcons[symbol.substring(1)]
      } else {
        icon = symbolIcons[symbol]
      }

      if (icon) {
        if (symbol.includes('#')) {
          acc[symbol] = { [symbol.substring(1)]: icon }
        } else {
          acc[symbol] = { [symbol]: icon }
        }
      } else if (!symbol.includes('#')) {
        acc[symbol] = symbol
          .split('')
          .reduce((acc, item, index) => {
            [0, 1, 2].includes(index)
              ? acc[0] = acc[0].concat(item)
              : acc[1] = acc[1].concat(item)
            return acc
          }, ['', ''])
          .reduce((acc, item) => {
            if (symbolIcons[item]) {
              acc[item] = symbolIcons[item]
            }
            return acc
          }, {})
      } else {
        acc[symbol] = { [symbol]: '' }
      }

      return acc
    }, {})
    return symbols
  }
  function getInstrument (server, group, symbol) {
    return instruments[server] && instruments[server][group] && instruments[server][group][symbol] ? instruments[server][group][symbol] : null
  }
  function getOriginalSymbol (symbol) {
    return symbol.replace(/^([#A-Z0-9-]+)(.*)$/g, '$1').toUpperCase()
  }
  function getDigits (server, group, symbol) {
    const instrument = getInstrument(server, group, symbol)
    if (instrument) {
      return instrument.digits
    }

    return 0
  }
  function getMultiply (server, group, symbol) {
    const instrument = getInstrument(server, group, symbol)
    if (instrument) {
      return instrument.multiply
    }
    return 0
  }
  function getOnePointCost (server, instrument, volume, currency) {
    let onePointCost = 0
    if ([PROFIT_CALC_FOREX, PROFIT_CALC_CFD].includes(instrument.profit_mode)) {
      onePointCost = instrument.contract_size * instrument.point * volume * app.store.$quotes.convert(server, instrument.currency_profit, currency)
    } else if (instrument.profit_mode === PROFIT_CALC_FUTURES) {
      if (instrument.tick_size > 0) {
        onePointCost = instrument.point * volume * instrument.tick_value / instrument.tick_size * app.store.$quotes.convert(server, instrument.currency_profit, currency)
      }
    }
    return onePointCost
  }
  function getMarginFactor (server, group, symbol, leverage, price) {
    const instrument = getInstrument(server, group, symbol)
    if (instrument) {
      if (instrument.margin_mode === MARGIN_CALC_FOREX) {
        return instrument.margin_rate * instrument.contract_size / leverage
      } else if (instrument.margin_mode === MARGIN_CALC_FOREX_NO_LEV) {
        return instrument.margin_rate * instrument.contract_size
      } else if (instrument.margin_mode === MARGIN_CALC_FUTURES) {
        return instrument.margin_rate * instrument.margin_initial
      } else if (instrument.margin_mode === MARGIN_CALC_CFD) {
        return instrument.margin_rate * instrument.contract_size * price
      } else if (instrument.margin_mode === MARGIN_CALC_CFD_INDEX) {
        return instrument.margin_rate * instrument.contract_size * price * instrument.tick_value / instrument.tick_size
      } else if (instrument.margin_mode === MARGIN_CALC_CFD_LEV) {
        return instrument.margin_rate * instrument.contract_size * price / leverage
      }
    }
    return 0
  }
  function getMargin (server, group, symbol, volume, leverage, price) {
    return getMarginFactor(server, group, symbol, leverage, price) * volume
  }
  function getPreMargin (server, group, symbol, volume, leverage, price, currency) {
    const instrument = getInstrument(server, group, symbol)
    if (instrument) {
      return app.store.$quotes.convert(server, instrument.currency_margin, currency, getMargin(server, group, symbol, volume, leverage, price))
    }
    return 0
  }
  function getMinPointsForProfitAndMargin (server, group, symbol, leverage, price, profit, accountMargin, currency) {
    const instrument = getInstrument(server, group, symbol)
    if (instrument) {
      const volume = app.store.$quotes.convert(server, currency, instrument.currency_margin, accountMargin) / getMarginFactor(server, group, symbol, leverage, price)

      return Math.ceil(getPointsByProfit(account.server, account.group, symbol, volume, account.currency, profit) * instrument.multiply)
    }

    return 0
  }
  function getProfit (server, group, symbol, volume, currency, priceChange) {
    const instrument = getInstrument(server, group, symbol)

    if (instrument) {
      const onePointCost = getOnePointCost(server, instrument, volume, currency)
      const pointsAmount = Math.round(priceChange / instrument.point)

      return Math.round(pointsAmount * onePointCost * 100) / 100
    }

    return 0
  }
  function getPointsByProfit (server, group, symbol, volume, currency, amount) {
    const instrument = getInstrument(server, group, symbol)
    if (instrument) {
      const onePointCost = getOnePointCost(server, instrument, volume, currency)

      return onePointCost > 0 ? amount / onePointCost * instrument.point : 0
    }

    return 0
  }
  function getActiveInstrumentsOriginalSymbol () {
    return Object.entries(activeInstruments).reduce((acc, item) => {
      const symbol = getOriginalSymbol(item[0])
      acc[symbol] = item[1]
      return acc
    }, {})
  }
  function openInstrumentTrader (item) {
    if (item.user_id) {
      app.options.router.push(`/${routePages.locale}/traders/${item.user_id}`)
    } else {
      const data = item.instrument || item
      const instrument =
        activeInstruments[data.symbol] ||
        activeInstruments[data.symbol_original] ||
        getActiveInstrumentsOriginalSymbol[data.symbol] ||
        getActiveInstrumentsOriginalSymbol[data.symbol_original]
      const category = app.store.$trading.getCategoryName(instrument.category)
      const symbol = data.symbol_original ? data.symbol_original.replace(/#/gi, '') : data.symbol.replace(/#/gi, '')

      app.options.router.push(`/${routePages.locale}/trading/${category}/${symbol.toLowerCase()}`)

      app.store.commit('dictionaries/mutations/handler/SAVE_ACTIVE_MAIN_MENU_BUTTON', {
        rootData: app.store.state.dictionaries.state.handler,
        data: 'trading'
      })
    }
  }

  inject('instrument', {
    convertInstruments,
    getSymbols,
    getInstrument,
    getOriginalSymbol,
    getActiveInstrumentsOriginalSymbol,
    getDigits,
    getMultiply,
    getOnePointCost,
    getMarginFactor,
    getMargin,
    getPreMargin,
    getMinPointsForProfitAndMargin,
    getProfit,
    getPointsByProfit,
    openInstrumentTrader
  })
}
