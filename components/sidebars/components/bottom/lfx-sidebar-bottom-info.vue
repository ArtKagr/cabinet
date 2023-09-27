<template>
  <div class="main-page-bottom_sidebar-info" :class="isDemo || isAuthUserDemo ? '-demo' : ''">
    <lfx-sidebar-bottom-info-value v-model="accountBalance" class="mx-4" :title="$t('Всего капитал')" />
    <template v-if="windowWidth === 'xl' || windowWidth === 'lg'">
      <lfx-sidebar-bottom-info-value v-model="accountInvolvedFunds" class="mx-4" :title="$t('Задействовано средств')" />
      <lfx-sidebar-bottom-info-value v-if="!isAuthUserDemo" v-model="accountAvailableFunds" class="mx-4" :title="$t('Доступно для операций')" />
    </template>
    <lfx-sidebar-bottom-info-value v-model="accountProfit" source="profit" :class="`-flex-${dir}`" :title="$t('Текущее изменение')" :profit-class="profitClass" />
    <b-button
      :class="isRtlMode ? 'ml-4' : 'mr-4'"
      :variant="isDemo || isAuthUserDemo ? 'primary' : 'outline-primary -white'"
      @click="openDepositPage"
      v-text="$t('Пополнение')"
    />
    <b-button
      v-if="isAuthUser || isDemoTour"
      :variant="isDemo || isAuthUserDemo ? 'dark-primary' : 'outline-primary -white'"
      @click="openWithdrawalPage"
      v-text="$t('Вывод')"
    />
  </div>
</template>

<script>
import LfxSidebarBottomInfoValue from '@/components/sidebars/components/bottom/lfx-sidebar-bottom-info-value'
export default {
  name: 'LfxSidebarBottomInfo',
  components: { LfxSidebarBottomInfoValue },
  computed: {
    routePages () {
      return this.$store.getters['dictionaries/getters/handler/getRoutePages']
    },
    dir () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode'] ? 'rtl' : 'ltr'
    },
    isAuthUser () {
      return this.$store.getters['dictionaries/getters/user/getIsAuthUser']
    },
    isDemoTour () {
      return this.$store.getters['dictionaries/getters/user/isDemoTour']
    },
    isRtlMode () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode']
    },
    windowWidth () {
      return this.$store.getters['dictionaries/getters/handler/getCurrentWindowWidth']
    },
    isAuthUserDemo () {
      return this.$store.getters['dictionaries/getters/user/getIsAuthUserDemo']
    },
    isDemo () {
      return this.$store.getters['dictionaries/getters/user/getIsDemo']
    },
    accountBalance () {
      return this.$store.getters['trading/getters/trading/getAccountBalance']
    },
    accountInvolvedFunds () {
      return this.$store.getters['trading/getters/trading/getAccountInvolvedFunds']
    },
    accountAvailableFunds () {
      return this.$store.getters['trading/getters/trading/getAccountAvailableFunds']
    },
    accountProfit () {
      return this.$store.getters['trading/getters/trading/getAccountProfit']
    },
    profitClass () {
      return this.accountProfit > 0 ? '-profit' : this.accountProfit === 0 ? '' : '-loss'
    }
  },
  methods: {
    openDepositPage () {
      if (this.isDemo || this.isAuthUserDemo) {
        this.$store.dispatch('dictionaries/actions/handler/showPopup', 'demo-real')
      } else {
        this.$router.push(`/${this.routePages.locale}/finance/deposit`)
        this.$store.commit('dictionaries/mutations/handler/SAVE_ACTIVE_MAIN_MENU_BUTTON', {
          rootData: this.$store.state.dictionaries.state.handler,
          data: 'finance'
        })
      }
    },
    openWithdrawalPage () {
      this.$router.push(`/${this.routePages.locale}/finance/withdrawal`)
      this.$store.commit('dictionaries/mutations/handler/SAVE_ACTIVE_MAIN_MENU_BUTTON', {
        rootData: this.$store.state.dictionaries.state.handler,
        data: 'finance'
      })
    }
  }
}
</script>
