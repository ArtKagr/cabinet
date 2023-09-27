<template>
  <div v-if="isHeaderShown" :class="[`header -default_page-${dir}`, windowWidth === 'sm' ? '-mobile' : '']">
    <div v-if="isMobileSearchHidden" class="header-logo" :class="[`-${dir}`, windowWidth === 'sm' ? '-mobile' : '']" @click="hideChat()">
      <b-icon-list v-b-toggle.main-sidebar />
    </div>
    <header-search-mobile v-if="!isGuest && windowWidth === 'sm'" @toggle-search="toggleMobileSearch" />
    <header-search v-else-if="windowWidth !== 'sm'" />
    <header-languages v-if="windowWidth !== 'sm'" />
    <header-trade-mode v-if="isMobileSearchHidden" />
    <chat-icon v-if="isMobileSearchHidden" @click.native="toggleChat" />
  </div>
</template>

<script>
import HeaderLanguages from '~/components/header/headerLanguages'
import HeaderSearch from '~/components/header/headerSearch'
import HeaderTradeMode from '~/components/header/headerTradeMode'
import ChatIcon from '~/components/chat/components/chatIcon'
import HeaderSearchMobile from '~/components/header/headerSearchMobile'
export default {
  name: 'LfxHeader',
  components: { HeaderSearchMobile, ChatIcon, HeaderLanguages, HeaderSearch, HeaderTradeMode },
  data () {
    return {
      isMobileSearchHidden: true
    }
  },
  computed: {
    isAuthUser () {
      return this.$store.getters['dictionaries/getters/user/getIsAuthUser']
    },
    isDemoTour () {
      return this.$store.getters['dictionaries/getters/user/isDemoTour']
    },
    isGuest () {
      return this.$store.getters['dictionaries/getters/user/getIsGuest']
    },
    windowWidth () {
      return this.$store.getters['dictionaries/getters/handler/getCurrentWindowWidth']
    },
    dir () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode'] ? 'rtl' : 'ltr'
    },
    isHeaderShown () {
      if (this.$store.getters['chat/getters/handler/getIsChatSidebarOpen']) {
        return true
      } else
      if (this.windowWidth !== 'sm') {
        return true
      } else {
        return !this.$store.getters['dictionaries/getters/handler/getIsChartShown']
      }
    }
  },
  methods: {
    toggleChat (flag) {
      if (this.isAuthUser || this.isDemoTour) {
        this.$store.commit('chat/mutations/handler/TOGGLE_CHAT_SIDEBAR', { rootData: this.$store.state.chat.state.handler, data: flag })
      } else {
        this.$store.dispatch('dictionaries/actions/handler/showPopup', 'register-yet')
      }
    },
    hideChat () {
      this.$store.commit('chat/mutations/handler/TOGGLE_CHAT_SIDEBAR', { rootData: this.$store.state.chat.state.handler, data: false })
    },
    toggleMobileSearch (flag) {
      this.isMobileSearchHidden = flag
    }
  }
}
</script>
