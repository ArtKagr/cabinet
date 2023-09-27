<template>
  <div class="chat-sidebar-container-content">
    <div class="chat-sidebar-active_tab">
      <vue-scroll>
        <div v-for="room in activeChatTabList" :key="room.id" class="chat-sidebar-active_tab-room" @click="openCurrentRoom(room)">
          <div class="chat-sidebar-active_tab-room-avatar">
            <img
              v-if="room.avatar_url"
              class="chat-sidebar-active_tab-room-avatar-image"
              :class="`-${dir}`"
              :src="room.avatar_url"
              alt
            >
            <div v-else class="chat-sidebar-active_tab-room-avatar-image" :class="`-${dir}`">
              <span v-text="room.avatar_name" />
            </div>
            <span v-if="room.new" class="chat-sidebar-active_tab-room-avatar-count" :class="`-${dir}`" v-text="room.new" />
          </div>
          <div class="chat-sidebar-active_tab-room-container">
            <span class="chat-sidebar-active_tab-room-container-title" :class="isRtlMode ? 'text-right' : ''" v-text="roomTitle(room)" />
            <span
              class="chat-sidebar-active_tab-room-container-previous_message"
              :class="[activeChatTab === 'chat' || activeChatTab === 'channel' ? '-flow' : '', isRtlMode ? 'text-right' : '']"
              v-text="room.message || room.description"
            />
            <div v-if="room.count" class="chat-sidebar-active_tab-room-container-users">
              <b-icon-person-fill class="chat-sidebar-active_tab-room-container-users-icon" :class="`-${dir}`" />
              <span class="chat-sidebar-active_tab-room-container-users-count" v-text="room.count" />
            </div>
          </div>
        </div>
      </vue-scroll>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChatTabList',
  computed: {
    user () {
      return this.$store.getters['dictionaries/getters/user/getUser']
    },
    activeChatTab () {
      return this.$store.getters['chat/getters/handler/getActiveChatTab']
    },
    activeChatTabList () {
      return this.$store.getters['chat/getters/handler/getActiveChatTabList']
    },
    dir () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode'] ? 'rtl' : 'ltr'
    },
    isRtlMode () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode']
    }
  },
  methods: {
    async openCurrentRoom (room) {
      await this.$store.dispatch('chat/actions/handler/openCurrentRoom', room)
    },
    roomTitle (room) {
      let result = room.title
      switch (room.type) {
        case 5:
          result = this.$t('Уведомления')
          break
        case 6:
          result = this.$t('Избранное')
          break
        case 7:
          result = this.user.is_vip ? 'Vip Support' : this.$t('Служба поддержки')
          break
      }
      return result
    }
  }
}
</script>
