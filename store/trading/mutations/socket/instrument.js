export const mutations = {
  // сохранение полной информации об инструменте
  SAVE_INSTRUMENT_FULL (state, payload) {
    payload.rootData.instrumentFull = payload.data
  },
  TOGGLE_FAVORITE_INSTRUMENT (state, payload) {
    if (payload.data.isFavorite) {
      const stat = payload.rootData.statistics[payload.data.symbol]
      let tradingCard = this.$trading.setTradingCard(payload.rootData.account.server, payload.rootData.account.group, payload.data.symbol, true)
      tradingCard = this.$trading.setTradingCardStat(tradingCard, stat)
      //
      payload.rootData.favorite.push(payload.data.symbol)
      payload.rootData.tradingCards[0].push(tradingCard)
    } else {
      payload.rootData.favorite = payload.rootData.favorite.filter(symbol => symbol !== payload.data.symbol)
      payload.rootData.tradingCards[0] = payload.rootData.tradingCards[0].filter(tardingCard => tardingCard.symbol_original !== payload.data.symbol)
    }
    payload.rootData.instrumentCategories.forEach((category) => {
      payload.rootData.tradingCards[category] = payload.rootData.tradingCards[category].map((tradingCard) => {
        if (tradingCard.symbol_original === payload.data.symbol) {
          tradingCard.isFavorite = payload.data.isFavorite
        }
        return tradingCard
      })
    })
  },
  // добавление / обновление инструментов
  INSTRUMENTS_UPDATE (state, payload) {
    const data = payload.data
    const updatingInstruments = this.$instrument.convertInstruments(data.instruments)

    const isExistServer = Object.keys(payload.rootData.instruments).includes(data.server)

    if (isExistServer) {
      Object.entries(payload.rootData.instruments).forEach(([server = null, obj = { '': [] }]) => {
        if (server === data.server) {
          const isExistGroup = Object.keys(obj).includes(data.group)

          if (isExistGroup) {
            payload.rootData.instruments[data.server][data.group] = updatingInstruments
          } else {
            Object.defineProperty(
              payload.rootData.instruments[data.server],
              data.group,
              { value: updatingInstruments, writable: true, enumerable: true, configurable: true }
            )
          }
        }
      })
    } else {
      payload.rootData.instruments = { ...payload.rootData.instruments, [data.server]: { [data.group]: updatingInstruments } }
    }
  }
}
