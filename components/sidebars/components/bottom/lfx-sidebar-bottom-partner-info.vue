<template>
  <div class="main-page-bottom_sidebar-info" :class="isDemo || isAuthUserDemo ? '-demo' : ''">
    <lfx-sidebar-bottom-info-value
      v-model="partnerValues.available"
      class="mx-4"
      :title="$t('Доступно для вывода')"
    />
    <template v-if="windowWidth === 'xl' || windowWidth === 'lg'">
      <lfx-sidebar-bottom-info-value
        v-if="partnerValues.hold > 0"
        v-model="partnerValues.hold"
        class="mx-4"
        :source="partnerValues.is_hold_informer ? 'hold' : null"
        :title="$t('Холд')"
        @open-hold-informer="openHoldInformer"
      />
      <lfx-sidebar-bottom-info-value
        v-model="partnerValues.total_commission"
        class="mx-4"
        :title="$t('Всего комиссия')"
      />
    </template>
    <lfx-sidebar-bottom-info-value
      v-model="partnerValues.accrued_today"
      :class="`-flex-${dir}`"
      source="profit"
      :title="$t('Начислено сегодня')"
      :profit-class="profitClass"
    />
    <b-button
      :variant="isDemo || isAuthUserDemo ? 'dark-primary' : 'outline-primary -white'"
      @click="openWithdrawalPage"
      v-text="$t('Вывод')"
    />
  </div>
</template>

<script>
import LfxSidebarBottomInfoValue from '~/components/sidebars/components/bottom/lfx-sidebar-bottom-info-value'
export default {
  name: 'LfxSidebarBottomPartnerInfo',
  components: { LfxSidebarBottomInfoValue },
  data () {
    return {
      available: 0
    }
  },
  computed: {
    routePages () {
      return this.$store.getters['dictionaries/getters/handler/getRoutePages']
    },
    dir () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode'] ? 'rtl' : 'ltr'
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
    partnerValues () {
      return this.$store.getters['partners/getters/handler/getPartnerValues']
    },
    profitClass () {
      return this.partnerValues.accrued_today > 0 ? '-profit' : this.partnerValues.accrued_today === 0 ? '' : '-loss'
    }
  },
  methods: {
    openWithdrawalPage () {
      this.$router.push(`/${this.routePages.locale}/finance/withdrawal`)
      this.$store.commit('dictionaries/mutations/handler/SAVE_ACTIVE_MAIN_MENU_BUTTON', {
        rootData: this.$store.state.dictionaries.state.handler,
        data: 'finance'
      })
    },
    openHoldInformer () {
      this.$store.dispatch('partners/actions/handler/fetchPartnerHoldInformer')
    }
  }
}
</script>
