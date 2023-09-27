<template>
  <div class="main-page-bottom_sidebar_mobile-container">
    <div class="main-page-bottom_sidebar_mobile-container-table">
      <lfx-table-bottom-sidebar v-if="portfolio.length" source="mobile" :items="portfolio" />
    </div>
    <span
      v-if="isAuthUser || isDemoTour"
      class="main-page-bottom_sidebar-table-trades_history"
      @click="openTradesHistory()"
      v-text="$t('История торговли')"
    />
  </div>
</template>

<script>
import LfxTableBottomSidebar from '~/components/tables/lfx-table-bottom-sidebar'
export default {
  name: 'LfxSidebarBottomMobilePortfolio',
  components: { LfxTableBottomSidebar },
  computed: {
    portfolio () {
      return this.$store.getters['trading/getters/trading/getAccountPortfolio']
    },
    routePages () {
      return this.$store.getters['dictionaries/getters/handler/getRoutePages']
    },
    isDemoTour () {
      return this.$store.getters['dictionaries/getters/user/isDemoTour']
    },
    isAuthUser () {
      return this.$store.getters['dictionaries/getters/user/getIsAuthUser']
    }
  },
  methods: {
    openTradesHistory () {
      this.$router.push(`/${this.routePages.locale}/profile/trades-history`)
      this.$store.dispatch('profile/actions/handler/fetchProfileTradesHistory')
      this.$store.commit('dictionaries/mutations/handler/SET_ACTIVE_MENU_ITEM', {
        rootData: this.$store.state.dictionaries.state.handler,
        data: 'trades-history'
      })
      this.$emit('hide-sidebar')
    }
  }
}
</script>
