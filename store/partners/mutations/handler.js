export const mutations = {
  TOGGLE_PARTNER_MODE (state, payload) {
    payload.rootData.partners.isPartnerMode = payload.data === 2
    payload.rootData.user.data.mode = payload.data
  },
  SAVE_CAMPAIGN_TABLE_SETTINGS (state, payload) {
    payload.rootData.partnerCampaignTableSettings = JSON.parse(JSON.stringify(payload.data))
  },
  SAVE_REFERRAL_TABLE_SETTINGS (state, payload) {
    payload.rootData.partnerReferralTableSettings = JSON.parse(JSON.stringify(payload.data))
  },
  SAVE_PROMO_LIST (state, payload) {
    payload.rootData.promoList = JSON.parse(JSON.stringify(payload.data))
  },
  SAVE_PARTNER_BANNERS (state, payload) {
    payload.rootData.partnerBanners.lists = payload.data.lists
    payload.rootData.partnerBanners.allBanners = payload.data.allBanners
  },
  SAVE_PARTNER_LANDINGS (state, payload) {
    payload.rootData.partnerLandings.lists = payload.data.lists
    payload.rootData.partnerLandings.allLanding = payload.data.allLanding
  },
  SAVE_PARTNER_HANDOUTS (state, payload) {
    payload.rootData.partnerHandouts.booklets = payload.data.booklets
    payload.rootData.partnerHandouts.brandBook = payload.data.brandBook
    payload.rootData.partnerHandouts.businessCards = payload.data.businessCards
  },
  SAVE_PARTNER_AVATARS (state, payload) {
    payload.rootData.partnerAvatars.lists = payload.data.lists
    payload.rootData.partnerAvatars.allAvatars = payload.data.allAvatars
  },
  SAVE_PARTNER_VIDEO (state, payload) {
    payload.rootData.partnerVideo.lists = payload.data.lists
    payload.rootData.partnerVideo.allVideo = payload.data.allVideos
  },
  UPDATE_PARTNER_SORT_FLAG (state, payload) {
    if (payload.data.flag === 'size') {
      payload.rootData.partnerSortFlags.size = payload.data.value
    } else if (payload.data.flag === 'category') {
      payload.rootData.partnerSortFlags.category = payload.data.value
    } else if (payload.data.flag === 'language') {
      payload.rootData.partnerSortFlags.language = payload.data.value
    }
  },
  CLEAR_PARTNER_SORT_FLAGS (state, payload) {
    payload.rootData.partnerSortFlags.size = 'any'
    payload.rootData.partnerSortFlags.category = 'any'
    // payload.rootData.partnerSortFlags.language = 'any'
  },
  SAVE_PARTNER_APPLICATION_DATA (state, payload) {
    payload.rootData.applicationData = Object.assign(payload.rootData.applicationData, payload.data)
  },
  SAVE_PARTNER_CAMPAIGNS (state, payload) {
    payload.rootData.partnerCampaigns = Object.assign(payload.rootData.partnerCampaigns, payload.data)
  },
  SAVE_CURRENT_PARTNER_CAMPAIGN (state, payload) {
    payload.rootData.currentPartnerCampaign = Object.assign(payload.rootData.currentPartnerCampaign, payload.data)
  },
  SAVE_CURRENT_PARTNER_CAMPAIGN_REFERRALS (state, payload) {
    payload.rootData.currentPartnerCampaignReferrals = payload.data.referrals
  },
  SAVE_ACTIVE_PARTNER_CAMPAIGN_ID (state, payload) {
    payload.rootData.activePartnerCampaignId = payload.data
  },
  SAVE_CAMPAIGN_FILTER (state, payload) {
    payload.rootData.affiliateDates = Object.assign(payload.rootData.affiliateDates, payload.data)
  },
  SAVE_PARTNER_CONTESTS (state, payload) {
    payload.rootData.partnerContests = payload.data
  },
  SAVE_SUCCESSFUL_PARTNER_CONTEST (state, payload) {
    payload.rootData.successfulPartnerContestData = Object.assign(payload.rootData.successfulPartnerContestData, payload.data)
  },
  SAVE_SUCCESSFUL_PARTNER_TABLES (state, payload) {
    payload.rootData.successfulPartnerContestTables = Object.assign(payload.rootData.successfulPartnerContestTables, payload.data)
  },
  SAVE_LUCKY_TICKET_CONTEST (state, payload) {
    payload.rootData.luckyTicketContestData = Object.assign(payload.rootData.luckyTicketContestData, payload.data)
  },
  SAVE_ANNUAL_IB_VIETNAM_CONTEST (state, payload) {
    payload.rootData.annualIbVietnamContest = Object.assign(payload.rootData.annualIbVietnamContest, payload.data)
    const userContestData = payload.rootData.annualIbVietnamContest.user[0]
    payload.rootData.annualIbVietnamContest.participants.unshift({
      'place-value': userContestData.rank,
      'uid-value': 'Это вы',
      'lots-value': userContestData.lots,
      'active-referrals-value': userContestData.count,
      'rating-value': userContestData.rating,
      'prize-amount-value': userContestData.win
    })
  },
  SAVE_PROMO_CAMPAIGNS (state, payload) {
    payload.rootData.promoCampaigns = Object.assign(payload.rootData.promoCampaigns, payload.data)
  },
  SAVE_PROMO_CID (state, payload) {
    payload.rootData.promoCid = payload.data
  },
  SAVE_PARTNER_NETWORK (state, payload) {
    payload.rootData.partnerNetwork = Object.assign(payload.rootData.partnerNetwork, payload.data)
  },
  SAVE_PARTNER_COMMISSIONS (state, payload) {
    payload.rootData.partnerCommissions = Object.assign(payload.rootData.partnerCommissions, payload.data)
  },
  SAVE_PARTNER_CALCULATOR_DATA (state, payload) {
    payload.rootData.partnerCalculatorData = Object.assign(payload.rootData.partnerCalculatorData, payload.data)
  },
  SAVE_CURRENT_REFERRAL (state, payload) {
    payload.rootData.currentReferral = payload.data
  },
  SAVE_REFERRALS_EMPTY_DATA_TITLE (state, payload) {
    payload.rootData.referralsEmptyDataTitle = payload.data
  },
  SAVE_AFFILIATE_CALCULATOR_RESULT (state, payload) {
    payload.rootData.affiliateCalculator = payload.data
  },
  SAVE_PARTNER_VALUES (state, payload) {
    payload.rootData.partnerValues = payload.data
  },
  SAVE_PARTNER_HOLD_INFORMER (state, payload) {
    payload.rootData.partnerHoldInformer = payload.data
  },
  SAVE_SUCCESSFUL_PARTNER_CONDITIONS (state, payload) {
    payload.rootData.successfulPartnerConditions = payload.data
  },
  SAVE_PROMO_FORM_IMAGE_DATA (state, payload) {
    payload.rootData.promoFormImageData = payload.data
  }
}
