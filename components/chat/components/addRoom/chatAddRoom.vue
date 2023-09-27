<template>
  <div class="chat-sidebar-menu-add_room">
    <span class="chat-sidebar-menu-add_room-title" v-text="$t('Создать')" />
    <div class="chat-sidebar-menu-add_room-container">
      <div class="chat-sidebar-menu-add_room-container-buttons">
        <div
          v-for="room in rooms"
          :key="room.flag"
          class="chat-sidebar-menu-add_room-container-buttons-button"
          :class="activeRoom === room.flag ? '-active' : ''"
          @click="setActiveRoom(room.flag)"
        >
          <div v-if="activeRoom === room.flag" class="chat-sidebar-menu-add_room-container-buttons-button-tail" />
          <span v-text="room.title" />
        </div>
      </div>
      <chat-add-room-container :current-room="activeRoom" />
    </div>
  </div>
</template>

<script>
import ChatAddRoomContainer from '~/components/chat/components/addRoom/chatAddRoomContainer'
export default {
  name: 'ChatAddRoom',
  components: { ChatAddRoomContainer },
  data () {
    return {
      activeRoom: 'chat'
    }
  },
  computed: {
    rooms () {
      return [
        {
          title: this.$t('Чат'),
          flag: 'chat'
        },
        {
          title: this.$t('Канал'),
          flag: 'channel'
        }
      ]
    }
  },
  destroyed () {
    this.$store.commit('chat/mutations/handler/SAVE_CHAT_AVATAR_SOCKET_IMAGE', {
      rootData: this.$store.state.chat.state.handler,
      data: { url: null, path: null }
    })
  },
  methods: {
    setActiveRoom (flag) {
      this.activeRoom = flag
      this.$store.commit('chat/mutations/handler/SAVE_CHAT_ROOM_PARAMETERS', {
        rootData: this.$store.state.chat.state.handler,
        data: {
          field: 'type',
          value: flag === 'chat' ? 2 : 4
        }
      })
    }
  }
}
</script>
