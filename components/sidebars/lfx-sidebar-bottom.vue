<template>
  <div class="d-flex flex-column">
    <div
      v-show="windowWidth === 'sm'"
      id="mobile_container"
      class="main-page-bottom_sidebar_mobile"
      :class="[isChartShown ? '-chart_shown' : '', user.mode === 2 ? '-partner' : '-trading']"
    >
      <lfx-sidebar-bottom-mobile-partner-info v-if="user.mode === 2" :is-sidebar-shown="isMobileSidebarShown" />
      <lfx-sidebar-bottom-mobile-info v-else :is-sidebar-shown="isMobileSidebarShown" @click.native="toggleMobileSidebarShowing" />
      <lfx-sidebar-bottom-mobile-portfolio v-if="user.mode !== 2" @hide-sidebar="hideMobileSidebar" />
    </div>
    <div v-show="windowWidth !== 'sm'" class="main-page-bottom_sidebar">
      <lfx-sidebar-bottom-portfolio v-if="user.mode !== 2" />
      <lfx-sidebar-bottom-partner-info v-if="user.mode === 2" />
      <lfx-sidebar-bottom-info v-else />
    </div>
  </div>
</template>

<script>
import LfxSidebarBottomMobileInfo from '~/components/sidebars/components/bottom/mobile/lfx-sidebar-bottom-mobile-info'
import LfxSidebarBottomMobilePortfolio from '~/components/sidebars/components/bottom/mobile/lfx-sidebar-bottom-mobile-portfolio'
import LfxSidebarBottomInfo from '~/components/sidebars/components/bottom/lfx-sidebar-bottom-info'
import LfxSidebarBottomPortfolio from '~/components/sidebars/components/bottom/lfx-sidebar-bottom-portfolio'
import LfxSidebarBottomPartnerInfo from '~/components/sidebars/components/bottom/lfx-sidebar-bottom-partner-info'
import LfxSidebarBottomMobilePartnerInfo from '~/components/sidebars/components/bottom/mobile/lfx-sidebar-bottom-mobile-partner-info'
export default {
  name: 'LfxSidebarBottom',
  components: {
    LfxSidebarBottomMobilePartnerInfo,
    LfxSidebarBottomPartnerInfo,
    LfxSidebarBottomMobileInfo,
    LfxSidebarBottomMobilePortfolio,
    LfxSidebarBottomInfo,
    LfxSidebarBottomPortfolio
  },
  data () {
    return {
      isMobileSidebarShown: false
    }
  },
  computed: {
    user () {
      return this.$store.getters['dictionaries/getters/user/getUser']
    },
    windowWidth () {
      return this.$store.getters['dictionaries/getters/handler/getCurrentWindowWidth']
    },
    isChartShown () {
      return this.$store.getters['dictionaries/getters/handler/getIsChartShown']
    },
    partnerValues () {
      return this.$store.getters['partners/getters/handler/getPartnerValues']
    }
  },
  methods: {
    hideMobileSidebar () {
      this.isMobileSidebarShown = false
    },
    toggleMobileSidebarShowing () {
      this.isMobileSidebarShown = !this.isMobileSidebarShown
    }
  }
}
</script>
