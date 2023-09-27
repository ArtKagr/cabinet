<template>
  <b-sidebar
    id="chat-sidebar"
    class="chat-sidebar"
    :class="bottomSidebarIsVisible ? '-with_bottom_sidebar' : '-without_bottom_sidebar'"
    :visible="isChatSidebarOpen"
    :lazy="!isChatSidebarOpen"
    :no-close-on-route-change="windowWidth !== 'sm'"
    :right="!isRtlMode"
    no-close-on-esc
    no-header
  >
    <template #default>
      <div class="chat-sidebar-container">
        <!-- Меню табов -->
        <chat-tabs class="chat-sidebar-container-navigation" />
        <!-- Поиск чатов/каналов -->
        <chat-search v-if="activeChatTab === 'search'" />
        <!-- Создание комнаты -->
        <chat-add-room v-if="activeChatTab === 'add_room'" />
        <!-- Открытая комната -->
        <chat-current-room v-if="isCurrentRoomOpen" />
        <!-- Список комнат/чатов -->
        <chat-tab-list v-else-if="activeChatTab !== 'add_room'" />
        <!-- Попап сайдбара чата -->
        <chat-popup v-if="sidebarPopup.shown" />
        <!-- Поле ввода сообщения, прикрепления файла и открытия сайдбара с эмодзи-->
        <chat-current-room-comment v-if="commentIsVisible" />
      </div>
    </template>
  </b-sidebar>
</template>

<script>
import ChatTabs from '~/components/chat/components/chatTabs'
import ChatTabList from '~/components/chat/components/chatTabList'
import ChatPopup from '~/components/chat/components/chatPopup'
import ChatCurrentRoom from '~/components/chat/components/currentRoom/index'
import ChatCurrentRoomComment from '~/components/chat/components/currentRoom/chatCurrentRoomComment'
import ChatSearch from '~/components/chat/components/chatSearch'
import ChatAddRoom from '~/components/chat/components/addRoom/chatAddRoom'
export default {
  name: 'Chat',
  components: {
    ChatAddRoom,
    ChatTabs,
    ChatTabList,
    ChatPopup,
    ChatCurrentRoom,
    ChatCurrentRoomComment,
    ChatSearch
  },
  computed: {
    windowWidth () {
      return this.$store.getters['dictionaries/getters/handler/getCurrentWindowWidth']
    },
    isChatSidebarOpen () {
      return this.$store.getters['chat/getters/handler/getIsChatSidebarOpen']
    },
    activeChatTab () {
      return this.$store.getters['chat/getters/handler/getActiveChatTab']
    },
    isCurrentRoomOpen () {
      return this.$store.getters['chat/getters/handler/getIsCurrentRoomOpen']
    },
    sidebarPopup () {
      return this.$store.getters['chat/getters/handler/getSidebarPopup']
    },
    currentRoom () {
      return this.$store.getters['chat/getters/handler/getCurrentRoom']
    },
    commentIsVisible () {
      return this.isCurrentRoomOpen && ((this.currentRoom.room.type !== 4 && this.currentRoom.room.type !== 5) || this.currentRoom.room.role === 2) && this.currentRoom.room.joined
    },
    bottomSidebarIsVisible () {
      return this.$store.getters['dictionaries/getters/handler/getBottomSidebarIsVisible']
    },
    isRtlMode () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode']
    },
    dir () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode'] ? 'rtl' : 'ltr'
    }
  },
  watch: {
    isChatSidebarOpen (newValue) {
      if (newValue) {
        this.$store.dispatch('chat/actions/handler/fetchRoomsList')
      }
    },
    chatErrorMessage (newValue) {
      if (newValue) {
        this.$store.dispatch('dictionaries/actions/handler/openErrorToast', { description: newValue })
      }
    }
  }
}
</script>
