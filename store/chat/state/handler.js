export const state = () => ({
  // Сайдбар чата открыт/закрыт
  isChatSidebarOpen: false,
  // Активный таб в сайдбаре
  activeChatTab: 'chat',
  // Список комнат/каналов
  chatTabList: [],
  // Комната/канал чата открыт/закрыт
  isCurrentRoomOpen: false,
  // Найденные чаты/каналы
  searchedRooms: [],
  // Открытая комната
  currentRoom: {
    messages: [],
    room: {
      avatar_name: null,
      avatar_url: null,
      id: null,
      joined: false,
      notify: false,
      role: null,
      title: null,
      type: null,
      user_block: false,
      user_id: null,
      users: null
    }
  },
  earlyMessages: [],
  // Выбранное сообщение
  activeMessage: {
    avatar_name: null,
    avatar_url: null,
    chat_role: null,
    content: null,
    date: null,
    id: null,
    is_previous_same: null,
    message: null,
    user_id: null,
    username: null
  },
  // Попап чата
  sidebarPopup: {
    shown: false,
    source: null
  },
  // Поисковая строка
  desiredRoom: null,
  // Вводимое пользователем сообщение
  userMessage: '',
  // Цитируемое сообщение
  replyMessage: null,
  // Подгруженный по ссылке контент
  chatMessageContent: {
    url: null,
    title: null,
    text: null,
    image: {
      preview: null,
      url: null,
      path: null
    }
  },
  // Data загруженного в браузер изображения
  imageFile: null,
  // Аватар создаваемой комнаты в чате
  roomAvatarImage: null,
  // Прикрепленный к сообщению контент
  userContent: {
    image: null, // путь к картинке на сервере
    answer: null, // идентификатор цитируемого сообщения
    // location: null, // URL текущей страницы, комнат типа ROOM_SUPPORT
    link: {
      url: null, // URL страницы
      title: null, // заголовок
      text: null, // описание
      image: null // путь к картинке на сервере
    }
  },
  // Новое сообщение в открытой комнате
  newChatRoomMessage: {
    avatar_name: null,
    avatar_url: null,
    chat_role: null,
    content: null,
    date: null,
    id: null,
    message: null,
    user_id: null,
    username: null
  },
  // Информация о пользователе
  userInfo: {
    avatar_name: null,
    avatar_url: null,
    full_name: null,
    id: null,
    is_trader: null,
    profit: null,
    username: null
  },
  // Сообщение об ошибке в чате
  chatErrorMessage: null,
  // Создаваемая комната
  chatRoomParameters: {
    type: 2,
    title: null,
    description: null,
    avatar: null
    // x1: null,
    // x2: null,
    // y1: null,
    // y2: null
  },
  avatarSocketImage: {
    path: null,
    url: null
  },
  //
  activeMessageImageUrl: null
})
