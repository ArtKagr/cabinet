<template>
  <div class="chat-sidebar-comment_create">
    <chat-current-room-emojis />
    <div v-if="replyMessage" class="chat-sidebar-comment_create-reply_message">
      <div class="chat-sidebar-comment_create-reply_message-container" :class="`-${dir}`">
        <span class="chat-sidebar-comment_create-reply_message-container-username" :class="isRtlMode ? 'text-right' : ''" v-text="replyMessage.username" />
        <span class="chat-sidebar-comment_create-reply_message-container-message" :class="isRtlMode ? 'text-right' : ''" v-text="replyMessage.message" />
      </div>
    </div>
    <div v-if="chatMessageContent.url" class="chat-sidebar-comment_create-reply_message">
      <div class="chat-sidebar-comment_create-reply_message-container" :class="`-${dir}`">
        <span class="chat-sidebar-comment_create-reply_message-container-username -load_link" :class="isRtlMode ? 'text-right' : ''" v-text="chatMessageContent.title" />
        <span class="chat-sidebar-comment_create-reply_message-container-message -load_link" :class="isRtlMode ? 'text-right' : ''" v-text="chatMessageContent.text" />
      </div>
    </div>
    <div v-if="socketUploaderFile.url" class="chat-sidebar-comment_create-image_container">
      <img class="chat-sidebar-comment_create-image_container-image" :src="socketUploaderFile.url" alt>
    </div>
    <b-progress
      v-if="socketUploaderStatuses.start && !socketUploaderStatuses.finish"
      :max="socketUploaderStatuses.size"
      show-progress
      animated
    >
      <b-progress-bar
        :value="socketUploaderStatuses.sent"
        :label="`${Math.round((socketUploaderStatuses.sent / socketUploaderStatuses.size) * 100)}%`"
      />
    </b-progress>
    <div class="chat-sidebar-comment_create-control_container">
      <div class="d-flex w-100 align-items-end">
        <label for="attach" class="chat-sidebar-comment_create-control_container-attach" :class="isRtlMode ? 'ml-3' : 'mr-3'">
          <lfx-icon-attach />
        </label>
        <div v-b-toggle.chat-emojis class="chat-sidebar-comment_create-control_container-emoji" :class="isRtlMode ? 'ml-3' : 'mr-3'">
          <lfx-icon-emoji />
        </div>
        <textarea-autosize
          v-model="userMessage"
          :placeholder="$t('Текст сообщения')"
          rows="1"
          class="chat-sidebar-comment_create-control_container-message_field"
          @keypress.enter.native="sendUserMessage"
          @keydown.delete.native="clearUserMessage"
        />
      </div>
      <div class="d-flex align-items-end">
        <lfx-icon-send class="chat-sidebar-comment_create-control_container-send" @click.native="sendUserMessage" />
      </div>
    </div>
    <input v-show="false" id="attach" type="file" @change="onFileChange">
    <b-modal
      v-model="modalShow"
      body-class="chat-sidebar-comment_create-error_modal"
      centered
      hide-footer
      hide-header
    >
      <template #default="{ close }">
        <div class="chat-sidebar-comment_create-error_modal-container">
          <div class="chat-sidebar-comment_create-error_modal-container-header">
            <b-icon-x
              class="chat-sidebar-comment_create-error_modal-container-header-close"
              @click="close()"
            />
            <div class="chat-sidebar-comment_create-error_modal-container-header-error_icon">
              <svg id="icon-error" viewBox="0 0 84 84">
                <path d="M71.698 12.302C55.295-4.1 28.7-4.1 12.302 12.302c-16.403 16.403-16.403 42.997 0 59.396 16.4 16.403 42.993 16.403 59.396 0 16.403-16.4 16.403-42.993 0-59.396zm-4.95 54.446c-13.669 13.67-35.83 13.67-49.496 0-13.669-13.666-13.669-35.827 0-49.496 13.666-13.67 35.827-13.67 49.496 0 13.67 13.67 13.67 35.83 0 49.496z" /><path d="M59.323 24.675a3.5 3.5 0 0 0-4.95 0L42 37.05 29.625 24.675a3.5 3.5 0 0 0-4.95 4.95L37.05 41.999 24.68 54.37a3.5 3.5 0 0 0 4.95 4.95L42 46.95l12.374 12.373a3.5 3.5 0 0 0 4.95-4.95L46.948 42l12.375-12.375a3.5 3.5 0 0 0 0-4.95z" />
              </svg>
            </div>
          </div>
          <div class="chat-sidebar-comment_create-error_modal-container-footer">
            <span
              class="chat-sidebar-comment_create-error_modal-container-footer-title"
              v-text="$t('Ошибка загрузки файла')"
            />
            <span
              class="chat-sidebar-comment_create-error_modal-container-footer-text"
              v-text="'You can\'t upload files of this type.'"
            />
          </div>
        </div>
      </template>
    </b-modal>
  </div>
</template>
<script>
import LfxIconAttach from '~/components/chat/icons/lfx-icon-attach'
import LfxIconEmoji from '~/components/chat/icons/lfx-icon-emoji'
import LfxIconSend from '~/components/chat/icons/lfx-icon-send'
import chatCurrentRoomEmojis from '~/components/chat/components/currentRoom/chatCurrentRoomEmojis'
export default {
  name: 'ChatCurrentRoomComment',
  components: { chatCurrentRoomEmojis, LfxIconAttach, LfxIconEmoji, LfxIconSend },
  data () {
    return {
      userContent: null,
      modalShow: false
    }
  },
  computed: {
    userMessage: {
      get () {
        return this.$store.getters['chat/getters/handler/getUserMessage']
      },
      set (newValue) {
        this.$store.commit('chat/mutations/handler/SAVE_CHAT_USER_MESSAGE', {
          rootData: this.$store.state.chat.state.handler,
          data: newValue
        })
      }
    },
    currentRoom () {
      return this.$store.getters['chat/getters/handler/getCurrentRoom']
    },
    socketUploaderFile () {
      return this.$store.getters['dictionaries/getters/handler/getSocketUploaderFile']
    },
    replyMessage () {
      return this.$store.getters['chat/getters/handler/getReplyMessage']
    },
    chatMessageContent () {
      return this.$store.getters['chat/getters/handler/getChatMessageContent']
    },
    socketUploaderStatuses () {
      return this.$store.getters['dictionaries/getters/handler/getSocketUploaderStatuses']
    },
    linkMatch () {
      return /(https?:\/\/|ftps?:\/\/|www\.)((?![.,?!;:()]*(\s|$))[^\s]){2,}/gim
    },
    dir () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode'] ? 'rtl' : 'ltr'
    },
    isRtlMode () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode']
    }
  },
  watch: {
    userMessage (newValue) {
      if (this.currentRoom.room.type === 7) {
        this.$store.dispatch('chat/actions/handler/printMessage', {
          roomId: this.currentRoom.room.id,
          message: newValue
        })
      }
      if (newValue && newValue.match(this.linkMatch)) {
        this.$store.dispatch('chat/actions/handler/linkMessage', newValue.match(this.linkMatch)[0])
      }
    }
  },
  methods: {
    sendUserMessage () {
      const message = this.$store.getters['chat/getters/handler/getUserMessage']
      const content = this.$store.getters['chat/getters/handler/getUserContent']
      console.warn('message', message)
      console.warn('content', content)
      this.$store.dispatch('chat/actions/handler/sendMessage')
    },
    onFileChange (e) {
      this.$store.dispatch('socket/socketFileUploader', { file: e.target, path: 'chat_file' })
    },
    clearUserMessage () {
      if (!this.userMessage || !this.userMessage.length) {
        this.$store.commit('chat/mutations/handler/SAVE_CHAT_IMAGE_FILE', {
          rootData: this.$store.state.dictionaries.state.handler,
          data: { url: null, preview: null }
        })
        this.$store.commit('dictionaries/mutations/handler/UPDATE_SOCKET_UPLOADER_STATUSES', {
          rootData: this.$store.state.dictionaries.state.handler,
          data: { start: false, finish: false, sent: null, size: null }
        }, { root: true })
        this.$store.commit('chat/mutations/handler/SAVE_CHAT_REPLY_MESSAGE', {
          rootData: this.$store.state.chat.state.handler,
          data: null
        })
        this.$store.commit('chat/mutations/handler/CLEAR_CHAT_MESSAGE_LOAD_LINK', {
          rootData: this.$store.state.chat.state.handler,
          data: null
        })
      }
    }
  }
}
</script>
