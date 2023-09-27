<template>
  <b-sidebar
    id="main-sidebar"
    class="main-page-sidebar"
    no-close-on-esc
    no-enforce-focus
    :visible="windowWidth !== 'sm'"
    :backdrop="windowWidth === 'sm'"
    :no-close-on-route-change="windowWidth !== 'sm'"
    backdrop-variant="inherit"
    no-header
    :right="isRtlMode"
    lazy
  >
    <template #default>
      <div class="d-flex flex-column h-100">
        <div class="main-sidebar-logo" :class="`-${dir}`">
          <div v-if="windowWidth === 'sm'" class="main-sidebar-logo-container" @click="goToMainPage">
            <lfx-icon-logo-full v-if="isEuCountry || user.is_eu" class="main-sidebar-logo-container-full" />
            <lfx-icon-logo-litefinance-full v-else class="main-sidebar-logo-container-full" />
          </div>
          <div v-else @click="goToMainPage">
            <lfx-icon-logo v-if="isEuCountry || user.is_eu" />
            <lfx-icon-logo-litefinance v-else />
          </div>
        </div>
        <div v-if="isPartnerMode" class="main-page-sidebar-buttons">
          <div
            v-for="(button, key) in partnerMenu"
            :key="key"
            class="main-page-sidebar-buttons-button"
            :class="[getActiveButton(button.flag), button.flag === 'trading' ? '-trading' : '']"
            @click="setActiveButton(button.flag)"
          >
            <div v-if="windowHeight > 620" class="main-page-sidebar-buttons-button-icon">
              <lfx-icon-menu-campaigns v-if="button.flag === 'affiliate-campaigns'" class="main-page-sidebar-buttons-button-icon-campaigns" />
              <lfx-icon-menu-promo v-else-if="button.flag === 'affiliate-promo'" class="main-page-sidebar-buttons-button-icon-promo" />
              <lfx-icon-menu-programs v-else-if="button.flag === 'affiliate-index'" class="main-page-sidebar-buttons-button-icon-programs" />
              <lfx-icon-finance v-else-if="button.flag === 'finance'" class="main-page-sidebar-buttons-button-icon-finance" />
              <lfx-icon-menu-calculator v-else-if="button.flag === 'affiliate-calculator'" class="main-page-sidebar-buttons-button-icon-finance" />
              <lfx-icon-menu-contests v-else-if="button.flag === 'affiliate-contests'" class="main-page-sidebar-buttons-button-icon-contests" />
              <lfx-icon-trade v-else-if="button.flag === 'trading'" class="main-page-sidebar-buttons-button-icon-trade" />
            </div>
            <span class="main-page-sidebar-buttons-button-text" :class="`-${dir}`" v-text="button.title" />
          </div>
        </div>
        <div v-else class="main-page-sidebar-buttons">
          <div
            v-for="(button, key) in mainMenu"
            :key="key"
            class="main-page-sidebar-buttons-button"
            :class="[getActiveButton(button.flag), button.flag === 'partner' ? '-partner' : '']"
            @click="setActiveButton(button.flag)"
          >
            <div v-if="windowHeight > 620" class="main-page-sidebar-buttons-button-icon">
              <lfx-icon-trade v-if="button.flag === 'trading'" class="main-page-sidebar-buttons-button-icon-trade" />
              <lfx-icon-traders v-else-if="button.flag === 'traders'" class="main-page-sidebar-buttons-button-icon-traders" />
              <lfx-icon-analytics v-else-if="button.flag === 'analytics'" class="main-page-sidebar-buttons-button-icon-analytics" />
              <lfx-icon-profile v-else-if="button.flag === 'profile'" class="main-page-sidebar-buttons-button-icon-profile" />
              <lfx-icon-finance v-else-if="button.flag === 'finance'" class="main-page-sidebar-buttons-button-icon-finance" />
              <lfx-icon-education v-else-if="button.flag === 'education'" class="main-page-sidebar-buttons-button-icon-education" />
              <lfx-icon-metatrader v-else-if="button.flag === 'mt'" class="main-page-sidebar-buttons-button-icon-metatrader" />
              <lfx-icon-partner v-else-if="button.flag === 'partner'" class="main-page-sidebar-buttons-button-icon-partner" />
              <lfx-icon-bets v-else-if="button.flag === 'bet'" class="main-page-sidebar-buttons-button-icon-bets" />
            </div>
            <span class="main-page-sidebar-buttons-button-text" :class="`-${dir}`" v-text="button.title" />
          </div>
        </div>
        <div v-if="windowWidth === 'sm'" class="main-page-sidebar-menu">
          <div v-if="[0, 1].includes(user.mode)" class="main-page-sidebar-menu-button">
            <template v-if="isAuthUser">
              <b-button v-if="user.mode === 0" variant="dark-primary" @click="switchRealUserMode('real')" v-text="$t('Включить реальную торговлю')" />
              <b-button v-else variant="primary" @click="switchRealUserMode('demo')" v-text="$t('Включить демо торговлю')" />
            </template>
            <b-button v-else variant="dark-primary" @click="openLogoPage" v-text="$t('Включить реальную торговлю')" />
          </div>
          <div v-if="isAuthUser" class="main-page-sidebar-menu-logout" @click="logout">
            <lfx-icon-logout class="main-page-sidebar-menu-logout-logo" :class="`-${dir}`" />
            <span class="main-page-sidebar-menu-logout-text" v-text="$t('Выйти')" />
          </div>
        </div>
      </div>
    </template>
  </b-sidebar>
</template>

<script>
import LfxIconTrade from '~/components/sidebars/icons/lfx-icon-trade'
import LfxIconTraders from '~/components/sidebars/icons/lfx-icon-traders'
import LfxIconAnalytics from '~/components/sidebars/icons/lfx-icon-analytics'
import LfxIconProfile from '~/components/sidebars/icons/lfx-icon-profile'
import LfxIconFinance from '~/components/sidebars/icons/lfx-icon-finance'
import LfxIconEducation from '~/components/sidebars/icons/lfx-icon-education'
import LfxIconMetatrader from '~/components/sidebars/icons/lfx-icon-metatrader'
import LfxIconPartner from '~/components/sidebars/icons/lfx-icon-partner'
import LfxIconLogo from '~/components/header/icons/lfx-icon-logo'
import LfxIconLogoLitefinance from '~/components/header/icons/lfx-icon-logo-litefinance'
import LfxIconLogoFull from '~/components/header/icons/lfx-icon-logo-full'
import LfxIconLogoLitefinanceFull from '~/components/header/icons/lfx-icon-logo-litefinance-full'
// import LfxIconMenu from '~/components/header/icons/lfx-icon-menu'
import LfxIconMenuCampaigns from '~/components/icons/lfx-icon-menu-campaigns'
import LfxIconMenuPromo from '~/components/icons/lfx-icon-menu-promo'
import LfxIconMenuPrograms from '~/components/icons/lfx-icon-menu-programs'
import LfxIconMenuCalculator from '~/components/icons/lfx-icon-menu-calculator'
import LfxIconMenuContests from '~/components/icons/lfx-icon-menu-contests'
import LfxIconBets from '~/components/sidebars/icons/lfx-icon-bets'
import LfxIconLogout from '~/components/header/icons/lfx-icon-logout'
export default {
  name: 'LfxSidebarMenu',
  components: {
    LfxIconLogout,
    LfxIconBets,
    LfxIconLogoLitefinanceFull,
    LfxIconLogoLitefinance,
    LfxIconMenuContests,
    LfxIconMenuCalculator,
    LfxIconMenuPrograms,
    LfxIconMenuPromo,
    LfxIconMenuCampaigns,
    LfxIconTrade,
    LfxIconTraders,
    LfxIconAnalytics,
    LfxIconProfile,
    LfxIconFinance,
    LfxIconEducation,
    LfxIconMetatrader,
    LfxIconPartner,
    LfxIconLogo,
    LfxIconLogoFull
    // LfxIconMenu
  },
  computed: {
    routePages () {
      return this.$store.getters['dictionaries/getters/handler/getRoutePages']
    },
    isDemo () {
      return this.$store.getters['dictionaries/getters/user/getIsDemo']
    },
    isAuthUser () {
      return this.$store.getters['dictionaries/getters/user/getIsAuthUser']
    },
    user () {
      return this.$store.getters['dictionaries/getters/user/getUser']
    },
    windowWidth () {
      return this.$store.getters['dictionaries/getters/handler/getCurrentWindowWidth']
    },
    isRtlMode () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode']
    },
    dir () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode'] ? 'rtl' : 'ltr'
    },
    windowHeight () {
      return this.$store.getters['dictionaries/getters/handler/getCurrentWindowHeight']
    },
    isPartnerMode () {
      return this.$store.getters['partners/getters/handler/getIsPartnerMode']
    },
    isEuCountry () {
      return this.$store.getters['forms/getters/handler/getIsEuCountry']
    },
    partnerValues () {
      return this.$store.getters['partners/getters/handler/getPartnerValues']
    },
    activeButton () {
      return this.$store.getters['dictionaries/getters/handler/getActiveMainMenuButton']
    },
    mainMenu () {
      return [
        { flag: 'trading', title: this.$t('Торговать'), default: 'currency', realView: true, demoView: true },
        { flag: 'traders', title: this.$t('Копировать'), default: 'total-equity', realView: true, demoView: true },
        { flag: 'analytics', title: this.$t('Аналитика'), default: null, realView: true, demoView: false },
        { flag: 'profile', title: this.$t('Профиль'), default: null, realView: true, demoView: false },
        { flag: 'finance', title: this.$t('Финансы'), default: null, realView: true, demoView: true },
        { flag: 'education', title: this.$t('Обучение'), default: null, realView: true, demoView: true },
        { flag: 'mt', title: this.$t('MetaTrader'), default: null, realView: true, demoView: false },
        { flag: 'partner', title: this.$t('Партнерам'), default: null, realView: true, demoView: false },
        { flag: 'bet', title: this.$t('Ставки'), default: null, realView: false, demoView: true }
      ].filter((menuItem) => {
        if (this.$store.getters['dictionaries/getters/user/getIsAuthUser']) {
          if ([1, 2].includes(this.user.mode)) {
            if (menuItem.flag === 'partner') {
              return !this.user.is_eu
            }

            return menuItem.realView
          }

          return !(menuItem.flag === 'partner' && this.user.is_eu)
        } else {
          return menuItem.demoView
        }
      })
    },
    partnerMenu () {
      return [
        { flag: 'affiliate-campaigns', title: this.$t('Кампании'), default: null, demoView: false },
        { flag: 'affiliate-promo', title: this.$t('Промо'), default: null, demoView: false },
        { flag: 'affiliate-index', title: this.$t('Программы'), default: null, demoView: false },
        { flag: 'finance', title: this.$t('Финансы'), default: null, demoView: true },
        { flag: 'affiliate-calculator', title: this.$t('Калькулятор'), default: null, demoView: false },
        { flag: 'affiliate-contests', title: this.$t('Конкурсы'), default: null, demoView: false },
        { flag: 'trading', title: this.$t('Торговать'), default: null, demoView: false }
      ].filter((menuItem) => {
        if (menuItem.flag === 'affiliate-index' && !this.partnerValues.is_programs) {
          return false
        }
        if (menuItem.flag === 'affiliate-contests' && !this.partnerValues.is_show_contests) {
          return false
        }

        return true
      })
    }
  },
  watch: {
    isPartnerMode (newValue) {
      this.$store.commit('dictionaries/mutations/handler/SAVE_ACTIVE_MAIN_MENU_BUTTON', {
        rootData: this.$store.state.dictionaries.state.handler,
        data: newValue ? this.routePages.parent || this.routePages.current || 'affiliate-campaigns' : 'trading'
      })
    }
  },
  mounted () {
    this.$store.commit('dictionaries/mutations/handler/SAVE_ACTIVE_MAIN_MENU_BUTTON', {
      rootData: this.$store.state.dictionaries.state.handler,
      data: this.routePages.parent || this.routePages.current
    })
  },
  methods: {
    deleteAccountCurrency () {
      this.$store.commit('trading/mutations/socket/account/DELETE_ACCOUNT_CURRENCY', {
        rootData: this.$store.state.trading.state.handler
      })
    },
    switchRealUserMode (type) {
      this.deleteAccountCurrency()
      this.$store.dispatch('dictionaries/actions/auth/switchRealUserMode', type)
    },
    logout () {
      this.deleteAccountCurrency()
      this.$store.dispatch('dictionaries/actions/auth/logout')
    },
    openLogoPage () {
      this.$router.push(`/${this.routePages.locale}/login`)
    },
    getActiveButton (flag) {
      return this.activeButton === flag ? '-active' : ''
    },
    setActiveButton (flag) {
      if (this.isDemo && flag === 'finance') {
        this.$store.dispatch('dictionaries/actions/handler/showPopup', 'demo-real')
      } else {
        this.$store.commit('dictionaries/mutations/handler/SAVE_ACTIVE_MAIN_MENU_BUTTON', {
          rootData: this.$store.state.dictionaries.state.handler,
          data: flag
        })
      }
      switch (flag) {
        case 'trading':
          this.$router.push(`/${this.routePages.locale}/trading/currency`)
          this.$store.commit('dictionaries/mutations/handler/SET_ACTIVE_MENU_ITEM', {
            rootData: this.$store.state.dictionaries.state.handler,
            data: 'currency'
          })
          if (this.isPartnerMode) {
            this.$store.dispatch('dictionaries/actions/auth/switchRealUserMode', 'real')
          }
          break
        case 'traders':
          this.$router.push(`/${this.routePages.locale}/traders/total-equity`)
          this.$store.commit('dictionaries/mutations/handler/SET_ACTIVE_MENU_ITEM', {
            rootData: this.$store.state.dictionaries.state.handler,
            data: 'total-equity'
          })
          break
        case 'finance':
          if (this.isAuthUser) {
            this.$router.push(`/${this.routePages.locale}/finance/deposit`)
          }
          break
        case 'education':
          this.$router.push(`/${this.routePages.locale}/education/lessons`)
          break
        case 'partner':
          this.$store.dispatch('partners/actions/handler/switchPartner')
          this.$router.push(`/${this.routePages.locale}`)
          break
        case 'bet':
          break
        default:
          this.$router.push(`/${this.routePages.locale}/${flag}`)
      }
    },
    goToMainPage () {
      this.$router.push(`/${this.routePages.locale}`)
    }
  }
}
</script>
