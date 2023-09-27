<template>
  <div class="chat-sidebar-container-popup" @click="toggleSidebarPopup">
    <div v-if="sidebarPopup.source === 'username'" class="chat-sidebar-container-popup-modal -username">
      <img
        v-if="userInfo.avatar_url"
        class="chat-sidebar-container-popup-modal-avatar"
        :src="userInfo.avatar_url"
        alt
      >
      <div v-else class="chat-sidebar-container-popup-modal-avatar -name">
        <span v-text="userInfo.avatar_name" />
      </div>
      <span
        class="chat-sidebar-container-popup-modal-user_name"
        :class="userInfo.is_trader ? 'mb-2' : 'mb-4'"
        v-text="userInfo.username"
      />
      <div v-if="userInfo.is_trader" class="d-flex flex-column align-items-center mb-4">
        <span class="line-height-1" :class="userInfo.profit > 0 ? 'text-success-36' : userInfo.profit < 0 ? 'text-danger-36' : 'text-dark-primary-36'" v-text="`${userInfo.profit}%`" />
        <span class="text-uppercase" :class="userInfo.profit > 0 ? 'text-success-10' : userInfo.profit < 0 ? 'text-danger-10' : 'text-dark-primary-10'" v-text="$t('Доходность')" />
      </div>
      <span v-if="userInfo.is_trader" class="chat-sidebar-container-popup-modal-text -trader_profile mb-2" @click="openTraderProfile" v-text="$t('Профиль трейдера')" />
      <span class="chat-sidebar-container-popup-modal-text -username" @click="sendPrivateMessage" v-text="$t('Отправить личное сообщение')" />
    </div>
    <div v-else-if="sidebarPopup.source === 'message'" class="chat-sidebar-container-popup-modal -message">
      <span
        v-if="answerIsPossible"
        class="chat-sidebar-container-popup-modal-text -message"
        @click="replyMessage"
        v-text="$t('Ответить')"
      />
      <span
        v-if="authId === activeMessage.user_id"
        class="chat-sidebar-container-popup-modal-text -message -warning"
        @click="deleteMessage"
        v-text="$t('Удалить')"
      />
      <span
        v-else-if="[2, 3, 4].includes(currentRoom.room.type)"
        class="chat-sidebar-container-popup-modal-text -message -warning"
        @click="complaintMessage"
        v-text="$t('Пожаловаться на сообщение')"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChatPopup',
  computed: {
    currentRoom () {
      return this.$store.getters['chat/getters/handler/getCurrentRoom']
    },
    sidebarPopup () {
      return this.$store.getters['chat/getters/handler/getSidebarPopup']
    },
    activeMessage () {
      return this.$store.getters['chat/getters/handler/getActiveMessage']
    },
    authId () {
      return Number(this.$store.getters['dictionaries/getters/user/getAuthorizationUserId'])
    },
    userInfo () {
      return this.$store.getters['chat/getters/handler/getUserInfo']
    },
    answerIsPossible () {
      return ((this.currentRoom.room.type !== 4 && this.currentRoom.room.type !== 5) || this.currentRoom.room.role === 2) && this.currentRoom.room.joined
    },
    isDemoTour () {
      return this.$store.getters['dictionaries/getters/user/isDemoTour']
    },
    isAuthUser () {
      return this.$store.getters['dictionaries/getters/user/getIsAuthUser']
    },
    routePages () {
      return this.$store.getters['dictionaries/getters/handler/getRoutePages']
    }
  },
  destroyed () {
    this.$store.commit('chat/mutations/handler/SAVE_CHAT_USER_INFO', {
      rootData: this.$store.state.chat.state.handler,
      data: {
        avatar_name: null,
        avatar_url: null,
        full_name: null,
        id: null,
        is_trader: null,
        profit: null,
        username: null
      }
    })
  },
  methods: {
    async openTraderProfile () {
      await this.$store.dispatch('traders/actions/handler/fetchCurrentTrader', this.userInfo.id)
      await this.$router.push(`/${this.routePages.locale}/traders/${this.userInfo.id}`)
    },
    toggleSidebarPopup () {
      this.$store.commit('chat/mutations/handler/TOGGLE_CHAT_SIDEBAR_POPUP', {
        rootData: this.$store.state.chat.state.handler,
        data: null
      })
    },
    async sendPrivateMessage () {
      if (this.isAuthUser || this.isDemoTour) {
        await this.$store.dispatch('chat/actions/handler/openCurrentRoom', { user_id: this.userInfo.id || this.activeMessage.user_id })
        this.$store.commit('chat/mutations/handler/TOGGLE_CHAT_SIDEBAR', { rootData: this.$store.state.chat.state.handler, data: true })
      } else {
        this.$store.dispatch('dictionaries/actions/handler/showPopup', 'register-yet')
      }
    },
    replyMessage () {
      this.$store.commit('chat/mutations/handler/SAVE_CHAT_REPLY_MESSAGE', { rootData: this.$store.state.chat.state.handler, data: this.activeMessage })
    },
    deleteMessage () {
      this.$store.dispatch('chat/actions/handler/deleteMessage')
    },
    complaintMessage () {
      this.$store.dispatch('chat/actions/handler/complaintMessage')
    }
  }
}
</script>
