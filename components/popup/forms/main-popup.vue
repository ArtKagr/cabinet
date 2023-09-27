<template>
  <popup-trades-trade v-if="currentPopup === 'trades-trade'" />
  <popup-trades-trade-change v-else-if="currentPopup === 'trades-trade-change'" />
  <popup-trades-investment v-else-if="currentPopup === 'trades-investment'" />
  <popup-trades-investment-change v-else-if="currentPopup === 'trades-investment-change'" />
  <popup-register-yet v-else-if="currentPopup === 'register-yet'" />
  <popup-registration-warning v-else-if="currentPopup === 'registration-warning'" />
  <popup-demo-real v-else-if="currentPopup === 'demo-real'" />
  <popup-trades-history-trade v-else-if="currentPopup === 'trades-history-trade'" />
  <popup-trades-history-investment v-else-if="currentPopup === 'trades-history-investment'" />
  <popup-copiers v-else-if="['copiers', 'copiers-partner'].includes(currentPopup)" />
  <popup-copiers-history v-else-if="currentPopup === 'copiers-history'" />
  <popup-copiers-partner-edit v-else-if="currentPopup === 'copiers-partner-edit'" />
  <popup-trading-card-display v-else-if="currentPopup === 'trading-card-display'" />
  <popup-traders-card-display v-else-if="currentPopup === 'traders-card-display'" />
  <popup-trading-card-warning v-else-if="currentPopup === 'trading-card-warning'" />
  <popup-traders-card-warning v-else-if="currentPopup === 'traders-card-warning'" />
  <popup-trading-periods v-else-if="currentPopup === 'trading-periods'" />
  <popup-traders-periods v-else-if="currentPopup === 'traders-periods'" />
  <popup-trading-sorting v-else-if="currentPopup === 'trading-sorting'" />
  <popup-traders-sorting v-else-if="currentPopup === 'traders-sorting'" />
  <popup-traders-ranges v-else-if="currentPopup === 'traders-ranges'" />
  <popup-trading-open-trade v-else-if="currentPopup === 'trading-open-trade'" />
  <popup-traders-open-trade v-else-if="currentPopup === 'traders-open-trade'" />
  <popup-language v-else-if="currentPopup === 'language'" />
  <popup-analytics-filter v-else-if="currentPopup === 'analytics-filter'" />
  <popup-analytics-signals-filter v-else-if="currentPopup === 'analytics-signals-filter'" />
  <popup-analytics-calendar-event v-else-if="currentPopup === 'analytics-calendar-event'" />
  <popup-analytics-calendar-filter v-else-if="currentPopup === 'analytics-calendar-filter'" />
  <popup-google-auth v-else-if="currentPopup === 'google-auth'" />
  <popup-sms-auth v-else-if="currentPopup === 'sms-auth'" />
  <popup-email-auth v-else-if="currentPopup === 'email-auth'" />
  <popup-verification-bank-card v-else-if="currentPopup === 'verification-bank-card'" />
  <popup-verification-change-email v-else-if="currentPopup === 'verification-change-email'" />
  <popup-verification-change-phone v-else-if="currentPopup === 'verification-change-phone'" />
  <popup-verification-edit-identity v-else-if="currentPopup === 'verification-edit-identity'" />
  <popup-verification-edit-address v-else-if="currentPopup === 'verification-edit-address'" />
  <popup-verification-islamic v-else-if="currentPopup === 'verification-islamic'" />
  <popup-verification-risk-acceptance v-else-if="currentPopup === 'verification-risk-acceptance'" />
  <popup-verification-pep v-else-if="currentPopup === 'verification-pep'" />
  <popup-mt-settings v-else-if="currentPopup === 'mt-settings'" />
  <popup-mt-set-primary v-else-if="currentPopup === 'mt-set-primary'" />
  <popup-mt-reset-statistics v-else-if="currentPopup === 'mt-reset-statistics'" />
  <popup-trader-history-trade v-else-if="currentPopup === 'trader-history-trade'" />
  <popup-trader-history-investment v-else-if="currentPopup === 'trader-history-investment'" />
  <popup-trader-trade v-else-if="currentPopup === 'trader-trade'" />
  <popup-trader-investment v-else-if="currentPopup === 'trader-investment'" />
  <popup-finance-delete-wallet v-else-if="currentPopup === 'finance-delete-wallet'" />
  <popup-finance-deposit-crypto v-else-if="currentPopup === 'finance-deposit-crypto'" />
  <popup-finance-deposit-form v-else-if="currentPopup === 'finance-deposit-form'" />
  <popup-finance-deposit-message v-else-if="currentPopup === 'finance-deposit-message'" />
  <popup-finance-deposit-bank v-else-if="currentPopup === 'finance-deposit-bank'" />
  <popup-finance-repeat v-else-if="currentPopup === 'finance-repeat'" />
  <popup-finance-cancel v-else-if="currentPopup === 'finance-cancel'" />
  <popup-finance-withdrawal-info v-else-if="currentPopup === 'finance-withdrawal-info'" />
  <popup-partners-table-settings v-else-if="currentPopup === 'partners-table-settings'" />
  <popup-partners-ref-table-settings v-else-if="currentPopup === 'partners-ref-table-settings'" />
  <popup-partners-campaigns-list v-else-if="currentPopup === 'partners-campaigns-list'" />
  <popup-partners-promo-campaigns-list v-else-if="currentPopup === 'partners-promo-campaigns-list'" />
  <popup-partners-current-referral v-else-if="currentPopup === 'partners-current-referral'" />
  <popup-partners-lucky-ticket-contest-algorithm v-else-if="currentPopup === 'partners-lucky-ticket-contest-algorithm'" />
  <popup-partners-hold-informer v-else-if="currentPopup === 'partners-hold-informer'" />
  <popup-successful-partner-conditions v-else-if="currentPopup === 'successful-partner-conditions'" />
  <popup-successful-partner-participate v-else-if="currentPopup === 'successful-partner-participate'" />
  <popup-partners-commission-hold v-else-if="currentPopup === 'partners-commission-hold'" />
  <popup-bring-friend v-else-if="currentPopup === 'bring-friend'" />
  <popup-chat-image v-else-if="currentPopup === 'chat-image'" />
  <popup-education-webinar v-else-if="currentPopup === 'education-webinar'" />
  <popup-education-webinar-registration v-else-if="currentPopup === 'education-webinar-registration'" />
</template>

<script>
import PopupDemoReal from '~/components/popup/forms/popup-demo-real'
import PopupRegistrationWarning from '~/components/popup/forms/popup-registration-warning'
import PopupRegisterYet from '~/components/popup/forms/popup-register-yet'
import PopupTradesHistoryTrade from '~/components/popup/forms/popup-trades-history-trade'
import PopupTradesHistoryInvestment from '~/components/popup/forms/popup-trades-history-investment'
import PopupTradesTrade from '~/components/popup/forms/popup-trades-trade'
import PopupTradesInvestment from '~/components/popup/forms/popup-trades-investment'
import PopupTradesTradeChange from '~/components/popup/forms/popup-trades-trade-change'
import PopupTradesInvestmentChange from '~/components/popup/forms/popup-trades-investment-change'
import PopupCopiers from '~/components/popup/forms/popup-copiers'
import PopupCopiersHistory from '~/components/popup/forms/popup-copiers-history'
import PopupCopiersPartnerEdit from '~/components/popup/forms/popup-copiers-partner-edit'
import PopupTradingCardDisplay from '~/components/popup/forms/popup-trading-card-display'
import PopupTradersCardDisplay from '~/components/popup/forms/popup-traders-card-display'
import PopupTradingCardWarning from '~/components/popup/forms/popup-trading-card-warning'
import PopupTradersCardWarning from '~/components/popup/forms/popup-traders-card-warning'
import PopupTradingPeriods from '~/components/popup/forms/popup-trading-periods'
import PopupTradersPeriods from '~/components/popup/forms/popup-traders-periods'
import PopupTradingSorting from '~/components/popup/forms/popup-trading-sorting'
import PopupTradersSorting from '~/components/popup/forms/popup-traders-sorting'
import PopupTradersRanges from '~/components/popup/forms/popup-traders-ranges'
import PopupLanguage from '~/components/popup/forms/popup-language'
import PopupAnalyticsFilter from '~/components/popup/forms/popup-analytics-filter'
import PopupAnalyticsSignalsFilter from '~/components/popup/forms/popup-analytics-signals-filter'
import PopupAnalyticsCalendarFilter from '~/components/popup/forms/popup-analytics-calendar-filter'
import PopupGoogleAuth from '~/components/popup/forms/popup-google-auth'
import PopupSmsAuth from '~/components/popup/forms/popup-sms-auth'
import PopupEmailAuth from '~/components/popup/forms/popup-email-auth'
import PopupVerificationBankCard from '~/components/popup/forms/popup-verification-bank-card'
import PopupMtSettings from '~/components/popup/forms/popup-mt-settings'
import PopupMtSetPrimary from '~/components/popup/forms/popup-mt-set-primary'
import PopupMtResetStatistics from '~/components/popup/forms/popup-mt-reset-statistics'
import PopupTraderHistoryTrade from '~/components/popup/forms/popup-trader-history-trade'
import PopupTraderHistoryInvestment from '~/components/popup/forms/popup-trader-history-investment'
import PopupTraderTrade from '~/components/popup/forms/popup-trader-trade'
import PopupTraderInvestment from '~/components/popup/forms/popup-trader-investment'
import PopupAnalyticsCalendarEvent from '~/components/popup/forms/popup-analytics-calendar-event'
import PopupFinanceDeleteWallet from '~/components/popup/forms/popup-finance-delete-wallet'
import PopupFinanceDepositCrypto from '~/components/popup/forms/popup-finance-deposit-crypto'
import PopupFinanceDepositForm from '~/components/popup/forms/popup-finance-deposit-form'
import PopupFinanceRepeat from '~/components/popup/forms/popup-finance-repeat'
import PopupFinanceCancel from '~/components/popup/forms/popup-finance-cancel'
import PopupFinanceWithdrawalInfo from '~/components/popup/forms/popup-finance-withdrawal-info'
import PopupPartnersTableSettings from '~/components/popup/forms/popup-partners-table-settings'
import PopupPartnersRefTableSettings from '~/components/popup/forms/popup-partners-ref-table-settings'
import PopupPartnersCampaignsList from '~/components/popup/forms/popup-partners-campaigns-list'
import PopupPartnersPromoCampaignsList from '~/components/popup/forms/popup-partners-promo-campaigns-list'
import PopupPartnersCurrentReferral from '~/components/popup/forms/popup-partners-current-referral'
import PopupPartnersLuckyTicketContestAlgorithm from '~/components/popup/forms/popup-partners-lucky-ticket-contest-algorithm'
import PopupSuccessfulPartnerConditions from '~/components/popup/forms/popup-successful-partner-conditions'
import PopupSuccessfulPartnerParticipate from '~/components/popup/forms/popup-successful-partner-participate'
import PopupPartnersCommissionHold from '~/components/popup/forms/popup-partners-commission-hold'
import PopupVerificationChangeEmail from '~/components/popup/forms/popup-verification-change-email'
import PopupVerificationChangePhone from '~/components/popup/forms/popup-verification-change-phone'
import PopupVerificationEditIdentity from '~/components/popup/forms/popup-verification-edit-identity'
import PopupVerificationEditAddress from '~/components/popup/forms/popup-verification-edit-address'
import PopupVerificationIslamic from '~/components/popup/forms/popup-verification-islamic'
import PopupBringFriend from '~/components/popup/forms/popup-bring-friend'
import PopupVerificationRiskAcceptance from '~/components/popup/forms/popup-verification-risk-acceptance'
import PopupPartnersHoldInformer from '~/components/popup/forms/popup-partners-hold-informer'
import PopupVerificationPep from '~/components/popup/forms/popup-verification-pep'
import PopupChatImage from '~/components/popup/forms/popup-chat-image'
import PopupFinanceDepositMessage from '~/components/popup/forms/popup-finance-deposit-message'
import PopupFinanceDepositBank from '~/components/popup/forms/popup-finance-deposit-bank'
import PopupTradingOpenTrade from '~/components/popup/forms/popup-trading-open-trade'
import PopupTradersOpenTrade from '~/components/popup/forms/popup-traders-open-trade'
import PopupEducationWebinar from '~/components/popup/forms/popup-education-webinar'
import PopupEducationWebinarRegistration from '~/components/popup/forms/popup-education-webinar-registration'
export default {
  name: 'MainPopup',
  components: {
    PopupEducationWebinarRegistration,
    PopupEducationWebinar,
    PopupTradersOpenTrade,
    PopupTradingOpenTrade,
    PopupFinanceDepositBank,
    PopupFinanceDepositMessage,
    PopupChatImage,
    PopupVerificationPep,
    PopupPartnersHoldInformer,
    PopupVerificationRiskAcceptance,
    PopupVerificationIslamic,
    PopupBringFriend,
    PopupVerificationEditAddress,
    PopupVerificationEditIdentity,
    PopupVerificationChangePhone,
    PopupVerificationChangeEmail,
    PopupPartnersCommissionHold,
    PopupSuccessfulPartnerParticipate,
    PopupSuccessfulPartnerConditions,
    PopupPartnersLuckyTicketContestAlgorithm,
    PopupPartnersCurrentReferral,
    PopupPartnersPromoCampaignsList,
    PopupPartnersCampaignsList,
    PopupPartnersRefTableSettings,
    PopupPartnersTableSettings,
    PopupFinanceWithdrawalInfo,
    PopupFinanceCancel,
    PopupFinanceRepeat,
    PopupFinanceDepositForm,
    PopupFinanceDepositCrypto,
    PopupFinanceDeleteWallet,
    PopupAnalyticsCalendarEvent,
    PopupTraderInvestment,
    PopupTraderTrade,
    PopupTraderHistoryInvestment,
    PopupTraderHistoryTrade,
    PopupMtResetStatistics,
    PopupMtSetPrimary,
    PopupMtSettings,
    PopupVerificationBankCard,
    PopupEmailAuth,
    PopupSmsAuth,
    PopupGoogleAuth,
    PopupAnalyticsCalendarFilter,
    PopupAnalyticsSignalsFilter,
    PopupAnalyticsFilter,
    PopupLanguage,
    PopupTradersRanges,
    PopupTradersSorting,
    PopupTradingSorting,
    PopupTradersPeriods,
    PopupTradingPeriods,
    PopupTradersCardWarning,
    PopupTradingCardWarning,
    PopupTradersCardDisplay,
    PopupTradingCardDisplay,
    PopupCopiersPartnerEdit,
    PopupCopiersHistory,
    PopupCopiers,
    PopupTradesInvestmentChange,
    PopupTradesTradeChange,
    PopupTradesInvestment,
    PopupTradesTrade,
    PopupTradesHistoryInvestment,
    PopupTradesHistoryTrade,
    PopupRegisterYet,
    PopupRegistrationWarning,
    PopupDemoReal
  },
  computed: {
    currentPopup () {
      return this.$store.getters['dictionaries/getters/handler/getCurrentPopup']
    }
  },
  destroyed () {
    this.savePopupName(null)
  },
  methods: {
    savePopupName (popupName) {
      this.$store.commit('dictionaries/mutations/handler/SAVE_POPUP_NAME', {
        rootData: this.$store.state.dictionaries.state.handler,
        data: popupName
      })
    }
  }
}
</script>
