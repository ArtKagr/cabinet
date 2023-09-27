<template>
  <div class="main-page-bottom_sidebar_mobile-info-item">
    <lfx-icon-three-dots v-if="account.currency === null" style="width: 30px;" :mode="isDemo || isAuthUserDemo ? 'dark' : 'light'" />
    <span
      v-else
      class="main-page-bottom_sidebar_mobile-info-item-value"
      :class="[`-${dir}`, isDemo || isAuthUserDemo ? '-demo' : '', profitClass]"
      v-text="`${currentValue} ${account.currency}`"
    />
  </div>
</template>

<script>
import LfxIconThreeDots from '~/components/icons/lfx-icon-three-dots.vue'

export default {
  name: 'LfxSidebarBottomMobileInfoValue',
  components: { LfxIconThreeDots },
  props: {
    value: {
      type: Number,
      default: null
    },
    profitClass: {
      type: String,
      default: ''
    }
  },
  computed: {
    account () {
      return this.$store.getters['trading/getters/trading/getAccount']
    },
    currentValue () {
      const data = this.profitClass ? this.value > 0 ? '+' : '' : ''
      const result = this.$numberFormat(this.value)
      return this.isRtlMode
        ? this.profitClass ? result.split(' ').reverse().join(' ') + data : result.split(' ').reverse().join(' ')
        : this.profitClass ? data + result : result
    },
    isDemo () {
      return this.$store.getters['dictionaries/getters/user/getIsDemo']
    },
    isAuthUserDemo () {
      return this.$store.getters['dictionaries/getters/user/getIsAuthUserDemo']
    },
    dir () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode'] ? 'rtl' : 'ltr'
    }
  }
}
</script>
