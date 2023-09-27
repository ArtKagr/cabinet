<template>
  <div class="main" :dir="dir">
    <lfx-header />
    <div id="main-page" class="main-page -is_default" :class="[`-${dir}`, bottomSidebarIsVisible ? '-bottom_sidebar_is_visible' : '']">
      <lfx-sidebar-menu />
      <lfx-sidebar-chat />
      <affiliate-campaigns v-if="routePath === `/${routePages.locale}` && isPartnerMode" />
      <trading v-else-if="routePath === `/${routePages.locale}`" :is-default-page="true" />
      <Nuxt v-else />
    </div>
    <lfx-preloader />
    <lfx-toast />
    <lfx-sidebar-bottom v-if="bottomSidebarIsVisible" />
    <modal v-if="isModalShown" type="modal" />
    <popup v-if="isPopupShown" type="popup" />
    <search-popup v-if="isSearchPopupShown" type="search-popup" />
    <popup-trade-open v-if="isTradeOpenShown" type="popup-trade-open" />
    <popup-trade-close v-if="isTradeCloseShown" type="popup-trade-close" />
  </div>
</template>
<script>
import LfxHeader from '~/components/header/index'
import LfxPreloader from '~/components/forms/lfx-preloader'
import LfxToast from '~/components/forms/lfx-toast'
import LfxSidebarBottom from '~/components/sidebars/lfx-sidebar-bottom'
import LfxSidebarChat from '~/components/sidebars/lfx-sidebar-chat'
import LfxSidebarMenu from '~/components/sidebars/lfx-sidebar-menu'
import Trading from '~/pages/trading'
import AffiliateCampaigns from '~/pages/affiliate-campaigns'
import Modal from '~/components/modal/modal'
import Popup from '~/components/popup/popup'
import SearchPopup from '~/components/popup/search-popup'
import PopupTradeOpen from '~/components/popup/popup-trade-open'
import PopupTradeClose from '~/components/popup/popup-trade-close'
export default {
  components: {
    PopupTradeClose,
    PopupTradeOpen,
    SearchPopup,
    Popup,
    Modal,
    AffiliateCampaigns,
    Trading,
    LfxSidebarMenu,
    LfxSidebarChat,
    LfxSidebarBottom,
    LfxToast,
    LfxPreloader,
    LfxHeader
  },
  // asyncData ({ app, store, route }) {
  //   let token = localStorage.getItem('user_token')
  //
  //   const locale = store.getters['dictionaries/getters/handler/getRoutePages'].locale
  //
  //   if (!token) {
  //     localStorage.setItem('user_token', store.getters['dictionaries/getters/user/getGuestUserToken'])
  //   }
  //
  //   token = localStorage.getItem('user_token')
  //
  //   store.commit('dictionaries/mutations/handler/SAVE_ROUTE', {
  //     rootData: store.state.dictionaries.state.handler,
  //     data: { path: route.path, query: route.query }
  //   })
  //
  //   token === '00000000000000000000000000000000'
  //     ? store.dispatch('dictionaries/actions/auth/fetchGuestUser')
  //     : store.dispatch('dictionaries/actions/auth/fetchRealUser')
  //
  //   app.$http.$get('https://api.liteforex.com/js/locales/cabinet-en.json')
  //     .then((response) => {
  //       app.$i18n.setLocaleMessage('en', response)
  //     })
  //
  //   if (locale !== 'en') {
  //     app.$http.$get(`https://api.liteforex.com/js/locales/cabinet-${locale}.json`)
  //       .then((response) => {
  //         app.$i18n.setLocaleMessage(locale, response)
  //       })
  //   }
  // },
  data () {
    return {
      initWindowWidth: null,
      initWindowHeight: null,
      notModals: [
        'internalTransfer',
        'notifications',
        'copyActionTrader',
        'registrationPage',
        'loginPage',
        'withdrawalRequest',
        'depositRequest',
        'affiliateCalculator',
        'affiliateTransfer'
      ]
    }
  },
  computed: {
    form () {
      return this.$store.getters['forms/getters/handler/getForm']
    },
    formTitle () {
      return this.$store.getters['forms/getters/handler/getFormTitle']
    },
    bottomSidebarIsVisible () {
      return this.$store.getters['dictionaries/getters/handler/getBottomSidebarIsVisible']
    },
    headerIsHidden () {
      return this.$store.getters['dictionaries/getters/handler/getHeaderIsHidden']
    },
    dir () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode'] ? 'rtl' : 'ltr'
    },
    routePath () {
      return this.$store.getters['dictionaries/getters/handler/getRoute'].path
    },
    routePages () {
      return this.$store.getters['dictionaries/getters/handler/getRoutePages']
    },
    isPartnerMode () {
      return this.$store.getters['partners/getters/handler/getIsPartnerMode']
    },
    isModalShown () {
      return this.$store.getters['dictionaries/getters/handler/getIsModalShown']
    },
    isPopupShown () {
      return this.$store.getters['dictionaries/getters/handler/getIsPopupShown']
    },
    isSearchPopupShown () {
      return this.$store.getters['dictionaries/getters/handler/getIsSearchPopupShown']
    },
    isTradeOpenShown () {
      return this.$store.getters['dictionaries/getters/handler/getIsTradeOpenShown']
    },
    isTradeCloseShown () {
      return this.$store.getters['dictionaries/getters/handler/getIsTradeCloseShown']
    }
  },
  watch: {
    initWindowWidth (newValue) {
      this.setWindowWidth(newValue)
    },
    initWindowHeight (newValue) {
      this.setWindowHeight(newValue)
    },
    $route: {
      handler (newValue) {
        this.saveRoute(newValue)
      },
      deep: true
    },
    isPreloaderShown (newValue) {
      this.togglePreloader(newValue)
    },
    isPopupShown (newValue) {
      this.togglePopup(newValue)
    },
    form: {
      handler (newValue) {
        if (!this.notModals.includes(this.formTitle)) {
          this.toggleModal(newValue.length)
        }
      },
      deep: true
    },
    isEuCountry (newValue, oldValue) {
      if (newValue !== oldValue) {
        this.togglePopup(true)
      }
    }
  },
  created () {
    this.appAuth()
  },
  mounted () {
    this.sizeControl()
  },
  methods: {
    togglePreloader (value) {
      value ? this.$bvModal.show('lfx-preloader') : this.$bvModal.hide('lfx-preloader')
    },
    togglePopup (value) {
      this.$store.commit('dictionaries/mutations/handler/TOGGLE_POPUP', {
        rootData: this.$store.state.dictionaries.state.handler,
        data: value
      })
    },
    toggleModal (value) {
      this.$store.commit('dictionaries/mutations/handler/TOGGLE_MODAL', {
        rootData: this.$store.state.dictionaries.state.handler,
        data: !!value
      })
    },
    saveRoute (route) {
      this.$store.commit('dictionaries/mutations/handler/SAVE_ROUTE', {
        rootData: this.$store.state.dictionaries.state.handler,
        data: { path: route.path, query: route.query }
      })
    },
    setWindowWidth (value) {
      this.$store.commit('dictionaries/mutations/handler/SET_CURRENT_WINDOW_WIDTH', {
        rootData: this.$store.state.dictionaries.state.handler,
        data: value
      })
    },
    setWindowHeight (value) {
      this.$store.commit('dictionaries/mutations/handler/SET_CURRENT_WINDOW_HEIGHT', {
        rootData: this.$store.state.dictionaries.state.handler,
        data: value
      })
    },
    setScrollBottomValue (mainPage) {
      this.$store.commit('dictionaries/mutations/handler/SAVE_SCROLL_BOTTOM_VALUE', {
        rootData: this.$store.state.dictionaries.state.handler,
        data: mainPage.scrollHeight - mainPage.scrollTop - mainPage.clientHeight
      })
    },
    fetchGuestUser () {
      this.$store.dispatch('dictionaries/actions/auth/fetchGuestUser')
    },
    fetchRealUser () {
      this.$store.dispatch('dictionaries/actions/auth/fetchRealUser')
    },
    appAuth () {
      let token = localStorage.getItem('user_token')

      if (!token) {
        localStorage.setItem('user_token', this.guestUserToken)
      }

      token = localStorage.getItem('user_token')

      this.saveRoute(this.$route)

      token === '00000000000000000000000000000000' ? this.fetchGuestUser() : this.fetchRealUser()

      this.fetchTranslates(this.routePages.locale)
    },
    sizeControl () {
      const mainPage = document.getElementById('main-page') || { scrollHeight: 0, scrollTop: 0, clientHeight: 0 }
      mainPage.onscroll = () => this.setScrollBottomValue(mainPage)

      this.setWindowWidth(window.innerWidth)
      this.setWindowHeight(window.innerHeight)

      window.onresize = () => {
        this.initWindowWidth = window.innerWidth
        this.initWindowHeight = window.innerHeight
      }
    },
    fetchTranslates (locale) {
      this.$axios.$get('https://api.liteforex.com/js/locales/cabinet-en.json')
        .then((response) => {
          this.$i18n.setLocaleMessage('en', response)
        })
      if (locale !== 'en') {
        this.$axios.$get(`https://api.liteforex.com/js/locales/cabinet-${locale}.json`)
          .then((response) => {
            this.$i18n.setLocaleMessage(locale, response)
          })
      }
    }
  }
}
</script>
<style lang="scss">
@import '../assets/scss/app.scss';
</style>
