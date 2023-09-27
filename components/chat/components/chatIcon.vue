<template>
  <div class="chat" :class="[`-${dir}`, isChatSidebarOpen ? '-arrow' : '', windowWidth === 'sm' ? '-mobile' : '']">
    <div class="chat-icon">
      <div v-if="isChatSidebarOpen" class="d-flex flex-column">
        <b-icon-arrow-right v-if="dir === 'ltr'" class="chat-icon-arrow" />
        <b-icon-arrow-left v-else class="chat-icon-arrow" />
        <span class="chat-icon-text" v-text="$t('Чат')" />
      </div>
      <div v-else class="d-flex flex-column">
        <div class="position-relative line-height-1">
          <LfxIconChat1 />
          <span
            v-if="unreadRooms && !isChatSidebarOpen && (isAuthUser || isDemoTour)"
            class="chat-icon-count"
            v-text="unreadRooms"
          />
        </div>
        <span class="chat-icon-text" v-text="$t('Чат')" />
      </div>
    </div>
  </div>
</template>

<script>
import LfxIconChat1 from '~/components/header/icons/lfx-icon-chat-1'
export default {
  name: 'ChatIcon',
  components: { LfxIconChat1 },
  computed: {
    windowWidth () {
      return this.$store.getters['dictionaries/getters/handler/getCurrentWindowWidth']
    },
    dir () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode'] ? 'rtl' : 'ltr'
    },
    isDemoTour () {
      return this.$store.getters['dictionaries/getters/user/isDemoTour']
    },
    isAuthUser () {
      return this.$store.getters['dictionaries/getters/user/getIsAuthUser']
    },
    isChatSidebarOpen () {
      return this.$store.getters['chat/getters/handler/getIsChatSidebarOpen']
    },
    unreadRooms () {
      return this.$store.getters['chat/getters/handler/getUnreadChats'] + this.$store.getters['chat/getters/handler/getUnreadChannels']
    }
  }
}
</script>
