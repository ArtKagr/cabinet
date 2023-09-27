export const mutations = {
  // Показать / скрыть preloader
  TOGGLE_PRELOADER (state, payload) {
    payload.rootData.isPreloaderShown = payload.data
  },
  // Показать / скрыть модальное окно
  TOGGLE_MODAL (state, payload) {
    payload.rootData.isModalShown = payload.data
  },
  // Показать / скрыть попап
  TOGGLE_POPUP (state, payload) {
    payload.rootData.isPopupShown = payload.data
  },
  //
  SAVE_POPUP_NAME (state, payload) {
    payload.rootData.currentPopup = payload.data
  },
  // Расстояние до низа экрана
  SAVE_SCROLL_BOTTOM_VALUE (state, payload) {
    payload.rootData.scrollBottom = payload.data
  },
  // Изменение актуального размера экрана
  SET_CURRENT_WINDOW_WIDTH (state, payload) {
    payload.rootData.currentWindowWidth = payload.rootData.sizes.find((item) => {
      return item.size > payload.data || item.size === payload.data
    })
    payload.rootData.currentTradingWindowWidth = payload.rootData.tradingSizes.find((item) => {
      return item.size > payload.data || item.size === payload.data
    })
    // Сохранение размера экрана в пикселях
    payload.rootData.currentNumberWindowWidth = Number(payload.data)
  },
  // Высота экрана
  SET_CURRENT_WINDOW_HEIGHT (state, payload) {
    payload.rootData.currentWindowHeight = payload.data
  },
  // Изменение активной вкладки главного меню
  SAVE_ACTIVE_MAIN_MENU_BUTTON (state, payload) {
    payload.rootData.activeMainMenuButton = payload.data
  },
  // Активная вкладка меню страницы
  SET_ACTIVE_MENU_ITEM (state, payload) {
    payload.rootData.activeMenuItem = payload.data
  },
  //
  SET_ACTIVE_MENU_LINKS_ITEM (state, payload) {
    payload.rootData.activeMenuLinksItem = payload.data
  },
  // Сохранение активного попапа
  SAVE_ACTIVE_POPUP (state, payload) {
    payload.rootData.activePopup = payload.data
  },
  // Сохранение тоста
  SAVE_TOAST (state, payload) {
    payload.rootData.messageToast.title = payload.data.title
    payload.rootData.messageToast.description = payload.data.description
    payload.rootData.messageToast.variant = payload.data.variant
    payload.rootData.messageToast.shown = true
  },
  // Отображение тоста
  TOGGLE_TOAST (state, payload) {
    payload.rootData.messageToast.shown = payload.data
  },
  // Изменение активной формы
  SAVE_ACTIVE_FORM (state, payload) {
    payload.rootData.activeForm = Object.assign(JSON.parse(JSON.stringify(payload.rootData.activeForm)), payload.data)
  },
  // Очистка активной формы
  CLEAR_ACTIVE_FORM (state, payload) {
    Object.keys(payload.rootData.activeForm).forEach((field) => {
      payload.rootData.activeForm[field] = null
    })
  },
  // Необходимые для верификации документы
  SAVE_NEED_DOCS (state, payload) {
    payload.rootData.needDocs = payload.data
  },
  // Сохранение статуса загруженного документа
  SAVE_UPLOAD_DOCUMENT_STATUS (state, payload) {
    payload.rootData.uploadDocumentStatus = payload.data
  },
  // Сохранение статуса загруженного документа (phone doc)
  SAVE_UPLOAD_PHONE_DOC_STATUS (state, payload) {
    payload.rootData.uploadPhoneDocStatus = payload.data
  },
  // Сохранение статуса загруженного документа (phone doc contract)
  SAVE_UPLOAD_PHONE_DOC_CONTRACT_STATUS (state, payload) {
    payload.rootData.uploadPhoneDocContractStatus = payload.data
  },
  // Сохранение статуса загруженного документа (card front)
  SAVE_UPLOAD_CARD_FRONT_STATUS (state, payload) {
    payload.rootData.uploadCardFrontStatus = payload.data
  },
  // Сохранение статуса загруженного документа (card back)
  SAVE_UPLOAD_CARD_BACK_STATUS (state, payload) {
    payload.rootData.uploadCardBackStatus = payload.data
  },
  //
  SAVE_RISK_ACCEPTANCE_STATUS (state, payload) {
    payload.rootData.riskAcceptanceStatus = payload.data
  },
  //
  SAVE_PEP_STATUS (state, payload) {
    payload.rootData.pepStatus = payload.data
  },
  // Обновление статусов сокет загрузчика
  UPDATE_SOCKET_UPLOADER_STATUSES (state, payload) {
    payload.rootData.socketUploaderStatuses = Object.assign(payload.rootData.socketUploaderStatuses, payload.data)
  },
  // Сохранение файла загруженного через сокет
  SAVE_SOCKET_UPLOADER_FILE (state, payload) {
    payload.rootData.socketUploaderFile = payload.data
  },
  // Сохранение роутинга
  SAVE_ROUTE (state, payload) {
    const query = payload.data.query

    if (query.country) {
      localStorage.setItem('country', query.country)
    }
    if (query.uid) {
      localStorage.setItem('uid', query.uid)
    }
    if (query.cid) {
      localStorage.setItem('cid', query.cid)
    }
    if (query.promo_code) {
      localStorage.setItem('promo_code', query.promo_code)
    }

    payload.rootData.route = payload.data
  },
  // Сохранение результатов поиска по кабинету
  SAVE_CABINET_SEARCH (state, payload) {
    payload.rootData.cabinetSearch = Object.assign(payload.rootData.cabinetSearch, payload.data)
  },
  TOGGLE_SEARCH_POPUP (state, payload) {
    payload.rootData.isSearchPopupShown = payload.data
  },
  TOGGLE_CHART_SHOWN_FLAG (state, payload) {
    payload.rootData.isChartShown = payload.data
  },
  TOGGLE_TRADE_OPEN_SHOWN_FLAG (state, payload) {
    payload.rootData.isTradeOpenShown = payload.data
  },
  TOGGLE_TRADE_CLOSE_SHOWN_FLAG (state, payload) {
    payload.rootData.isTradeCloseShown = payload.data
  },
  // Выбор языка
  SET_CURRENT_LANGUAGE (state, payload) {
    payload.rootData.currentLanguage = payload.data
  },
  //
  SAVE_EMPTY_LAYOUT_TEXT (state, payload) {
    payload.rootData.emptyLayoutText = payload.data
  }
}
