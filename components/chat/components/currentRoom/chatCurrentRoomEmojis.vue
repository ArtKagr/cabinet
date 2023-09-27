<template>
  <b-collapse id="chat-emojis" class="chat-sidebar-comment_create-emoji_container">
    <div class="chat-sidebar-comment_create-emoji_container-title_container">
      <span class="chat-sidebar-comment_create-emoji_container-title_container-title" v-text="$t('Смайлы')" />
      <div v-b-toggle.chat-emojis class="chat-sidebar-comment_create-emoji_container-title_container-close">
        <b-icon-x />
      </div>
    </div>
    <div class="chat-sidebar-comment_create-emoji_container-emojis">
      <chat-current-room-message-emoji
        v-for="emoji in emojis"
        :key="emoji.title"
        class="chat-sidebar-comment_create-emoji_container-emojis-emoji"
        :current-emoji="emoji.title"
        @click.native="addEmoji(emoji.symbol)"
      />
    </div>
  </b-collapse>
</template>

<script>
import ChatCurrentRoomMessageEmoji from '~/components/chat/components/currentRoom/chatCurrentRoomMessageEmoji'
export default {
  name: 'ChatCurrentRoomEmojis',
  components: { ChatCurrentRoomMessageEmoji },
  computed: {
    emojis () {
      return this.$store.getters['symbols/getters/handler/emojis']
    }
  },
  methods: {
    addEmoji (emojiSymbol) {
      this.$store.commit('chat/mutations/handler/ADD_CHAT_EMOJI_USER_MESSAGE', {
        rootData: this.$store.state.chat.state.handler,
        data: emojiSymbol
      })
    }
  }
}
</script>
