<template>
  <b-form-group class="chat-sidebar-menu-add_room-container-create">
    <div class="chat-sidebar-menu-add_room-container-create-block">
      <div class="chat-sidebar-menu-add_room-container-create-block-head">
        <span class="chat-sidebar-menu-add_room-container-create-block-head-title" v-text="$t('Название')" />
        <span class="chat-sidebar-menu-add_room-container-create-block-head-subtitle" v-text="$t('Максимум 30 символов')" />
      </div>
      <b-form-input
        v-model="name.value"
        maxlength="30"
        required
        class="chat-sidebar-menu-add_room-container-create-block-input"
        :state="name.filled"
        invalid-feedback="НЕОБХОДИМО ЗАПОЛНИТЬ «НАЗВАНИЕ»."
        @click="name.filled = null"
      />
    </div>
    <div class="chat-sidebar-menu-add_room-container-create-block">
      <div class="chat-sidebar-menu-add_room-container-create-block-head">
        <span class="chat-sidebar-menu-add_room-container-create-block-head-title" v-text="$t('Описание')" />
        <span class="chat-sidebar-menu-add_room-container-create-block-head-subtitle" v-text="$t('Максимум 150 символов')" />
      </div>
      <b-form-textarea
        v-model="description.value"
        maxlength="150"
        required
        class="chat-sidebar-menu-add_room-container-create-block-textarea"
      />
    </div>
    <div class="chat-sidebar-menu-add_room-container-create-avatar w-100">
      <div class="chat-sidebar-menu-add_room-container-create-block-head">
        <span class="chat-sidebar-menu-add_room-container-create-block-head-title" v-text="$t('Картинка')" />
      </div>
      <img v-if="avatarImage.url" :src="avatarImage.url" class="chat-sidebar-menu-add_room-container-create-avatar-image mx-auto" alt="avatar">
      <div v-else class="chat-sidebar-menu-add_room-container-create-avatar-image -empty mx-auto" />
      <label for="attach-2" class="chat-sidebar-menu-add_room-container-create-avatar-button" v-text="$t('Загрузить картинку')" />
      <input v-show="false" id="attach-2" type="file" @change="onFileChange">
    </div>
    <b-button class="chat-sidebar-menu-add_room-container-create-button w-100" @click="createRoom" v-text="$t('Создать')" />
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
  </b-form-group>
</template>

<script>
export default {
  name: 'ChatAddRoomContainer',
  props: {
    currentRoom: {
      type: String,
      default: 'chat'
    }
  },
  data () {
    return {
      name: {
        value: null,
        filled: null
      },
      description: {
        value: null,
        filled: null
      },
      avatar: {
        value: null,
        filled: null
      }
    }
  },
  computed: {
    avatarImage () {
      return this.$store.getters['chat/getters/handler/getAvatarSocketImage']
    },
    socketUploaderStatuses () {
      return this.$store.getters['dictionaries/getters/handler/getSocketUploaderStatuses']
    }
  },
  watch: {
    'name.value' (newValue) {
      this.$store.commit('chat/mutations/handler/SAVE_CHAT_ROOM_PARAMETERS', {
        rootData: this.$store.state.chat.state.handler,
        data: {
          field: 'title',
          value: newValue
        }
      })
    },
    'description.value' (newValue) {
      this.$store.commit('chat/mutations/handler/SAVE_CHAT_ROOM_PARAMETERS', {
        rootData: this.$store.state.chat.state.handler,
        data: {
          field: 'description',
          value: newValue
        }
      })
    }
  },
  methods: {
    createRoom () {
      if (!this.name.value) {
        this.name.filled = false
      } else {
        this.$store.dispatch('chat/actions/handler/createRoom')
      }
    },
    onFileChange (e) {
      this.$store.dispatch('socket/socketFileUploader', { file: e.target, path: 'chat_avatar' })
    }
  }
}
</script>
