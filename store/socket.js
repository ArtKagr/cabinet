import { chartApi } from '@liteforex.com/lf-ui'
import SocketIoFileClient from 'socket.io-file-client'
import SocketIo from '~/plugins/socket.io.js'

export const getters = {
  // Подключенный сокет
  getSocketIo: (state, getters, rootState, rootGetters) => {
    return SocketIo(rootGetters['dictionaries/getters/user/getUser'].node_url || 'https://node-app.litemarkets.com:44380')
  },
  // Ошибки чата
  getErrorData: () => (error) => {
    switch (error) {
      case 'message_auth':
        return { title: 'Ошибка доступа', description: 'Попробуйте обновить страницу' }
      case 'message_guest':
        return { title: 'Ошибка доступа', description: 'Действие недопустимо для демо-режима' }
      case 'message_empty':
        return { title: 'Сообщение не отправлено', description: 'Сообщение не может быть пустым' }
      case 'message_max':
        return { title: 'Сообщение не отправлено', description: 'Сообщение слишком большое' }
      case 'message_public_verification':
        return { title: 'Сообщение не отправлено', description: 'Верифицируйте свой профиль для отправки сообщений' }
      case 'message_public_block':
        return { title: 'Сообщение не отправлено', description: 'Вам запрещено писать в публичные чаты. Если у вас есть вопросы - свяжитесь со службой поддержки' }
      case 'message_pm_block':
        return { title: 'Сообщение не отправлено', description: 'Вам запрещено писать в личные сообщения. Если у вас есть вопросы - свяжитесь со службой поддержки' }
      case 'message_user_block':
        return { title: 'Сообщение не отправлено', description: 'Пользователь заблокировал полчение сообщений от Вас' }
      case 'message_stop_word':
        return { title: 'Сообщение не отправлено', description: 'Публикация данных ссылок/слов запрещена, при попытке обойти данное ораничение вы будете заблокированы' }
      case 'message_complaint_sent':
        return { title: 'Жалоба на рассморении', description: 'Жалоба уже была отправлена' }
      default:
        return { title: 'error', description: 'error' }
    }
  }
}

export const actions = {
  // Загрузчик файлов через сокет
  socketFileUploader ({ state, rootState }, payload) {
    this.$uploader.upload(payload.file, { uploadTo: payload.path })
  },
  // Прослушивание подключенного сокета
  socketIoConnect ({ commit, dispatch, getters, rootState, rootGetters }) {
    const dictionaries = rootState.dictionaries.state.handler
    const chat = rootState.chat.state.handler
    const trading = rootState.trading.state.handler

    getters.getSocketIo
      // // CONFIG
      // Событие установленного соединения
      .on('connect', () => {
        console.warn('connect')

        const auth = rootGetters['dictionaries/getters/user/getAuthorization']
        const id = localStorage.getItem('user_id')
        const secret = localStorage.getItem('secret_id')

        if (!auth.id && !auth.secret_id) {
          getters.getSocketIo.emit('user_init', { id, secret })
        }
      })
      // Событие успешной авторизации пользователя
      .on('ready', (payload) => {
        console.warn('ready', payload)
        setTimeout(() => dispatch('trading/actions/handler/tradingInit', null, { root: true }), 1000)
        setTimeout(() => dispatch('trading/actions/handler/tradingStatistics', localStorage.getItem('trading_statistics_period') || '1m', { root: true }), 1500)
        dispatch('chat/actions/handler/fetchRoomsList', null, { root: true })
        // Открыть комнату по query параметру
        const query = rootGetters['dictionaries/getters/handler/getRoute'].query
        if (query && (query.openRoom || query.openPm)) {
          dispatch('chat/actions/handler/openCurrentRoom', { room_id: Number(query.openRoom || query.openPm) }, { root: true })
          commit('chat/mutations/handler/TOGGLE_CHAT_SIDEBAR', { rootData: chat, data: true }, { root: true })
        }
        // Создание загрузчика файлов через сокет
        this.$uploader = new SocketIoFileClient(getters.getSocketIo)
          .on('start', (payload) => {
            commit('dictionaries/mutations/handler/UPDATE_SOCKET_UPLOADER_STATUSES', { rootData: dictionaries, data: { start: true, size: payload.size } }, { root: true })
          })
          .on('stream', (payload) => {
            commit('dictionaries/mutations/handler/UPDATE_SOCKET_UPLOADER_STATUSES', { rootData: dictionaries, data: { sent: payload.sent } }, { root: true })
          })
          .on('complete', (payload) => {
            commit('dictionaries/mutations/handler/UPDATE_SOCKET_UPLOADER_STATUSES', {
              rootData: dictionaries,
              data: { start: false, finish: true, sent: payload.wrote }
            }, { root: true })
            commit('dictionaries/mutations/handler/UPDATE_SOCKET_UPLOADER_STATUSES', {
              rootData: dictionaries,
              data: { start: false, finish: false, sent: null, size: null }
            }, { root: true })
          })
          .on('error', (payload) => {
            console.warn('error', payload)
          })
          .on('abort', (payload) => {
            console.warn('abort', payload)
          })

        // Открытие активной при прошлой сессии комнаты чата
        const chatData = localStorage.getItem('chat_room')

        if (chatData) {
          commit('chat/mutations/handler/TOGGLE_CHAT_SIDEBAR', { rootData: chat, data: true }, { root: true })
          commit('chat/mutations/handler/TOGGLE_CHAT_CURRENT_ROOM', { rootData: chat, data: true }, { root: true })
          dispatch('chat/actions/handler/openCurrentRoom', JSON.parse(chatData), { root: true })
        }
      })
      //
      .on('auth_failed', (payload) => {
        console.warn('auth_failed', payload)
      })
      //
      .on('disconnect', (payload) => {
        console.warn('disconnect', payload)
      })
      //
      .on('connect_error', (payload) => {
        console.warn('connect_error', payload)
      })
      //
      .on('refresh_browser', (payload) => {
        console.warn('refresh_browser', payload)
      })
      // // CHAT ROOM
      // Список комнат
      .on('chat_room_list', (payload) => {
        commit('chat/mutations/handler/SAVE_CHAT_TAB_LIST', { rootData: chat, data: payload.list }, { root: true })
      })
      // Открытие комнаты
      .on('chat_room_open', (payload) => {
        console.warn('chat_room_open', payload)
        if (payload.room) {
          commit('chat/mutations/handler/SAVE_CHAT_CURRENT_ROOM', { rootData: chat, data: payload }, { root: true })
          dispatch('chat/actions/handler/chatRoomRead', null, { root: true })
          dispatch('chat/actions/handler/joinRoom', payload.room, { root: true })
          commit('chat/mutations/handler/TOGGLE_CHAT_CURRENT_ROOM', { rootData: chat, data: true }, { root: true })

          if (rootGetters['chat/getters/handler/getActiveChatTab'] === 'search') {
            commit('chat/mutations/handler/SAVE_ACTIVE_CHAT_TAB', {
              rootData: chat,
              data: [1, 2, 3, 6, 7].includes(rootGetters['chat/getters/handler/getCurrentRoom'].room.type) ? 'chat' : 'channel'
            }, { root: true })
          }
        }
      })
      // Прочтение комнаты
      .on('chat_room_read', () => {
        dispatch('chat/actions/handler/fetchRoomsList', null, { root: true })
      })
      // Поиск комнат
      .on('chat_room_search', (payload) => {
        commit('chat/mutations/handler/SAVE_SEARCHED_ROOMS_LIST', { rootData: chat, data: payload.list }, { root: true })
      })
      // Присоединиться / покинуть комнату
      .on('chat_room_joined_switch', (payload) => {
        dispatch('chat/actions/handler/fetchRoomsList', null, { root: true })
        commit('chat/mutations/handler/TOGGLE_CHAT_CURRENT_ROOM', { rootData: chat, data: payload.value }, { root: true })
      })
      // Обновление количества участников в комнате
      .on('chat_room_user_count', (payload) => {
        commit('chat/mutations/handler/UPDATE_CHAT_ROOM_USER_COUNT', { rootData: chat, data: payload.usersCount }, { root: true })
      })
      // Включение/отключение уведомлений в комнате
      .on('chat_room_notify_switch', (payload) => {
        commit('chat/mutations/handler/UPDATE_CHAT_ROOM_NOTIFY', { rootData: chat, data: payload.value }, { root: true })
        dispatch('dictionaries/actions/handler/openSuccessToast', { description: 'success' }, { root: true })
      })
      // Жалоба на сообщение
      .on('chat_message_complaint', () => {
        dispatch('dictionaries/actions/handler/openSuccessToast', { description: 'success' }, { root: true })
      })
      // Удаление сообщения
      .on('chat_message_delete', (payload) => {
        commit('chat/mutations/handler/DELETE_CHAT_ROOM_MESSAGE', { rootData: chat, data: payload }, { root: true })
      })
      // Сообщения об ошибках
      .on('chat_error', (payload) => {
        commit('chat/mutations/handler/SAVE_CHAT_ERROR_MESSAGE', { rootData: chat, data: payload.error }, { root: true })
      })
      // Создание комнаты
      .on('chat_room_create', (payload) => {
        rootGetters['socket/getSocketIo'].emit('chat_room_open', payload)
        commit('chat/mutations/handler/SAVE_ACTIVE_CHAT_TAB', {
          rootData: chat,
          data: rootGetters['chat/getters/handler/getChatRoomParameters'].type === 2 ? 'chat' : 'channel'
        }, { root: true })
        dispatch('chat/actions/handler/fetchRoomsList', null, { root: true })
        commit('chat/mutations/handler/SAVE_CHAT_AVATAR_SOCKET_IMAGE', { rootData: chat, data: { path: null, url: null } }, { root: true })
        commit('chat/mutations/handler/SAVE_CHAT_ROOM_AVATAR_IMAGE', { rootData: chat, data: null }, { root: true })
      })
      // // CHAT MESSAGE
      // Новое сообщение в открытой комнате
      .on('chat_message_new', (payload) => {
        commit('chat/mutations/handler/ADD_CHAT_NEW_ROOM_MESSAGE', { rootData: chat, data: payload }, { root: true })
      })
      // Новое сообщение не в открытой комнате
      .on('chat_room_list_new_message', (payload) => {
        commit('chat/mutations/handler/UPDATE_CHAT_TAB_LIST', { rootData: chat, data: payload }, { root: true })
      })
      // Загрузка истории сообщений (предыдущие сообщения)
      .on('chat_messages_history', (payload) => {
        commit('chat/mutations/handler/ADD_CHAT_EARLY_ROOM_MESSAGES', { rootData: chat, data: payload }, { root: true })
      })
      // Оценка оператора службы поддержки
      .on('chat_support_rating', (payload) => {
        commit('chat/mutations/handler/UPDATE_CHAT_MESSAGE_RATING', { rootData: chat, data: payload }, { root: true })
      })
      // // CHAT USER
      // Блокировка/разблокировка пользователя
      .on('chat_user_block_switch', (payload) => {
        dispatch('chat/actions/handler/openCurrentRoom', { id: payload.userId }, { root: true })
      })
      // Получение информации о пользователе
      .on('chat_user_info', (payload) => {
        commit('chat/mutations/handler/SAVE_CHAT_USER_INFO', { rootData: chat, data: payload.userInfo }, { root: true })
      })
      // Подгрузка контента по ссылке
      .on('chat_message_load_link', (payload) => {
        commit('chat/mutations/handler/SAVE_CHAT_MESSAGE_LOAD_LINK', { rootData: chat, data: payload.link }, { root: true })
      })
      // // CHAT FILE CLIENT
      // Файл загружен
      .on('chat_upload_file_complete', (payload) => {
        commit('dictionaries/mutations/handler/SAVE_SOCKET_UPLOADER_FILE', { rootData: dictionaries, data: payload }, { root: true })
        commit('chat/mutations/handler/SAVE_CHAT_MESSAGE_SOCKET_IMAGE', { rootData: chat, data: payload.path }, { root: true })
      })
      // Аватарка загружена
      .on('chat_upload_avatar_complete', (payload) => {
        commit('chat/mutations/handler/SAVE_CHAT_AVATAR_SOCKET_IMAGE', { rootData: chat, data: payload }, { root: true })
      })
      // // CHAT ERROR
      .on('chat_error', ({ error, data }) => {
        dispatch('dictionaries/actions/handler/openSuccessToast', getters.getErrorData(error), { root: true })
      })
      // // TRADING
      // Получение данных торговли
      .on('trading_init', (payload) => {
        console.warn('trading_init', payload)
        commit('trading/mutations/socket/account/TRADING_INIT', { rootData: trading, data: payload }, { root: true })
        dispatch('trading/actions/handler/tradingStatistics', rootGetters['traders/getters/handler/getActivePeriod'], { root: true })
        dispatch('trading/actions/handler/tradingCardsSort', null, { root: true })
      })
      // Статистика по инструментам
      .on('trading_statistics', (payload) => {
        console.warn('trading_statistics', payload)
        commit('trading/mutations/socket/account/SAVE_TRADING_STATISTICS', { rootData: trading, data: payload }, { root: true })
        dispatch('trading/actions/handler/tradingCardsSort', null, { root: true })
      })
      // Полная информация по инструменту
      .on('trading_instrument', (payload) => {
        console.warn('trading_instrument', payload)
        commit('trading/mutations/socket/instrument/SAVE_INSTRUMENT_FULL', { rootData: trading, data: payload.instrument }, { root: true })
      })
      // Добавление / обновление инструментов
      .on('instruments_update', (payload) => {
        console.warn('instruments_update', payload)
        commit('trading/mutations/socket/instrument/INSTRUMENTS_UPDATE', { rootData: trading, data: payload }, { root: true })
      })
      // Переключатель "избранного" инструмента
      .on('trading_favorite_update', (payload) => {
        console.warn('trading_favorite_update', payload)
        commit('trading/mutations/socket/instrument/TOGGLE_FAVORITE_INSTRUMENT', { rootData: trading, data: payload }, { root: true })
      })
      // Добавление / обновление сделки в основной аккаунт / инвестицию
      .on('trading_update_trade', (payload) => {
        console.warn('trading_update_trade', payload)
        commit('trading/mutations/socket/trade/UPDATE_TRADE', { rootData: trading, data: payload.trade }, { root: true })
      })
      // Удаление сделки из основного аккаунта / инвестиции
      .on('trading_delete_trade', (payload) => {
        console.warn('trading_delete_trade', payload)
        commit('trading/mutations/socket/trade/DELETE_TRADE', { rootData: trading, data: payload.trade }, { root: true })
      })
      // Добавление / обновление инвестиции
      .on('investment_update', (payload) => {
        console.warn('investment_update', payload)
        commit('trading/mutations/socket/investment/INVESTMENT_UPDATE', { rootData: trading, data: payload }, { root: true })
      })
      // Удаление инвестиции
      .on('investment_delete', (payload) => {
        console.warn('investment_delete', payload)
        commit('trading/mutations/socket/investment/INVESTMENT_DELETE', { rootData: trading, data: payload }, { root: true })
      })
      // Обновление статуса инвестиции
      .on('investment_status', (payload) => {
        console.warn('investment_status', payload)
        commit('trading/mutations/socket/investment/INVESTMENT_STATUS_UPDATE', { rootData: trading, data: payload }, { root: true })
      })
      // Открытие позиции
      .on('position_open_response', (payload) => {
        console.warn('position_open_response', payload)
        dispatch('dictionaries/actions/handler/togglePreloader', false, { root: true })
        if (payload.trade.status === 'invalid') {
          dispatch('dictionaries/actions/handler/openErrorToast', { description: payload.trade.error }, { root: true })
        } else {
          dispatch('dictionaries/actions/handler/toggleTradeOpenPopup', true, { root: true })
          commit('trading/mutations/socket/trade/UPDATE_POSITION', { rootData: trading, data: payload }, { root: true })
        }
      })
      // Изменение позиции
      .on('position_modify_response', (payload) => {
        console.warn('position_modify_response', payload)
        if (payload.trade.status === 'invalid') {
          dispatch('dictionaries/actions/handler/openErrorToast', { description: payload.trade.error }, { root: true })
        } else {
          commit('trading/mutations/socket/trade/UPDATE_POSITION', { rootData: trading, data: payload }, { root: true })
        }
      })
      // Закрытие позиции
      .on('position_close_response', (payload) => {
        console.warn('position_close_response', payload)
        dispatch('dictionaries/actions/handler/togglePreloader', false, { root: true })
        if (payload.trade.status === 'invalid') {
          dispatch('dictionaries/actions/handler/openErrorToast', { description: payload.trade.error }, { root: true })
        } else {
          dispatch('dictionaries/actions/handler/toggleTradeClosePopup', true, { root: true })
          commit('trading/mutations/socket/trade/UPDATE_POSITION', { rootData: trading, data: payload }, { root: true })
        }
      })
      // Обновление котировок
      .on('q', (payload) => {
        // console.warn('q', payload)
        commit('trading/mutations/socket/quote/UPDATE_QUOTES', { rootData: trading, data: payload }, { root: true })
      })
      // Обновление котировок графика
      .on('c', (payload) => {
        // console.warn('с', payload)
        const [, symbol, bid, ask, timestamp, volumeDif, sequenceNumber] = payload
        if (chartApi) {
          chartApi.onPriceUpdate({ symbol, ask, bid, timestamp, volumeDif, sequenceNumber })
        }
      })
      .on('trading_update_bet', ({ trade }) => {
        // console.warn('trading_update_bet', trade)
        if (chartApi) {
          chartApi.onBetUpdate({
            betId: trade.order,
            openTime: trade.open_time,
            closeTime: trade.close_time,
            openPrice: trade.open_price,
            closePrice: trade.close_price,
            betDirection: trade.cmd,
            stopLoss: trade.sl,
            takeProfit: trade.tp,
            amount: trade.amount,
            profit: trade.total,
            betCurrency: trade.currency
          })
        }
      })
      //
      .on('trading_signals_symbol', (payload) => {
        commit('trading/mutations/socket/trade/TRADING_SIGNALS_SYMBOL', { rootData: trading, data: payload }, { root: true })
      })
      // // TRADING POPUPS
      // Открытие ордера
      .on('order_open_response', (payload) => {
        console.warn('order_open_response', payload)
        dispatch('dictionaries/actions/handler/togglePreloader', false, { root: true })
        if (payload.trade.status === 'invalid') {
          dispatch('dictionaries/actions/handler/openErrorToast', { description: payload.trade.error }, { root: true })
        } else {
          dispatch('dictionaries/actions/handler/toggleTradeOpenPopup', true, { root: true })
          commit('trading/mutations/socket/trade/UPDATE_POSITION', { rootData: trading, data: payload }, { root: true })
        }
      })
      // Изменение ордера
      .on('order_modify_response', (payload) => {
        console.warn('order_modify_response', payload)
        if (payload.trade.status === 'invalid') {
          dispatch('dictionaries/actions/handler/openErrorToast', { description: payload.trade.error }, { root: true })
        } else {
          commit('trading/mutations/socket/trade/UPDATE_POSITION', { rootData: trading, data: payload }, { root: true })
        }
      })
      // Закрытие ордера
      .on('order_close_response', (payload) => {
        console.warn('order_close_response', payload)
        dispatch('dictionaries/actions/handler/togglePreloader', false, { root: true })
        if (payload.trade.status === 'invalid') {
          dispatch('dictionaries/actions/handler/openErrorToast', { description: payload.trade.error }, { root: true })
        } else {
          dispatch('dictionaries/actions/handler/toggleTradeClosePopup', true, { root: true })
          commit('trading/mutations/socket/trade/UPDATE_POSITION', { rootData: trading, data: payload }, { root: true })
        }
      })
      // // BALANCE CREDIT
      // Обновление баланса
      .on('trading_update_balance', (payload) => {
        console.warn('trading_update_balance', payload)
        commit('trading/mutations/socket/balance/UPDATE_TRADING_BALANCE', { rootData: trading, data: payload.trade }, { root: true })
      })
      // Обновление кредита
      .on('trading_update_credit', (payload) => {
        console.warn('trading_update_credit', payload)
        commit('trading/mutations/socket/balance/UPDATE_TRADING_CREDIT', { rootData: trading, data: payload.trade }, { root: true })
      })
  }
}
