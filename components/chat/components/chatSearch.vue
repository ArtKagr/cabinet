<template>
  <div class="chat-sidebar-menu-search">
    <span class="chat-sidebar-menu-search-title" :class="isRtlMode ? 'text-right' : ''" v-text="$t('Найти чат или канал')" />
    <b-input v-model="desiredRoom" class="chat-sidebar-menu-search-input" />
  </div>
</template>

<script>
export default {
  name: 'ChatSearch',
  computed: {
    desiredRoom: {
      get () {
        return this.$store.getters['chat/getters/handler/getDesiredRoom']
      },
      set (newValue) {
        this.$store.commit('chat/mutations/handler/UPDATE_CHAT_DESIRED_ROOM', {
          rootData: this.$store.state.chat.state.handler,
          data: newValue
        })
      }
    },
    dir () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode'] ? 'rtl' : 'ltr'
    },
    isRtlMode () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode']
    }
  },
  watch: {
    desiredRoom () {
      this.$store.dispatch('chat/actions/handler/findRooms')
    }
  }
}
</script>
