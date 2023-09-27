export const getters = {
  // Верификационные данные
  getVerificationData: (state, getters, rootState) => JSON.parse(JSON.stringify(rootState.profile.state.handler.verificationData)),
  // Основные параметры страницы about
  getTraderData: (state, getters, rootState) => JSON.parse(JSON.stringify(rootState.profile.state.handler.traderData)),
  // Доходность по месяцам страницы about
  getTraderBars: (state, getters, rootState) => JSON.parse(JSON.stringify(rootState.profile.state.handler.traderBars)),
  // Статистика сделок страницы about
  getTraderTrades: (state, getters, rootState) => JSON.parse(JSON.stringify(rootState.profile.state.handler.traderTrades)),
  // Страница истории торговли
  getTradesHistoryPage: (state, getters, rootState) => rootState.profile.state.handler.tradesHistoryPage,
  // История торговли
  getTradesHistory: (state, getters, rootState) => JSON.parse(JSON.stringify(rootState.profile.state.handler.tradesHistory)),
  // Активная вкладка bars на странице about
  getProfileIndicatorsActiveMenuItem: (state, getters, rootState) => rootState.profile.state.handler.profileIndicatorsActiveMenuItem,
  // Список копировальщиков
  getCopiersList: (state, getters, rootState) => JSON.parse(JSON.stringify(rootState.profile.state.handler.copiersList)),
  // Список истории копировальщиков
  getCopiersHistoryList: (state, getters, rootState) => JSON.parse(JSON.stringify(rootState.profile.state.handler.copiersHistoryList)),
  // Активный копировальщик (показ в попапе)
  getCurrentCopier: (state, getters, rootState) => JSON.parse(JSON.stringify(rootState.profile.state.handler.currentCopier)),
  // Текст при отсутствии копировальщиков
  getCopiersNoData: (state, getters, rootState) => JSON.parse(JSON.stringify(rootState.profile.state.handler.copiersNoData)),
  // Текст при отсутствии истории копировальщиков
  getCopiersHistoryNoData: (state, getters, rootState) => JSON.parse(JSON.stringify(rootState.profile.state.handler.copiersHistoryNoData)),
  // Статусы аутентификации
  getSecurityStatusList: (state, getters, rootState) => JSON.parse(JSON.stringify(rootState.profile.state.handler.securityStatusList)),
  // Данные google auth
  getGoogleAuth: (state, getters, rootState) => JSON.parse(JSON.stringify(rootState.profile.state.handler.googleAuth)),
  // Данные sms auth
  getSmsAuth: (state, getters, rootState) => JSON.parse(JSON.stringify(rootState.profile.state.handler.smsAuth)),
  // Данные email auth
  getEmailAuth: (state, getters, rootState) => JSON.parse(JSON.stringify(rootState.profile.state.handler.emailAuth)),
  // Партнеры копирующих
  getCopiersPartner: (state, getters, rootState) => JSON.parse(JSON.stringify(rootState.profile.state.handler.copiersPartner)),
  // Открытый партнер копирующего
  getCurrentCopierPartner: (state, getters, rootState) => JSON.parse(JSON.stringify(rootState.profile.state.handler.currentCopierPartner)),
  // Открытая для подтверждения банковская карта
  getActiveBankCard: (state, getters, rootState) => JSON.parse(JSON.stringify(rootState.profile.state.handler.activeBankCard)),
  // Данные для опросника EU
  getQuestionnaireEu: (state, getters, rootState) => JSON.parse(JSON.stringify(rootState.profile.state.handler.questionnaireEu)),
  // Данные "Приведи друга"
  getBringFriend: (state, getters, rootState) => JSON.parse(JSON.stringify(rootState.profile.state.handler.bringFriend)),
  // Условия "Приведи друга"
  getBringFriendConditions: (state, getters, rootState) => JSON.parse(JSON.stringify(rootState.profile.state.handler.bringFriendConditions)),
  //
  getQuestionnaireEuSteps: (state, getters, rootState) => JSON.parse(JSON.stringify(rootState.profile.state.handler.questionnaireEuSteps)),
  //
  getVerificationDocInfo: (state, getters, rootState) => JSON.parse(JSON.stringify(rootState.profile.state.handler.verificationDocInfo)),
  //
  getNeedProfileTrader: (state, getters, rootState) => JSON.parse(JSON.stringify(rootState.profile.state.handler.needProfileTrader))
}
