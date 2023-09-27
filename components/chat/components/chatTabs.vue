<template>
  <div class="chat-sidebar-navigation">
    <div class="chat-sidebar-navigation-tabs">
      <div class="chat-sidebar-navigation-tabs-tab" :class="activeChatTab === 'chat' ? '-active' : ''" @click="setActiveChatTab('chat')">
        <span class="chat-sidebar-navigation-tabs-tab-title" :class="`-${dir}`" v-text="$t('Чаты')" />
        <span v-if="unreadChats" class="chat-sidebar-navigation-tabs-tab-count" v-text="unreadChats" />
      </div>
      <div class="chat-sidebar-navigation-tabs-tab" :class="activeChatTab === 'channel' ? '-active' : ''" @click="setActiveChatTab('channel')">
        <span class="chat-sidebar-navigation-tabs-tab-title" :class="`-${dir}`" v-text="$t('Каналы')" />
        <span v-if="unreadChannels" class="chat-sidebar-navigation-tabs-tab-count" v-text="unreadChannels" />
      </div>
    </div>
    <div class="chat-sidebar-navigation-buttons">
      <div class="chat-sidebar-navigation-buttons-button" :class="activeChatTab === 'search' ? '-active' : ''" @click="setActiveChatTab('search')">
        <b-icon-search class="h5 m-0" />
      </div>
      <div class="chat-sidebar-navigation-buttons-button" :class="activeChatTab === 'add_room' ? '-active' : ''" @click="setActiveChatTab('add_room')">
        <b-icon-plus class="h5 m-0" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChatTabs',
  computed: {
    activeChatTab () {
      return this.$store.getters['chat/getters/handler/getActiveChatTab']
    },
    unreadChats () {
      return this.$store.getters['chat/getters/handler/getUnreadChats']
    },
    unreadChannels () {
      return this.$store.getters['chat/getters/handler/getUnreadChannels']
    },
    dir () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode'] ? 'rtl' : 'ltr'
    },
    isRtlMode () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode']
    }
  },
  methods: {
    async setActiveChatTab (tab) {
      this.$store.commit('chat/mutations/handler/SAVE_ACTIVE_CHAT_TAB', {
        rootData: this.$store.state.chat.state.handler,
        data: tab
      })
      this.$store.commit('chat/mutations/handler/TOGGLE_CHAT_CURRENT_ROOM', {
        rootData: this.$store.state.chat.state.handler,
        data: false
      })
      if (tab === 'chat' && tab === 'channel') {
        await this.$store.dispatch('chat/actions/handler/fetchRoomsList')
      }
    }
  }
}
</script>
