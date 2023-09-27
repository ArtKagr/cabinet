<template>
  <div class="main-page-bottom_sidebar-info-item">
    <div class="d-flex align-items-center mb-1">
      <bdi class="line-height-1">
        <lfx-icon-three-dots
          v-if="account.currency === null"
          style="width: 50px;"
          :mode="isDemo || isAuthUserDemo ? 'dark' : 'light'"
        />
        <span
          v-else
          class="main-page-bottom_sidebar-info-item-value"
          :class="[`-${dir}`, isDemo || isAuthUserDemo ? '-demo' : '', profitClass]"
          v-text="currentValue"
        />
        <span
          class="main-page-bottom_sidebar-info-item-value ml-1"
          :class="[`-${dir}`, isDemo || isAuthUserDemo ? '-demo' : '', profitClass]"
          v-text="account.currency || 'USD'"
        />
      </bdi>
    </div>
    <div v-if="source === 'hold'" class="d-flex align-items-center">
      <span class="main-page-bottom_sidebar-info-item-label" :class="`-${dir}`" v-text="title" />
      <lfx-icon-help2 class="hold-informer" :class="`-${dir}`" @click.native="openHoldInformer" />
    </div>
    <span v-else class="main-page-bottom_sidebar-info-item-label" :class="`-${dir}`" v-text="title" />
  </div>
</template>

<script>
import LfxIconThreeDots from '~/components/icons/lfx-icon-three-dots'
import LfxIconHelp2 from '~/components/icons/lfx-icon-help-2'
export default {
  name: 'LfxSidebarBottomInfoValue',
  components: { LfxIconHelp2, LfxIconThreeDots },
  props: {
    value: {
      type: Number,
      default: null
    },
    title: {
      type: String,
      default: null
    },
    profitClass: {
      type: String,
      default: ''
    },
    source: {
      type: String,
      default: null
    }
  },
  computed: {
    account () {
      return this.$store.getters['trading/getters/trading/getAccount']
    },
    isRtlMode () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode']
    },
    dir () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode'] ? 'rtl' : 'ltr'
    },
    isDemo () {
      return this.$store.getters['dictionaries/getters/user/getIsDemo']
    },
    isAuthUser () {
      return this.$store.getters['dictionaries/getters/user/getIsAuthUser']
    },
    isAuthUserDemo () {
      return this.$store.getters['dictionaries/getters/user/getIsAuthUserDemo']
    },
    currentValue () {
      return `${this.source === 'profit' && this.value > 0 ? '+' : ''}${this.$numberFormat(this.value)}`
    }
  },
  methods: {
    openHoldInformer () {
      this.$emit('open-hold-informer')
    }
  }
}
</script>
<style lang="scss">
  .hold-informer {
    width: 15px;
    height: 15px;
    cursor: pointer;
    color: #8e9aac;

    &.-ltr {
      margin-left: 6px;
    }

    &.-rtl {
      margin-right: 6px;
    }
  }
</style>
