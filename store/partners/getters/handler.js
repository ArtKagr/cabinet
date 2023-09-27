export const getters = {
  // Режим партнера
  getIsPartnerMode: (state, getters, rootState) => rootState.partners.state.handler.isPartnerMode,
  // Настройки таблицы кампаний
  getPartnerCampaignTableSettings: (state, getters, rootState) => JSON.parse(JSON.stringify(rootState.partners.state.handler.partnerCampaignTableSettings)),
  // Настройки таблицы рефералов
  getPartnerReferralTableSettings: (state, getters, rootState) => JSON.parse(JSON.stringify(rootState.partners.state.handler.partnerReferralTableSettings)),
  // Список промо материалов
  getPromoList: (state, getters, rootState) => JSON.parse(JSON.stringify(rootState.partners.state.handler.promoList)),
  // Список промо баннеров
  getPartnerBanners: (state, getters, rootState) => JSON.parse(JSON.stringify(rootState.partners.state.handler.partnerBanners)),
  // Список промо лендингов
  getPartnerLandings: (state, getters, rootState) => JSON.parse(JSON.stringify(rootState.partners.state.handler.partnerLandings)),
  // Список промо лендингов
  getPartnerVideo: (state, getters, rootState) => JSON.parse(JSON.stringify(rootState.partners.state.handler.partnerVideo)),
  // Список промо раздаточных материалов
  getPartnerHandouts: (state, getters, rootState) => JSON.parse(JSON.stringify(rootState.partners.state.handler.partnerHandouts)),
  // Список промо аватарок
  getPartnerAvatars: (state, getters, rootState) => JSON.parse(JSON.stringify(rootState.partners.state.handler.partnerAvatars)),
  // Флаги сортировки промо материалов
  getPartnerSortFlags: (state, getters, rootState) => JSON.parse(JSON.stringify(rootState.partners.state.handler.partnerSortFlags)),
  //
  transformArrays: () => (title, array) => {
    const result = array || []
    return result.reduce((preVal, item, index) => {
      if (index === 0) { preVal.push({ flag: 'any', title }) }
      preVal.push({ flag: item[0], title: item[1] })
      return preVal
    }, [])
  },
  // Данные страницы Кампании
  getPartnerCampaigns: (state, getters, rootState) => JSON.parse(JSON.stringify(rootState.partners.state.handler.partnerCampaigns)),
  // Данные страницы конкретной кампании
  getCurrentPartnerCampaign: (state, getters, rootState) => JSON.parse(JSON.stringify(rootState.partners.state.handler.currentPartnerCampaign)),
  // Рефералы конкретной кампании
  getCurrentPartnerCampaignReferrals: (state, getters, rootState) => JSON.parse(JSON.stringify(rootState.partners.state.handler.currentPartnerCampaignReferrals)),
  // Даты фильтра страницы Кампании
  getAffiliateDates: (state, getters, rootState) => JSON.parse(JSON.stringify(rootState.partners.state.handler.affiliateDates)),
  // Список конкурсов
  getPartnerContests: (state, getters, rootState) => JSON.parse(JSON.stringify(rootState.partners.state.handler.partnerContests)),
  // Конкурс успешный партнер
  getSuccessfulPartnerContestData: (state, getters, rootState) => JSON.parse(JSON.stringify(rootState.partners.state.handler.successfulPartnerContestData)),
  // Таблицы конкурса успешный партнер
  getSuccessfulPartnerContestTables: (state, getters, rootState) => JSON.parse(JSON.stringify(rootState.partners.state.handler.successfulPartnerContestTables)),
  // Конкурс счастливый билет
  getLuckyTicketContestData: (state, getters, rootState) => JSON.parse(JSON.stringify(rootState.partners.state.handler.luckyTicketContestData)),
  // Ежегодный конкурс партнер из Вьетнама
  getAnnualIbVietnamContest: (state, getters, rootState) => JSON.parse(JSON.stringify(rootState.partners.state.handler.annualIbVietnamContest)),
  // Список кампаний страницы Промо
  getPromoCampaigns: (state, getters, rootState) => JSON.parse(JSON.stringify(rootState.partners.state.handler.promoCampaigns)),
  //
  getPromoCid: (state, getters, rootState) => JSON.parse(JSON.stringify(rootState.partners.state.handler.promoCid)),
  //
  getPartnerNetwork: (state, getters, rootState) => JSON.parse(JSON.stringify(rootState.partners.state.handler.partnerNetwork)),
  //
  getPartnerCommissions: (state, getters, rootState) => JSON.parse(JSON.stringify(rootState.partners.state.handler.partnerCommissions)),
  //
  getPartnerCalculatorData: (state, getters, rootState) => JSON.parse(JSON.stringify(rootState.partners.state.handler.partnerCalculatorData)),
  // Реферал, открытый в попапе
  getCurrentReferral: (state, getters, rootState) => JSON.parse(JSON.stringify(rootState.partners.state.handler.currentReferral)),
  //
  getReferralsEmptyDataTitle: (state, getters, rootState) => rootState.partners.state.handler.referralsEmptyDataTitle,
  //
  getAffiliateCalculator: (state, getters, rootState) => JSON.parse(JSON.stringify(rootState.partners.state.handler.affiliateCalculator)),
  //
  getPartnerValues: (state, getters, rootState) => JSON.parse(JSON.stringify(rootState.partners.state.handler.partnerValues)),
  //
  getPartnerHoldInformer: (state, getters, rootState) => JSON.parse(JSON.stringify(rootState.partners.state.handler.partnerHoldInformer)),
  //
  getSuccessfulPartnerConditions: (state, getters, rootState) => JSON.parse(JSON.stringify(rootState.partners.state.handler.successfulPartnerConditions)),
  //
  getPromoFormImageData: (state, getters, rootState) => JSON.parse(JSON.stringify(rootState.partners.state.handler.promoFormImageData))
}
