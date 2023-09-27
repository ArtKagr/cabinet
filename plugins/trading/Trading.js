import moment from 'moment/moment'
import { CMD_BUY, CMD_BUY_LIMIT, CMD_BUY_STOP, CMD_BUY_STOP_LIMIT, CMD_SELL } from '@/plugins/trading/Constants'

// const routes = { 1: 'currency', 2: 'crypto', 3: 'commodities', 5: 'nyse', 6: 'nasdaq', 7: 'stock', 8: 'epa' }
const pages = { 0: 'favorite', 1: 'currency', 2: 'crypto', 3: 'commodities', 5: 'cfd-nyse', 6: 'cfd-nasdaq', 7: 'stock-index', 8: 'cfd-epa' }
const pagesName = { favorite: 0, currency: 1, crypto: 2, commodities: 3, 'cfd-nyse': 5, 'cfd-nasdaq': 6, 'stock-index': 7, 'cfd-epa': 8 }

export default ({ app }, inject) => {
  const instruments = app.store.getters['trading/getters/trading/getInstruments']
  const cQuotes = app.store.getters['trading/getters/trading/getConvertQuotes']
  // обновление сделки в основном аккаунте / инвестиции
  function updateTrade (trade, quote = { bid: 0, ask: 0 }, { server, group, currency, factor, balance, credit }) {
    const instrument = app.store.$instrument.getInstrument(server, group, trade.symbol)
    if (instrument) {
      trade.instrument = instrument
      trade.pointCost = app.store.$instrument.getOnePointCost(server, instrument, trade.volume, currency)
      trade.currentMargin = 0
      trade.statusClass = app.store.$trade.getCmdStatus(trade.cmd)
      trade.statusLabel = app.store.$trade.getCmdLabel(trade.cmd)
      trade.page = pages[instrument.category]
    }
    trade = updateTradeValues(trade, quote, { server, group, factor, balance, credit, currency })
    return trade
  }
  // обновление значений в сделках основного аккаунта / инвестициях
  function updateTradeValues (trade, quote = { bid: 0, ask: 0 }, { server, group, factor, balance, credit, currency }) {
    const priceChange = app.store.$trade.isBuy(trade.cmd) ? quote.bid - trade.open_price : trade.open_price - quote.ask
    //
    if (trade.instrument && [CMD_BUY, CMD_SELL].includes(trade.cmd)) {
      trade.changedProfit = app.store.$instrument.getProfit(server, group, trade.symbol, trade.volume, currency, priceChange) + trade.swaps + trade.commission
    } else {
      trade.changedProfit = trade.swaps + trade.commission
    }
    trade.current_price = [CMD_BUY, CMD_BUY_LIMIT, CMD_BUY_STOP, CMD_BUY_STOP_LIMIT].includes(trade.cmd) ? quote.bid : quote.ask
    trade.bid = quote.bid
    trade.ask = quote.ask
    trade.profitability = (trade.changedProfit + trade.swaps + trade.commission) / (balance + credit) * 100
    trade.profitClass = trade.changedProfit > 0 ? '-profit' : trade.changedProfit === 0 ? '' : '-loss'
    return trade
  }
  // присвоение торговых карточек
  function setTradingCards (server, group, favorites) {
    const accountInstruments = Object.values(instruments[server][group]) || []
    return accountInstruments.reduce((acc, instrument) => {
      const isFavorite = favorites.includes(instrument.symbol_original)
      const card = setTradingCard(server, group, instrument.symbol, isFavorite)
      if (isFavorite) {
        acc[0].push(card)
      }
      acc[instrument.category].push(card)
      return acc
    }, { 0: [], 1: [], 2: [], 3: [], 5: [], 6: [], 7: [], 8: [] })
  }
  // присвоение торговой карточки
  function setTradingCard (server, group, symbol, isFavorite) {
    const instrument = Object.values(instruments[server][group]).find(instrument => instrument.symbol === symbol) || []
    const quote = cQuotes[server][instrument.symbol_original] || { bid: 0, ask: 0 }
    return {
      ...instrument,
      bid: quote.bid,
      ask: quote.ask,
      mood: 0,
      spread: 0,
      volatility: 0,
      priceChange: 0,
      popularity: 0,
      chart: [],
      stat: [instrument.symbol_original, 0, 0, 0, 0, []],
      isMoodUp: false,
      page: pages[instrument.category],
      activeSession: setActiveSession(instrument.session),
      sessionSchedule: setSessionSchedule(instrument.session),
      isFavorite
    }
  }
  // обновление статистики в торговых картах
  function setTradingCardsStat ({ tradingCards, statistics, instruments, favorite, account }) {
    const instr = Object.values(instruments[account.server][account.group])
    instr.forEach((instrument) => {
      const stat = statistics[instrument.symbol_original]
      const isFavorite = favorite.includes(instrument.symbol_original)
      if (stat) {
        if (isFavorite) {
          tradingCards[0] = tradingCards[0].map((tradingCard) => {
            if (stat[0] === tradingCard.symbol_original) {
              return setTradingCardStat(tradingCard, stat)
            } else {
              return tradingCard
            }
          })
        }
        tradingCards[instrument.category] = tradingCards[instrument.category].map((tradingCard) => {
          if (stat[0] === tradingCard.symbol_original) {
            return setTradingCardStat(tradingCard, stat)
          } else {
            return tradingCard
          }
        })
      }
    })
    return tradingCards
  }
  // присвоение статистики торговой карточке
  function setTradingCardStat (tradingCard, stat) {
    return {
      ...tradingCard,
      mood: (stat[3] > 50 ? stat[3] : 100 - stat[3]).toFixed(1),
      isMoodUp: stat[3] < 50,
      spread: ((tradingCard.ask - tradingCard.bid) * tradingCard.multiply).toFixed(0),
      volatility: stat[2],
      priceChange: ((tradingCard.bid - stat[1]) / stat[1] * 100).toFixed(2),
      popularity: stat[4],
      chart: stat[5],
      stat
    }
  }
  // обновление значений торговой карточки
  function updateTradingCardValues (tradingCard, quote) {
    return {
      ...tradingCard,
      bid: quote[1].toFixed(tradingCard.digits),
      ask: quote[2].toFixed(tradingCard.digits),
      spread: ((quote[2] - quote[1]) * tradingCard.multiply).toFixed(0),
      priceChange: ((tradingCard.bid - tradingCard.stat[1]) / tradingCard.stat[1] * 100).toFixed(2)
    }
  }
  // присвоение расчетов инвестиции
  function setInvestmentValues (investment) {
    const profit = investment.trades.reduce((acc, trade) => {
      acc += trade.changedProfit
      return acc
    }, 0)
    return {
      ...investment,
      isInvestment: true,
      statusClass: app.store.$copyTrading.getStatusClass(investment.status),
      statusLabel: app.store.$copyTrading.getStatusLabel(investment.status),
      symbol: `@${investment.name}`,
      symbol_original: `@${investment.name}`,
      image: investment.trader || investment.avatar_url,
      name: investment.avatar_name,
      open_time: investment.date,
      open_price: `${investment.profit_open}%`,
      current_price: `${investment.profit_current}%`,
      //
      volume: `${(investment.balance + profit).toFixed(2)} ${investment.currency}`,
      floating: investment.balance + profit,
      changedProfit: profit + investment.profit_closed,
      profitClass: profit + investment.profit_closed > 0 ? '-profit' : profit + investment.profit_closed === 0 ? '' : '-loss'
    }
  }
  // обновление расчетов в инвестиции
  function updateInvestmentValues (investment) {
    const profit = investment.trades.reduce((acc, trade) => {
      acc += trade.changedProfit
      return acc
    }, 0)
    investment.volume = `${(investment.balance + investment.status === 0 ? profit : investment.profit_closed).toFixed(2)} ${investment.currency}`
    investment.floating = investment.balance + profit
    investment.profit = profit
    investment.changedProfit = profit + investment.profit_closed
    investment.profitClass = profit + investment.profit_closed > 0 ? '-profit' : profit + investment.profit_closed === 0 ? '' : '-loss'
    return investment
  }
  function setSessionSchedule (session = {}) {
    let result
    const todayDayNumber = moment().day()
    const todaySchedule = Object.entries(session).find(day => Number(day[0]) === todayDayNumber)
    if (todaySchedule && todaySchedule.length && todaySchedule[1].length) {
      const from = todaySchedule[1][0][0]
      const to = todaySchedule[1][0][1]
      const now = (Number(moment().format('HH')) * 60) + Number(moment().format('mm'))

      if ((now >= from) && (now <= to)) {
        result = []
      } else if (now < from) {
        const hours = Math.floor((from - now) / 60)
        const minutes = (from - now) % 60
        result = [hours, minutes]
      } else if (now > to) {
        result = setOpenTimeInNextWorkDay(session, todayDayNumber, 1440 - now)
      }
    } else {
      result = []
    }
    return result
  }
  // TODO
  function setOpenTimeInNextWorkDay (session = {}, todayDayNumber = 1, now = 0) {
    return []
  }
  // присвоение активной сессии инструменту
  function setActiveSession (session = {}) {
    let result
    const todayDayNumber = moment().day()
    const todaySchedule = Object.entries(session).find(day => Number(day[0]) === todayDayNumber)
    if (todaySchedule && todaySchedule.length && todaySchedule[1].length) {
      const from = todaySchedule[1][0][0]
      const to = todaySchedule[1][0][1]
      const now = (Number(moment().format('HH')) * 60) + Number(moment().format('mm'))
      result = (now >= from) && (now <= to)
    } else {
      result = false
    }
    return result
  }
  function getCategoryName (category) {
    return pages[category]
  }

  function getCategoryNumber (categoryName) {
    return pagesName[categoryName]
  }

  function updateTradersList (traders) {
    return traders.map((trader) => {
      trader.graph = trader.graph.split(',').map(item => Number(item.replace(/[^-.\d]/g, '')))
      return trader
    })
  }
  //
  inject('trading', {
    updateTrade,
    updateTradeValues,
    setTradingCards,
    setTradingCard,
    setTradingCardsStat,
    setTradingCardStat,
    updateTradingCardValues,
    setInvestmentValues,
    updateInvestmentValues,
    setActiveSession,
    setSessionSchedule,
    getCategoryName,
    getCategoryNumber,
    updateTradersList
  })
}
