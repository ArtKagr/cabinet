<template>
  <div class="d-flex flex-column w-100">
    <div class="chat-sidebar-room-description">
      <b-icon-arrow-right v-if="isRtlMode" class="chat-sidebar-room-description-arrow -rtl" @click="closeCurrentRoom" />
      <b-icon-arrow-left v-else class="chat-sidebar-room-description-arrow -ltr" @click="closeCurrentRoom" />
      <div class="chat-sidebar-room-description-container">
        <img
          v-if="currentRoom.room.avatar_url"
          class="chat-sidebar-room-description-container-image"
          :class="`-${dir}`"
          :src="currentRoom.room.avatar_url"
          alt
        >
        <div v-else class="chat-sidebar-room-description-container-image">
          <span v-text="currentRoom.room.avatar_name" />
        </div>
        <div class="chat-sidebar-room-description-container-block">
          <span class="chat-sidebar-room-description-container-block-title" v-text="roomTitle(currentRoom.room)" />
          <div class="chat-sidebar-room-description-container-block-count_persons">
            <b-icon-person-fill class="chat-sidebar-room-description-container-block-count_persons-icon" :class="`-${dir}`" />
            <span class="chat-sidebar-room-description-container-block-count_persons-count" v-text="currentRoom.room.users" />
          </div>
        </div>
      </div>
      <div v-b-toggle.chat-menu-notes class="chat-sidebar-room-description-dropdown-head-logo">
        <b-icon-three-dots-vertical />
      </div>
    </div>
    <b-collapse id="chat-menu-notes" class="chat-sidebar-room-notes" :class="`-${dir}`">
      <span
        class="chat-sidebar-room-notes-note"
        @click="copyChatRoomLink"
        v-text="$t('Скопировать ссылку на чат')"
      />
      <template v-if="[1, 2, 3, 4, 5, 7].includes(currentRoom.room.type)">
        <span
          v-if="currentRoom.room.notify"
          v-b-toggle.chat-menu-notes
          class="chat-sidebar-room-notes-note"
          @click="toggleRoomNotifications"
          v-text="$t('Отключить уведомления')"
        />
        <span
          v-else
          v-b-toggle.chat-menu-notes
          class="chat-sidebar-room-notes-note"
          @click="toggleRoomNotifications"
          v-text="$t('Включить уведомления')"
        />
      </template>
      <span
        v-if="[2, 3, 4].includes(currentRoom.room.type)"
        v-b-toggle.chat-menu-notes
        class="chat-sidebar-room-notes-note"
        @click="leaveRoom(currentRoom.room)"
        v-text="$t('Покинуть чат')"
      />
      <span
        v-if="currentRoom.room.type === 1"
        class="chat-sidebar-room-notes-note"
        @click="openSidebarPopup('username')"
        v-text="$t('Профиль')"
      />
      <!--      <span-->
      <!--        v-if="currentRoom.room.user_block"-->
      <!--        v-b-toggle.chat-menu-notes-->
      <!--        class="chat-sidebar-room-notes-note"-->
      <!--        @click="userUnlock(currentRoom.room.id)"-->
      <!--        v-text="'Разблокировать'"-->
      <!--      />-->
      <!--      <span-->
      <!--        v-else-->
      <!--        v-b-toggle.chat-menu-notes-->
      <!--        class="chat-sidebar-room-notes-note"-->
      <!--        @click="userBlock(currentRoom.room.id)"-->
      <!--        v-text="'Заблокировать'"-->
      <!--      />-->
    </b-collapse>
  </div>
</template>

<script>
export default {
  name: 'ChatCurrentRoomMenu',
  computed: {
    user () {
      return this.$store.getters['dictionaries/getters/user/getUser']
    },
    currentRoom () {
      return this.$store.getters['chat/getters/handler/getCurrentRoom']
    },
    routePages () {
      return this.$store.getters['dictionaries/getters/handler/getRoutePages']
    },
    roomType () {
      return [1, 6, 7].includes(this.currentRoom.room.type) ? 'openPm' : 'openRoom'
    },
    copyRoomLink () {
      return `${document.location.host}/${this.routePages.locale}?${this.roomType}=${this.currentRoom.room.id}`
    },
    dir () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode'] ? 'rtl' : 'ltr'
    },
    isRtlMode () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode']
    }
  },
  methods: {
    async closeCurrentRoom () {
      await this.$store.dispatch('chat/actions/handler/clearMessage')
      await this.$store.dispatch('chat/actions/handler/closeCurrentRoom')
    },
    toggleRoomNotifications () {
      this.currentRoom.room.notify
        ? this.$store.dispatch('chat/actions/handler/disableRoomNotifications')
        : this.$store.dispatch('chat/actions/handler/enableRoomNotifications')
    },
    copyChatRoomLink () {
      navigator.clipboard.writeText(this.copyRoomLink)
      this.$store.dispatch('dictionaries/actions/handler/openSuccessToast', { description: this.$t('Ссылка успешно скопирована') })
    },
    leaveRoom (room) {
      this.$store.dispatch('chat/actions/handler/leaveRoom', room)
    },
    openSidebarPopup (source) {
      this.$store.dispatch('chat/actions/handler/userInfo', this.currentRoom.room.user_id)
      this.$store.commit('chat/mutations/handler/TOGGLE_CHAT_SIDEBAR_POPUP', {
        rootData: this.$store.state.chat.state.handler,
        data: source
      })
    },
    userBlock (roomId) {
      this.$store.dispatch('chat/actions/handler/userBlock', roomId)
    },
    userUnlock (roomId) {
      this.$store.dispatch('chat/actions/handler/userUnlock', roomId)
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
