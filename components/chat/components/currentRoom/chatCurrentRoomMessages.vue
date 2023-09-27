<template>
  <div class="chat-sidebar-room-messages" :class="`-${dir}`">
    <vue-scroll
      id="room_messages"
      ref="messages-scroll"
      class="chat-sidebar-room-messages-container"
      @handle-scroll="handleScroll($event)"
      @handle-resize="handleResize"
    >
      <!-- Сообщение -->
      <div
        v-for="message in currentRoom.messages"
        :key="message.id"
        class="chat-sidebar-room-messages-container-message"
        @click="saveActiveMessage(message)"
      >
        <!-- Аватар -->
        <img
          v-if="message.avatar_url && !message.is_previous_same"
          class="chat-sidebar-room-messages-container-message-avatar"
          :class="`-${dir}`"
          :src="message.avatar_url"
          alt
          @click="toggleSidebarPopup(message, 'username')"
        >
        <div
          v-else-if="!message.is_previous_same"
          class="chat-sidebar-room-messages-container-message-avatar -name"
          @click="toggleSidebarPopup(message, 'username')"
        >
          <span v-text="message.avatar_name" />
        </div>
        <div v-else class="chat-sidebar-room-messages-container-message-empty_avatar" />
        <!-- Контейнер сообщения -->
        <!-- Оценка оператора -->
        <div
          v-if="message && message.content && message.content.support_history"
          class="chat-sidebar-room-messages-container-message-support_history"
        >
          <span class="chat-sidebar-room-messages-container-message-support_history-title" v-text="$t('Оцените качество предоставленной поддержки')" />
          <div class="chat-sidebar-room-messages-container-message-support_history-smiles">
            <div
              class="chat-sidebar-room-messages-container-message-support_history-smiles-smile"
              :class="message.content.support_history.rating === -1 ? '-active' : ''"
              @click="sendChatSupportRating(message.id, -1)"
            >
              <lfx-icon-rating-bad />
            </div>
            <div
              class="chat-sidebar-room-messages-container-message-support_history-smiles-smile"
              :class="message.content.support_history.rating === 0 ? '-active' : ''"
              @click="sendChatSupportRating(message.id, 0)"
            >
              <lfx-icon-rating-neutral />
            </div>
            <div
              class="chat-sidebar-room-messages-container-message-support_history-smiles-smile"
              :class="message.content.support_history.rating === 1 ? '-active' : ''"
              @click="sendChatSupportRating(message.id, 1)"
            >
              <lfx-icon-rating-good />
            </div>
          </div>
        </div>
        <!-- Сообщение -->
        <div v-else class="chat-sidebar-room-messages-container-message-container">
          <!--  Title сообщения -->
          <div
            v-if="!message.is_previous_same"
            class="chat-sidebar-room-messages-container-message-container-title"
            :class="isRtlMode ? 'text-right' : ''"
            @click="toggleSidebarPopup(message, 'username')"
          >
            <div v-if="[1, 2].includes(message.chat_role)" class="d-flex align-items-center">
              <lfx-icon-admin :class="isRtlMode ? 'ml-1' : 'mr-1'" />
              <span
                class="chat-sidebar-room-messages-container-message-container-title-user -admin"
                v-text="message.chat_role === 1 ? currentRoom.room.title : message.username"
              />
            </div>
            <span
              v-else
              class="chat-sidebar-room-messages-container-message-container-title-user"
              v-text="message.username"
            />
            <span class="chat-sidebar-room-messages-container-message-container-title-date" v-text="getCurrentDate(message.date)" />
          </div>
          <!-- Content сообщения -->
          <div
            class="chat-sidebar-room-messages-container-message-container-content"
            :class="[authId === message.user_id ? '-own' : '', ![1, 2].includes(message.chat_role) ? 'pointer' : '']"
          >
            <!-- Цитируемое сообщение -->
            <div
              v-if="message.content && message.content.answer"
              class="chat-sidebar-room-messages-container-message-container-content-answer_container"
              :class="`-${dir}`"
              @click="toggleSidebarPopup(message, 'message')"
            >
              <span
                class="chat-sidebar-room-messages-container-message-container-content-answer_container-user"
                @click="toggleSidebarPopup(message, 'message')"
                v-text="message.content.answer.username"
              />
              <div
                class="chat-sidebar-room-messages-container-message-container-content-answer_container-answer"
                @click="toggleSidebarPopup(message, 'message')"
                v-html="message.content.answer.message"
              />
            </div>
            <!-- Прикрепленная ссылка -->
            <div
              v-if="message.content && message.content.link && message.content.link.url"
              class="chat-sidebar-room-messages-container-message-container-content-answer_container"
              :class="isRtlMode ? 'text-right' : ''"
            >
              <a
                class="chat-sidebar-room-messages-container-message-container-content-answer_container-user"
                :href="message.content.link.url"
                target="_blank"
                v-text="message.content.link.title"
              />
              <a class="d-flex w-100" :href="message.content.link.url" target="_blank">
                <img
                  class="chat-sidebar-room-messages-container-message-container-content-channel-image -load_link my-1"
                  :src="message.content.link.image.preview"
                  alt
                >
              </a>
              <div
                class="chat-sidebar-room-messages-container-message-container-content-answer_container-answer"
                :class="isRtlMode ? 'text-right' : ''"
                v-html="message.content.link.text"
              />
            </div>
            <!-- Подгруженное изображение -->
            <img
              v-if="message.content && message.content.image"
              class="chat-sidebar-comment_create-image_container-chat_image my-1"
              :src="message.content.image.url"
              alt
              @click="openImagePopup(message.content.image.url)"
            >
            <!-- Текст сообщения -->
            <div
              class="chat-sidebar-room-messages-container-message-container-content-message"
              :class="isRtlMode ? 'text-right' : ''"
              @click="toggleSidebarPopup(message, 'message')"
              v-html="message.message"
            />
          </div>
          <!--          <div v-else class="chat-sidebar-room-messages-container-message-container-content">-->
          <!--            <div-->
          <!--              v-if="message.content && message.content.link"-->
          <!--              class="chat-sidebar-room-messages-container-message-container-content-channel"-->
          <!--            >-->
          <!--              <a-->
          <!--                class="chat-sidebar-room-messages-container-message-container-content-channel-link"-->
          <!--                :href="message.content.link.url"-->
          <!--                target="_blank"-->
          <!--                v-text="message.content.link.title"-->
          <!--              />-->
          <!--              <img-->
          <!--                class="chat-sidebar-room-messages-container-message-container-content-channel-image"-->
          <!--                :src="message.content.link.image.preview"-->
          <!--                :alt="message.content.link.image.preview"-->
          <!--              >-->
          <!--              <div class="chat-sidebar-room-messages-container-message-container-content-channel-text" v-text="message.content.link.text" />-->
          <!--            </div>-->
          <!--            <span v-else class="chat-sidebar-room-messages-container-message-container-content-channel_message" v-html="message.message" />-->
          <!--          </div>-->
        </div>
      </div>
    </vue-scroll>
  </div>
</template>

<script>
import moment from 'moment'
import LfxIconAdmin from '~/components/header/icons/lfx-icon-admin'
import LfxIconRatingBad from '~/components/chat/icons/rating/lfx-icon-rating-bad'
import LfxIconRatingNeutral from '~/components/chat/icons/rating/lfx-icon-rating-neutral'
import LfxIconRatingGood from '~/components/chat/icons/rating/lfx-icon-rating-good'
export default {
  name: 'ChatCurrentRoomMessages',
  components: { LfxIconRatingGood, LfxIconRatingNeutral, LfxIconRatingBad, LfxIconAdmin },
  data () {
    return {
      moment,
      sideBarPosition: null,
      sidebarPopup: null,
      sideBarParameters: {
        type: null,
        process: null,
        barSize: null,
        scrollTop: 0
      },
      isScrolled: false
    }
  },
  computed: {
    newChatRoomMessage () {
      return this.$store.getters['chat/getters/handler/getNewChatRoomMessage']
    },
    currentRoom () {
      return this.$store.getters['chat/getters/handler/getCurrentRoom']
    },
    authId () {
      return Number(this.$store.getters['dictionaries/getters/user/getAuthorizationUserId'])
    },
    earlyMessages () {
      return this.$store.getters['chat/getters/handler/getEarlyMessages']
    },
    userInfo () {
      return this.$store.getters['chat/getters/handler/getUserInfo']
    },
    user () {
      return this.$store.getters['dictionaries/getters/user/getUser']
    },
    dir () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode'] ? 'rtl' : 'ltr'
    },
    isRtlMode () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode']
    }
  },
  watch: {
    newChatRoomMessage: {
      handler (newValue) {
        if (newValue.user_id === this.user.id || this.sideBarParameters.process === 1) {
          setTimeout(() => {
            this.$refs['messages-scroll'].scrollTo({ y: 100000 }, 0, 'easeInQuad')
          }, 500)
        }
      },
      deep: true
    },
    earlyMessages: {
      handler (newValue) {
        if (newValue && newValue.length) {
          this.$refs['messages-scroll'].scrollTo({ y: 1 }, 0, 'easeInQuad')
        }
      },
      deep: true
    },
    sideBarPosition (newValue) {
      if (newValue === 'top') {
        this.$store.dispatch('chat/actions/handler/getEarlyMessages')
      }
    }
  },
  mounted () {
    setTimeout(() => {
      this.$refs['messages-scroll'].scrollTo({ y: 100000 }, 0, 'easeInQuad')
    }, 500)
  },
  methods: {
    openImagePopup (imageUrl) {
      this.$store.commit('chat/mutations/handler/SAVE_MESSAGE_IMAGE_URL', {
        rootData: this.$store.state.chat.state.handler,
        data: imageUrl
      })
      this.$store.commit('dictionaries/mutations/handler/SAVE_POPUP_NAME', {
        rootData: this.$store.state.dictionaries.state.handler,
        data: 'chat-image'
      })
      this.$store.commit('dictionaries/mutations/handler/TOGGLE_POPUP', {
        rootData: this.$store.state.dictionaries.state.handler,
        data: true
      })
    },
    saveActiveMessage (message) {
      this.$store.commit('chat/mutations/handler/SAVE_CHAT_ACTIVE_MESSAGE', {
        rootData: this.$store.state.chat.state.handler,
        data: message
      })
    },
    getCurrentDate (date) {
      if (this.moment().endOf('day').format('DD.MM.YYYY') === this.moment.unix(date).format('DD.MM.YYYY')) {
        return this.moment.unix(date).format('HH:mm')
      } else if (this.moment().add(-1, 'days').format('DD.MM.YYYY') === this.moment.unix(date).format('DD.MM.YYYY')) {
        return `${this.$t('Вчера')}, ${this.moment.unix(date).format('HH:mm')}`
      } else {
        return this.moment.unix(date).format('DD.MM.YYYY HH:mm')
      }
    },
    async toggleSidebarPopup (message, source) {
      await this.$store.dispatch('chat/actions/handler/userInfo', message.user_id)
      this.$store.commit('chat/mutations/handler/TOGGLE_CHAT_SIDEBAR_POPUP', {
        rootData: this.$store.state.chat.state.handler,
        data: source
      })
    },
    handleScroll (event) {
      this.isScrolled = true
      this.sideBarParameters = Object.assign(this.sideBarParameters, event)
      this.sideBarPosition = null
      if (event.process === 0) {
        this.sideBarPosition = 'top'
      } else if (event.process === 1) {
        this.sideBarPosition = 'bottom'
      }
    },
    handleResize () {
      if (!this.isScrolled) {
        this.$refs['messages-scroll'].scrollTo({ y: 100000 }, 0, 'easeInQuad')
      }
    },
    sendChatSupportRating (messageId, rating) {
      this.$store.dispatch('chat/actions/handler/sendChatMessageRating', { messageId, rating })
    }
  }
}
</script>
