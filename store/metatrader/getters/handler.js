export const getters = {
  // Данные страницы метатрейдер
  getMetatraderData: (state, getters, rootState) => JSON.parse(JSON.stringify(rootState.metatrader.state.handler.metatraderData)),
  // Актуальный аккаунт
  getActualAccount: (state, getters, rootState) => JSON.parse(JSON.stringify(rootState.metatrader.state.handler.actualAccount)),
  // Primary Account
  getPrimaryAccount: (state, getters, rootState) => JSON.parse(JSON.stringify(rootState.metatrader.state.handler.primaryAccount)),
  //
  getVpsInfo: (state, getters, rootState) => JSON.parse(JSON.stringify(rootState.metatrader.state.handler.vpsInfo))
}
