<template>
  <div class="chat-sidebar-room">
    <chat-current-room-menu />
    <chat-current-room-messages v-if="currentRoom.messages && currentRoom.messages.length" />
  </div>
</template>

<script>
import ChatCurrentRoomMenu from '~/components/chat/components/currentRoom/chatCurrentRoomMenu'
import ChatCurrentRoomMessages from '~/components/chat/components/currentRoom/chatCurrentRoomMessages'
export default {
  name: 'ChatCurrentRoom',
  components: { ChatCurrentRoomMenu, ChatCurrentRoomMessages },
  computed: {
    currentRoom () {
      return this.$store.getters['chat/getters/handler/getCurrentRoom']
    }
  }
}
</script>
