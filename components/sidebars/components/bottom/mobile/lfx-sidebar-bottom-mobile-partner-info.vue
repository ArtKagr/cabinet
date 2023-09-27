<template>
  <div class="main-page-bottom_sidebar_mobile-info" :class="[isDemo || isAuthUserDemo ? '-demo' : '', isSidebarShown ? '-shown' : '']">
    <div class="d-flex align-items-center">
      <lfx-sidebar-bottom-mobile-info-value v-model="partnerValues.available" :class="isRtlMode ? 'mr-3' : 'ml-3'" />
    </div>
    <div class="d-flex align-items-center">
      <lfx-sidebar-bottom-mobile-info-value v-model="partnerValues.accrued_today" :profit-class="accruedTodayClass" />
      <div class="main-page-bottom_sidebar_mobile-info-menu" :class="[`-${dir}`, isDemo || isAuthUserDemo ? '-demo' : '']" @click="openDeposit">
        <lfx-icon-deposit :is-demo="isDemo || isAuthUserDemo" style="width: 24px; height: 24px;" />
      </div>
    </div>
  </div>
</template>

<script>
import LfxIconDeposit from '~/components/sidebars/icons/lfx-icon-deposit'
import LfxSidebarBottomMobileInfoValue from '~/components/sidebars/components/bottom/mobile/lfx-sidebar-bottom-mobile-info-value'
export default {
  name: 'LfxSidebarBottomMobilePartnerInfo',
  components: {
    LfxIconDeposit,
    LfxSidebarBottomMobileInfoValue
  },
  props: {
    isSidebarShown: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      mobileContainer: null,
      openedSidebarPosition: 'translateY(0)',
      chartSidebarPosition: 'translateY(calc(100% - 40px))',
      sidebarPosition: 'translateY(calc(100% - 101px))'
    }
  },
  computed: {
    user () {
      return this.$store.getters['dictionaries/getters/user/getUser']
    },
    routePages () {
      return this.$store.getters['dictionaries/getters/handler/getRoutePages']
    },
    isDemo () {
      return this.$store.getters['dictionaries/getters/user/getIsDemo']
    },
    isAuthUserDemo () {
      return this.$store.getters['dictionaries/getters/user/getIsAuthUserDemo']
    },
    accountBalance () {
      return this.$store.getters['trading/getters/trading/getAccountBalance']
    },
    accountProfit () {
      return this.$store.getters['trading/getters/trading/getAccountProfit']
    },
    profitClass () {
      return this.accountProfit > 0 ? '-profit' : this.accountProfit === 0 ? '' : '-loss'
    },
    accruedTodayClass () {
      return this.partnerValues.accrued_today > 0 ? '-profit' : this.partnerValues.accrued_today === 0 ? '' : '-loss'
    },
    isRtlMode () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode']
    },
    dir () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode'] ? 'rtl' : 'ltr'
    },
    isChartShown () {
      return this.$store.getters['dictionaries/getters/handler/getIsChartShown']
    },
    partnerValues () {
      return this.$store.getters['partners/getters/handler/getPartnerValues']
    }
  },
  watch: {
    isSidebarShown (newValue) {
      switch (newValue) {
        case true:
          this.mobileContainer.style.transform = this.openedSidebarPosition
          break
        case false:
          this.setSidebarPosition(this.isChartShown)
          break
      }
    },
    isChartShown (newValue) {
      this.setSidebarPosition(newValue)
    }
  },
  mounted () {
    this.mobileContainer = document.querySelector('#mobile_container')

    this.setSidebarPosition(this.isChartShown)
  },
  methods: {
    openDeposit (e) {
      e.stopPropagation()
      this.$router.push(`/${this.routePages.locale}/finance/deposit`)
      this.$store.commit('dictionaries/mutations/handler/SAVE_ACTIVE_MAIN_MENU_BUTTON', {
        rootData: this.$store.state.dictionaries.state.handler,
        data: 'finance'
      })
    },
    setSidebarPosition (value) {
      switch (value) {
        case true:
          this.mobileContainer.style.transform = this.chartSidebarPosition
          break
        case false:
          this.mobileContainer.style.transform = this.sidebarPosition
          break
      }
    }
  }
}
</script>
