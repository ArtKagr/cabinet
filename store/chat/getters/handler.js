import moment from 'moment'

export const getters = {
  // Сайдбар чата открыт/закрыт
  getIsChatSidebarOpen: (state, getters, rootState) => rootState.chat.state.handler.isChatSidebarOpen,
  // Активный таб в сайдбаре чата
  getActiveChatTab: (state, getters, rootState) => rootState.chat.state.handler.activeChatTab,
  // Список комнат/каналов
  getChatTabList: (state, getters, rootState) => JSON.parse(JSON.stringify(rootState.chat.state.handler.chatTabList)),
  // Комнаты/каналы в активном табе
  getActiveChatTabList: (state, getters) => {
    if (getters.getActiveChatTab === 'search') {
      return getters.getSearchedRooms
    } else {
      const roomsMask = getters.getActiveChatTab === 'chat' ? { 7: 1, 6: 2, 2: 3, 1: 4, 3: 5 } : { 5: 1, 4: 2 }

      return getters.getChatTabList
        .reduce((preVal, item, index, rooms) => {
          Object.keys(roomsMask).forEach((type) => {
            rooms.forEach((room) => {
              if (Number(type) === room.type && roomsMask[room.type] === index) {
                preVal.push(room)
              }
            })
          })
          return preVal
        }, [])
    }
  },
  // Комната/канал в сайдбаре чата открыт/закрыт
  getIsCurrentRoomOpen: (state, getters, rootState) => rootState.chat.state.handler.isCurrentRoomOpen,
  // Непрочитанные чаты
  getUnreadChats: (state, getters) => {
    return JSON.parse(JSON.stringify(getters.getChatTabList)).reduce((preVal, room) => {
      if (room.tab === 'chat' && room.new) {
        preVal += 1
      }
      return preVal
    }, 0)
  },
  // Непрочитанные каналы
  getUnreadChannels: (state, getters) => {
    return JSON.parse(JSON.stringify(getters.getChatTabList)).reduce((preVal, room) => {
      if (room.tab === 'channel' && room.new) {
        preVal += 1
      }
      return preVal
    }, 0)
  },
  // Найденные чаты/каналы
  getSearchedRooms: (state, getters, rootState) => JSON.parse(JSON.stringify(rootState.chat.state.handler.searchedRooms)),
  // Открытая комната
  getCurrentRoom: (state, getters, rootState) => {
    const currentRoom = JSON.parse(JSON.stringify(rootState.chat.state.handler.currentRoom))
    let messages = currentRoom.messages.reduce((preVal, message) => {
      if (preVal.length === 0 || preVal.every(currentMessage => currentMessage.id !== message.id)) {
        preVal.push(message)
      }
      return preVal
    }, [])
    messages = messages.reduce((preVal, message, index, messages) => {
      if (!preVal.length) {
        message.is_previous_same = false
      } else {
        message.is_previous_same =
          messages[index - 1].user_id === message.user_id &&
          moment.unix(messages[index - 1].date).format('DD.MM.YYYY') === moment.unix(message.date).format('DD.MM.YYYY')
      }
      preVal.push(message)
      return preVal
    }, [])
    return { room: currentRoom.room, messages }
  },
  // Выбранное сообщение
  getActiveMessage: (state, getters, rootState) => rootState.chat.state.handler.activeMessage,
  // Попап чата
  getSidebarPopup: (state, getters, rootState) => rootState.chat.state.handler.sidebarPopup,
  // Поисковая строка
  getDesiredRoom: (state, getters, rootState) => rootState.chat.state.handler.desiredRoom,
  // Предыдущие сообщения в комнате
  getEarlyMessages: (state, getters, rootState) => rootState.chat.state.handler.earlyMessages,
  // Цитируемое сообщение
  getReplyMessage: (state, getters, rootState) => JSON.parse(JSON.stringify(rootState.chat.state.handler.replyMessage)),
  // Data загруженного в браузер изображения
  getImageFile: (state, getters, rootState) => rootState.chat.state.handler.imageFile,
  // Вводимое пользователем сообщение
  getUserMessage: (state, getters, rootState) => rootState.chat.state.handler.userMessage,
  // Прикрепленный к сообщению контент
  getUserContent: (state, getters, rootState) => rootState.chat.state.handler.userContent,
  // Новое сообщение в открытой комнате
  getNewChatRoomMessage: (state, getters, rootState) => rootState.chat.state.handler.newChatRoomMessage,
  // Получение id комнаты
  getCurrentChatRoomId: () => (room) => {
    let payload = {}
    if (room.id) {
      payload.roomId = room.id
    } else if (room.room_id) {
      payload.roomId = room.room_id
    } else if (room.user_id) {
      payload.userId = room.user_id
    } else if (room.roomId || room.userId) {
      payload = room
    }
    localStorage.setItem('chat_room', JSON.stringify(payload))
    return payload
  },
  // Информация о пользователе
  getUserInfo: (state, getters, rootState) => rootState.chat.state.handler.userInfo,
  // Сообщение об ошибке в чате
  getChatErrorMessage: (state, getters, rootState) => rootState.chat.state.handler.chatErrorMessage,
  // Создаваемая комната
  getChatRoomParameters: (state, getters, rootState) => JSON.parse(JSON.stringify(rootState.chat.state.handler.chatRoomParameters)),
  // Подгруженный по ссылке контент
  getChatMessageContent: (state, getters, rootState) => JSON.parse(JSON.stringify(rootState.chat.state.handler.chatMessageContent)),
  // Аватар создаваемой комнаты в чате
  getRoomAvatarImage: (state, getters, rootState) => JSON.parse(JSON.stringify(rootState.chat.state.handler.roomAvatarImage)),
  // Аватар создаваемой комнаты
  getAvatarSocketImage: (state, getters, rootState) => JSON.parse(JSON.stringify(rootState.chat.state.handler.avatarSocketImage)),
  //
  getActiveMessageImageUrl: (state, getters, rootState) => rootState.chat.state.handler.activeMessageImageUrl
}
