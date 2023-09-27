import moment from 'moment'
import {
  CMD_BUY,
  CMD_SELL,
  CMD_BUY_STOP,
  CMD_SELL_STOP,
  CMD_BUY_LIMIT,
  CMD_SELL_LIMIT,
  CMD_BUY_STOP_LIMIT,
  CMD_SELL_STOP_LIMIT
} from '~/plugins/trading/Constants'

export default {
  data () {
    return {
      moment,
      CMD_BUY,
      CMD_SELL,
      CMD_BUY_STOP,
      CMD_SELL_STOP,
      CMD_BUY_LIMIT,
      CMD_SELL_LIMIT,
      CMD_BUY_STOP_LIMIT,
      CMD_SELL_STOP_LIMIT
    }
  },
  computed: {
    account () {
      return this.$store.getters['trading/getters/trading/getAccount']
    },
    accountBalance () {
      return this.$store.getters['trading/getters/trading/getAccountBalance']
    },
    accountAvailableFunds () {
      return this.$store.getters['trading/getters/trading/getAccountAvailableFunds']
    },
    windowWidthNumber () {
      return this.$store.getters['dictionaries/getters/handler/getCurrentNumberWindowWidth']
    },
    windowWidth () {
      return this.$store.getters['dictionaries/getters/handler/getCurrentWindowWidth']
    },
    windowHeight () {
      return this.$store.getters['dictionaries/getters/handler/getCurrentWindowHeight']
    },
    scrollBottom () {
      return this.$store.getters['dictionaries/getters/handler/getScrollBottom']
    },
    isGuest () {
      return this.$store.getters['dictionaries/getters/user/getIsGuest']
    },
    isDemo () {
      return this.$store.getters['dictionaries/getters/user/getIsDemo']
    },
    isAuthUser () {
      return this.$store.getters['dictionaries/getters/user/getIsAuthUser']
    },
    isDemoTour () {
      return this.$store.getters['dictionaries/getters/user/isDemoTour']
    },
    isAuthUserDemo () {
      return this.$store.getters['dictionaries/getters/user/getIsAuthUserDemo']
    },
    isPartnerMode () {
      return this.$store.getters['partners/getters/handler/getIsPartnerMode']
    },
    routePath () {
      return this.$store.getters['dictionaries/getters/handler/getRoute'].path
    },
    authorization () {
      return this.$store.getters['dictionaries/getters/user/getAuthorization']
    },
    userToken () {
      return this.$store.getters['dictionaries/getters/user/getUserToken']
    },
    guestUserToken () {
      return this.$store.getters['dictionaries/getters/user/getGuestUserToken']
    },
    user () {
      return this.$store.getters['dictionaries/getters/user/getUser']
    },
    routePages () {
      return this.$store.getters['dictionaries/getters/handler/getRoutePages']
    },
    isRtlMode () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode']
    },
    dir () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode'] ? 'rtl' : 'ltr'
    },
    isPreloaderShown () {
      return this.$store.getters['dictionaries/getters/handler/getIsPreloaderShown']
    },
    isPopupShown () {
      return this.$store.getters['dictionaries/getters/handler/getIsPopupShown']
    },
    isModalShown () {
      return this.$store.getters['dictionaries/getters/handler/getIsModalShown']
    },
    isEuCountry () {
      return this.$store.getters['forms/getters/handler/getIsEuCountry']
    },
    isEuAccount () {
      return this.$store.getters['forms/getters/handler/getIsEuCountry']
    },
    dictionariesState () {
      return this.$store.state.dictionaries.state.handler
    },
    affiliateData () {
      const dateTo = localStorage.getItem('affiliate_to') || this.moment().format('YYYY-MM-DD')
      const dateFrom = localStorage.getItem('affiliate_from') || this.moment(dateTo).subtract(29, 'days').format('YYYY-MM-DD')
      return { dateTo, dateFrom }
    },
    form () {
      return this.$store.getters['forms/getters/handler/getForm']
    },
    formTitle () {
      return this.$store.getters['forms/getters/handler/getFormTitle']
    },
    isSearchPopupShown () {
      return this.$store.getters['dictionaries/getters/handler/getIsSearchPopupShown']
    },
    isTradeOpenShown () {
      return this.$store.getters['dictionaries/getters/handler/getIsTradeOpenShown']
    },
    isTradeCloseShown () {
      return this.$store.getters['dictionaries/getters/handler/getIsTradeCloseShown']
    },
    activeInstruments () {
      return this.$store.getters['trading/getters/trading/getActiveInstruments']
    },
    activeInstrumentsOriginalSymbol () {
      return Object.entries(this.$store.getters['trading/getters/trading/getActiveInstruments']).reduce((acc, item) => {
        const symbol = this.$instrument.getOriginalSymbol(item[0])
        acc[symbol] = item[1]
        return acc
      }, {})
    }
  },
  methods: {
    getUploadDocStatus (status) {
      switch (status) {
        case 'no':
          return `${this.$t('Статус')}: ${this.$t('документы не загружены')}`
        case 'process':
          return `${this.$t('Статус')}: ${this.$t('на рассмотрении')}`
        case 'verified':
          return `${this.$t('Статус')}: ${this.$t('Верифицировано')}`
        case 'rejected':
          return `${this.$t('Статус')}: ${this.$t('Отклоненo')}`
        default:
          return ''
      }
    },
    saveMenuLink (link) {
      this.$store.commit('dictionaries/mutations/handler/SET_ACTIVE_MENU_LINKS_ITEM', {
        rootData: this.$store.state.dictionaries.state.handler,
        data: link
      })
    },
    numbersAfterComma (value = 0) {
      return value.toString().includes('.') ? value.toString().split('.').pop().length : 0
    },
    setRandomKey () {
      return Math.floor(Math.random() * 1000000)
    },
    togglePreloader (value) {
      value ? this.$bvModal.show('lfx-preloader') : this.$bvModal.hide('lfx-preloader')
    },
    savePopupName (popupName) {
      this.$store.commit('dictionaries/mutations/handler/SAVE_POPUP_NAME', {
        rootData: this.$store.state.dictionaries.state.handler,
        data: popupName
      })
    },
    togglePopup (value) {
      this.$store.commit('dictionaries/mutations/handler/TOGGLE_POPUP', {
        rootData: this.$store.state.dictionaries.state.handler,
        data: value
      })
    },
    toggleSearchPopup (flag) {
      this.$store.dispatch('dictionaries/actions/handler/toggleSearchPopup', flag)
    },
    toggleModal (value) {
      this.$store.commit('dictionaries/mutations/handler/TOGGLE_MODAL', {
        rootData: this.$store.state.dictionaries.state.handler,
        data: !!value
      })
    },
    fetchForm (formTitle) {
      this.$store.dispatch('forms/actions/handler/fetchForm', formTitle)
    },
    demoCreate () {
      this.$store.dispatch('dictionaries/actions/auth/demoCreate')
    },
    deleteAccountCurrency () {
      this.$store.commit('trading/mutations/socket/account/DELETE_ACCOUNT_CURRENCY', {
        rootData: this.$store.state.trading.state.handler
      })
    },
    showPopup (popupName) {
      this.$store.dispatch('dictionaries/actions/handler/showPopup', popupName)
    },
    openErrorToast (description) {
      this.$store.dispatch('dictionaries/actions/handler/openErrorToast', { description }, { root: true })
    },
    openInstrumentTrader (item) {
      if (item.user_id) {
        this.$router.push(`/${this.routePages.locale}/traders/${item.user_id}`)
      } else {
        const data = item.instrument || item
        const instrument =
          this.activeInstruments[data.symbol] ||
          this.activeInstruments[data.symbol_original] ||
          this.activeInstrumentsOriginalSymbol[data.symbol] ||
          this.activeInstrumentsOriginalSymbol[data.symbol_original]
        const category = this.$trading.getCategoryName(instrument.category)
        const symbol = data.symbol_original ? data.symbol_original.replace(/#/gi, '') : data.symbol.replace(/#/gi, '')

        this.$router.push(`/${this.routePages.locale}/trading/${category}/${symbol.toLowerCase()}`)

        this.$store.commit('dictionaries/mutations/handler/SAVE_ACTIVE_MAIN_MENU_BUTTON', {
          rootData: this.$store.state.dictionaries.state.handler,
          data: 'trading'
        })
      }
    },
    isBuyTrade (cmd) {
      return [CMD_BUY, CMD_BUY_STOP, CMD_BUY_LIMIT, CMD_BUY_STOP_LIMIT].includes(cmd)
    },
    getIsOrder (cmd) {
      return [CMD_BUY_STOP, CMD_SELL_STOP, CMD_BUY_LIMIT, CMD_SELL_LIMIT, CMD_BUY_STOP_LIMIT, CMD_SELL_STOP_LIMIT].includes(cmd)
    },
    getIsStop (cmd) {
      return [CMD_BUY_STOP, CMD_SELL_STOP].includes(cmd)
    },
    getIsLimit (cmd) {
      return [CMD_BUY_LIMIT, CMD_SELL_LIMIT].includes(cmd)
    }
  }
}
