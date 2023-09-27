export const getters = {
  //
  countries: (state, getters, rootState) => rootState.symbols.state.country,
  //
  emojis: (state, getters, rootState) => rootState.symbols.state.emojis.data,
  //
  symbols: (state, getters, rootState) => {
    return {
      ...rootState.symbols.state.all,
      ...rootState.symbols.state.commodities,
      ...rootState.symbols.state.country,
      ...rootState.symbols.state.crypto,
      ...rootState.symbols.state.currency,
      ...rootState.symbols.state.emojis,
      ...rootState.symbols.state.epa,
      ...rootState.symbols.state.language,
      ...rootState.symbols.state.nasdaq,
      ...rootState.symbols.state.nyse,
      ...rootState.symbols.state.stock
    }
  }
}
