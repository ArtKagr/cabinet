export const mutations = {
  // Открытие/закрытие сайдбара чата
  TOGGLE_CHAT_SIDEBAR (state, payload) {
    if (payload.data === true || payload.data === false) {
      payload.rootData.isChatSidebarOpen = payload.data
    } else {
      payload.rootData.isChatSidebarOpen = !payload.rootData.isChatSidebarOpen
    }

    if (!payload.rootData.isChatSidebarOpen) {
      localStorage.removeItem('chat_room')
    }
  },
  // Активный таб в сайдбаре чата
  SAVE_ACTIVE_CHAT_TAB (state, payload) {
    payload.rootData.activeChatTab = payload.data
  },
  // Открытие закрытие комнаты/канала в сайдбаре чата
  TOGGLE_CHAT_CURRENT_ROOM (state, payload) {
    if (payload.data === true || payload.data === false) {
      payload.rootData.isCurrentRoomOpen = payload.data
    } else {
      payload.rootData.isCurrentRoomOpen = !payload.rootData.isCurrentRoomOpen
    }
  },
  // Сохранение списка комнат/каналов в сайдбаре чата
  SAVE_CHAT_TAB_LIST (state, payload) {
    payload.rootData.chatTabList = payload.data
  },
  // Обновить комнату/канал в сайдбаре чата
  UPDATE_CHAT_TAB_LIST (state, payload) {
    payload.rootData.chatTabList = payload.rootData.chatTabList.map((room) => {
      if (room.id === payload.data.room.id) {
        room = { ...payload.data.room, new: room.new + 1, notify: 0 }
      }
      return room
    })
  },
  // Сохранение списка найденных комнат/чатов/новостей
  SAVE_SEARCHED_ROOMS_LIST (state, payload) {
    if (payload.data.search === '') {
      payload.rootData.searchedRooms = []
    } else {
      payload.rootData.searchedRooms = payload.data
    }
  },
  // Сохранение открытой комнаты
  SAVE_CHAT_CURRENT_ROOM (state, payload) {
    payload.rootData.currentRoom = payload.data
  },
  // Показать/скрыть попап
  TOGGLE_CHAT_SIDEBAR_POPUP (state, payload) {
    payload.rootData.sidebarPopup.shown = !payload.rootData.sidebarPopup.shown
    payload.rootData.sidebarPopup.source = payload.data
  },
  // Сохранить активное сообщение
  SAVE_CHAT_ACTIVE_MESSAGE (state, payload) {
    payload.rootData.activeMessage = payload.data
  },
  // Сохранить url активного сообщения
  SAVE_MESSAGE_IMAGE_URL (state, payload) {
    payload.rootData.activeMessageImageUrl = payload.data
  },
  // Обновление поисковой информации
  UPDATE_CHAT_DESIRED_ROOM (state, payload) {
    payload.rootData.desiredRoom = payload.data
  },
  // Получение нового сообщения в комнате
  ADD_CHAT_NEW_ROOM_MESSAGE (state, payload) {
    payload.rootData.newChatRoomMessage = payload.data.message
    payload.rootData.currentRoom.messages.push(JSON.parse(JSON.stringify(payload.data.message)))
  },
  // Добавление предыдущих сообщений в комнате
  ADD_CHAT_EARLY_ROOM_MESSAGES (state, payload) {
    payload.rootData.earlyMessages = payload.data.messages
    if (payload.rootData.currentRoom.room.id === payload.data.roomId) {
      payload.rootData.currentRoom.messages = [...payload.data.messages, ...payload.rootData.currentRoom.messages]
    }
  },
  // Удаление сообщения
  DELETE_CHAT_ROOM_MESSAGE (state, payload) {
    payload.rootData.currentRoom.messages = payload.rootData.currentRoom.messages.filter((message) => {
      return message.id !== payload.data.deleted.id
    })
    if (payload.data.last) {
      payload.rootData.chatTabList = payload.rootData.chatTabList.map((tab) => {
        if (tab.id === payload.data.last.room_id) {
          tab.message = payload.data.last.message
        }
        return tab
      })
    }
  },
  // Добавление эмодзи в сообщение
  ADD_CHAT_EMOJI_USER_MESSAGE (state, payload) {
    if (payload.rootData.userMessage) {
      payload.rootData.userMessage += payload.data
    } else {
      payload.rootData.userMessage = payload.data
    }
  },
  // Сохранение введенного пользователем сообщения
  SAVE_CHAT_USER_MESSAGE (state, payload) {
    payload.rootData.userMessage = payload.data
  },
  // Сохранение цитируемого сообщения
  SAVE_CHAT_REPLY_MESSAGE (state, payload) {
    payload.rootData.replyMessage = payload.data
    payload.rootData.userContent.answer = payload.data && payload.data.id ? payload.data.id : null
  },
  // Сохранение первой подгруженной ссылки в сообщении
  SAVE_CHAT_MESSAGE_LOAD_LINK (state, payload) {
    payload.rootData.chatMessageContent = payload.data
    payload.rootData.userContent.link.url = payload.data.url
    payload.rootData.userContent.link.title = payload.data.title
    payload.rootData.userContent.link.text = payload.data.text
    payload.rootData.userContent.link.image = payload.data.image.path
  },
  // Очистить подгруженный контент по ссылке в сообщении
  CLEAR_CHAT_MESSAGE_LOAD_LINK (state, payload) {
    payload.rootData.chatMessageContent = {
      url: null,
      title: null,
      text: null,
      image: {
        preview: null,
        url: null,
        path: null
      }
    }
    payload.rootData.userContent = {
      image: null,
      answer: null,
      // location: null, // URL текущей страницы, комнат типа ROOM_SUPPORT
      link: {
        url: null,
        title: null,
        text: null,
        image: null
      }
    }
  },
  // Сохранение изображения
  SAVE_CHAT_IMAGE_FILE (state, payload) {
    payload.rootData.socketUploaderFile = payload.data
  },
  // Сохранение аватара создаваемой комнаты
  SAVE_CHAT_ROOM_AVATAR_IMAGE (state, payload) {
    payload.rootData.roomAvatarImage = payload.data
  },
  // Сохранение информации о пользователе
  SAVE_CHAT_USER_INFO (state, payload) {
    payload.rootData.userInfo = payload.data
  },
  // Обновить свитчер уведомлений в комнате (вкл/выкл)
  UPDATE_CHAT_ROOM_NOTIFY (state, payload) {
    payload.rootData.currentRoom.room.notify = payload.data
  },
  // Обновить количество участников в комнате
  UPDATE_CHAT_ROOM_USER_COUNT (state, payload) {
    payload.rootData.currentRoom.room.users = payload.data
  },
  // Сохранить сообщение об ошибке
  SAVE_CHAT_ERROR_MESSAGE (state, payload) {
    payload.rootData.chatErrorMessage = payload.data.error
  },
  // Сохранение изображения в отправляемое сообщение
  SAVE_CHAT_MESSAGE_SOCKET_IMAGE (state, payload) {
    payload.rootData.userContent.image = payload.data
  },
  // Сохранение параметров создаваемой комнаты
  SAVE_CHAT_ROOM_PARAMETERS (state, payload) {
    payload.rootData.chatRoomParameters[payload.data.field] = payload.data.value
  },
  // Сохранение аватара создаваемой комнаты
  SAVE_CHAT_AVATAR_SOCKET_IMAGE (state, payload) {
    payload.rootData.avatarSocketImage = payload.data
    payload.rootData.chatRoomParameters.avatar = payload.data.path
  },
  // Сохранить оценку оператора службы поддержки
  UPDATE_CHAT_MESSAGE_RATING (state, payload) {
    payload.rootData.currentRoom.messages = payload.rootData.currentRoom.messages.map((message) => {
      if (message.id === payload.data.messageId && message.content.support_history) {
        message.content.support_history.rating = payload.data.rating
      }
      return message
    })
  }
}
