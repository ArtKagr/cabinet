export const actions = {
  // // ПОЛЬЗОВАТЕЛЬ
  // Получение информации о пользователе
  async userInfo ({ rootGetters }, userId) {
    await rootGetters['socket/getSocketIo'].emit('chat_user_info', { userId })
  },
  // Заблокировать пользователя
  async userBlock ({ rootGetters }, roomId) {
    await rootGetters['socket/getSocketIo'].emit('chat_user_block_switch', { userIdTarget: roomId, value: true })
  },
  // Разблокировать пользователя
  async userUnlock ({ rootGetters }, roomId) {
    await rootGetters['socket/getSocketIo'].emit('chat_user_block_switch', { userIdTarget: roomId, value: false })
  },
  // // КОМНАТА
  // Получить список комнат
  async fetchRoomsList ({ rootGetters }) {
    await rootGetters['socket/getSocketIo'].emit('chat_room_list')
  },
  // Открыть комнату
  async openCurrentRoom ({ rootState, rootGetters, commit }, room) {
    await rootGetters['socket/getSocketIo'].emit('chat_room_open', rootGetters['chat/getters/handler/getCurrentChatRoomId'](room))
  },
  // Закрыть комнату
  async closeCurrentRoom ({ rootState, rootGetters, commit }) {
    await rootGetters['socket/getSocketIo'].emit('chat_room_open', null)
    await commit('chat/mutations/handler/TOGGLE_CHAT_CURRENT_ROOM', { rootData: rootState.chat.state.handler, data: false }, { root: true })
  },
  // Присоединиться к комнате
  async joinRoom ({ dispatch, rootGetters }, room) {
    await rootGetters['socket/getSocketIo'].emit('chat_room_join', rootGetters['chat/getters/handler/getCurrentChatRoomId'](room))
  },
  // Покинуть комнату
  async leaveRoom ({ dispatch, rootGetters }, room) {
    await rootGetters['socket/getSocketIo'].emit('chat_room_leave', rootGetters['chat/getters/handler/getCurrentChatRoomId'](room))
  },
  // Найти комнату
  async findRooms ({ rootGetters }) {
    await rootGetters['socket/getSocketIo'].emit('chat_room_search', { search: rootGetters['chat/getters/handler/getDesiredRoom'] })
  },
  // Все сообщения в комнате прочитаны
  async chatRoomRead ({ rootGetters }) {
    const room = rootGetters['chat/getters/handler/getCurrentRoom'].room
    await rootGetters['socket/getSocketIo'].emit('chat_room_read', rootGetters['chat/getters/handler/getCurrentChatRoomId'](room))
  },
  // Включить уведомления в комнате
  async enableRoomNotifications ({ rootGetters }) {
    const room = rootGetters['chat/getters/handler/getCurrentRoom'].room
    await rootGetters['socket/getSocketIo'].emit('chat_room_notify_switch', { ...rootGetters['chat/getters/handler/getCurrentChatRoomId'](room), value: true })
  },
  // Отключить уведомления в комнате
  async disableRoomNotifications ({ rootGetters }) {
    const room = rootGetters['chat/getters/handler/getCurrentRoom'].room
    await rootGetters['socket/getSocketIo'].emit('chat_room_notify_switch', { ...rootGetters['chat/getters/handler/getCurrentChatRoomId'](room), value: false })
  },
  // Создать комнату
  async createRoom ({ rootGetters }) {
    await rootGetters['socket/getSocketIo'].emit('chat_room_create', rootGetters['chat/getters/handler/getChatRoomParameters'])
  },
  // // СООБЩЕНИЕ
  // Отправить сообщение пользователю
  async sendMessage ({ rootGetters, dispatch }) {
    await rootGetters['socket/getSocketIo'].emit('chat_message_send', {
      roomId: rootGetters['chat/getters/handler/getCurrentRoom'].room.id,
      message: rootGetters['chat/getters/handler/getUserMessage'],
      content: rootGetters['chat/getters/handler/getUserContent']
    })
    dispatch('clearMessage')
  },
  // Пожаловаться на сообщение
  async complaintMessage ({ rootGetters }) {
    await rootGetters['socket/getSocketIo'].emit('chat_message_complaint', { messageId: rootGetters['chat/getters/handler/getActiveMessage'].id })
  },
  // Удалить сообщение
  async deleteMessage ({ rootGetters }) {
    await rootGetters['socket/getSocketIo'].emit('chat_message_delete', { messageId: rootGetters['chat/getters/handler/getActiveMessage'].id })
  },
  // Получить предыдущие сообщения
  async getEarlyMessages ({ rootGetters }) {
    const messages = rootGetters['chat/getters/handler/getCurrentRoom'].messages
    await rootGetters['socket/getSocketIo'].emit('chat_messages_history', {
      roomId: rootGetters['chat/getters/handler/getCurrentRoom'].room.id,
      lastMessageId: messages.length ? messages[0].id : null
    })
  },
  // Оповещение оператора о наборе текста в комнате службы поддержки
  async printMessage ({ rootGetters }, payload) {
    await rootGetters['socket/getSocketIo'].emit('chat_message_print', payload)
  },
  // Получение ссылки из сообщения
  async linkMessage ({ rootGetters }, url) {
    const room = rootGetters['chat/getters/handler/getCurrentRoom'].room
    await rootGetters['socket/getSocketIo'].emit('chat_message_load_link', { ...rootGetters['chat/getters/handler/getCurrentChatRoomId'](room), url })
  },
  // Оценить работу оператора службы поддержки
  async sendChatMessageRating ({ rootGetters }, payload) {
    await rootGetters['socket/getSocketIo'].emit('chat_support_rating', payload)
  },
  // Очистить сообщение и прикрепленный контент
  clearMessage ({ rootState, commit }) {
    commit('chat/mutations/handler/SAVE_CHAT_USER_MESSAGE', { rootData: rootState.chat.state.handler, data: '' }, { root: true })
    commit('chat/mutations/handler/SAVE_CHAT_REPLY_MESSAGE', { rootData: rootState.chat.state.handler, data: null }, { root: true })
    commit('chat/mutations/handler/SAVE_CHAT_IMAGE_FILE', { rootData: rootState.dictionaries.state.handler, data: { url: null, preview: null } }, { root: true })
    commit('chat/mutations/handler/CLEAR_CHAT_MESSAGE_LOAD_LINK', { rootData: rootState.chat.state.handler, data: null }, { root: true })
  }
}
