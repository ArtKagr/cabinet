import moment from 'moment/moment'

export const getters = {
  getIsTradeOpenShown: (state, getters, rootState) => rootState.dictionaries.state.handler.isTradeOpenShown,
  //
  getIsTradeCloseShown: (state, getters, rootState) => rootState.dictionaries.state.handler.isTradeCloseShown,
  //
  getIsChartShown: (state, getters, rootState) => rootState.dictionaries.state.handler.isChartShown,
  //
  getIsSearchPopupShown: (state, getters, rootState) => rootState.dictionaries.state.handler.isSearchPopupShown,
  //
  getIsPreloaderShown: (state, getters, rootState) => rootState.dictionaries.state.handler.isPreloaderShown,
  //
  getIsModalShown: (state, getters, rootState) => rootState.dictionaries.state.handler.isModalShown,
  //
  getIsPopupShown: (state, getters, rootState) => rootState.dictionaries.state.handler.isPopupShown,
  // Head страницы
  getHeadTitle: (state, getters, rootState, rootGetters) => (title) => {
    const description = rootGetters['dictionaries/getters/user/getUser'].is_eu
      ? 'Liteforex (Europe) Ltd'
      : 'LiteFinance Global LLC'
    return getters.getIsRtlMode
      ? `${description} - ${title}`
      : `${title} — ${description}`
  },
  // RTL mode
  getIsRtlMode: (state, getters) => {
    return ['ar', 'fa', 'ur'].includes(getters.getRoutePages.locale)
  },
  // Роутинг и query параметры
  getRoute: (state, getters, rootState) => JSON.parse(JSON.stringify(rootState.dictionaries.state.handler.route)),
  // Страницы роутинга
  getRoutePages: (state, getters) => {
    return getters.getRoute.path
      .split('/')
      .filter(item => item !== '')
      .reverse()
      .reduce((preVal, item, index, items) => {
        switch (items.length) {
          case 1:
            preVal.locale = item
            break
          case 2:
            switch (index) {
              case 0:
                preVal.current = item
                break
              case 1:
                preVal.locale = item
                break
            }
            break
          case 3:
            switch (index) {
              case 0:
                preVal.current = item
                break
              case 1:
                preVal.parent = item
                break
              case 2:
                preVal.locale = item
                break
            }
            break
          case 4:
            switch (index) {
              case 0:
                preVal.current = item
                break
              case 1:
                preVal.second = item
                break
              case 2:
                preVal.parent = item
                break
              case 3:
                preVal.locale = item
                break
            }
            break
          case 5:
            switch (index) {
              case 0:
                preVal.current = item
                break
              case 1:
                preVal.third = item
                break
              case 2:
                preVal.second = item
                break
              case 3:
                preVal.parent = item
                break
              case 4:
                preVal.locale = item
                break
            }
            break
        }
        return preVal
      }, {})
  },
  // Страницы с нижним сайдбаром
  getBottomSidebarIsVisible: (state, getters, rootState, rootGetters) => {
    return ['trading', 'traders', 'profile'].includes(getters.getRoutePages.parent) ||
    !getters.getRoutePages.current ||
    getters.getRoutePages.current === 'profile' ||
    rootGetters['dictionaries/getters/user/getUser'].mode === 2
  },
  // Видимость хэдера
  getHeaderIsHidden: (state, getters, rootState, rootGetters) => {
    return !(
      (getters.getRoutePages.parent === 'trading' || getters.getRoutePages.parent === 'traders') &&
      getters.getRoutePages.second &&
      !getters.getRoutePages.third &&
      getters.getRoutePages.current &&
      rootGetters['dictionaries/getters/handler/getCurrentWindowWidth'] === 'sm'
    )
  },
  // Выбранная страна при регистрации относится к европейской
  getIsEuCountry: (state, getters, rootState) => rootState.dictionaries.state.handler.isEuCountry,
  // Активная вкладка главного меню
  getActiveMainMenuButton: (state, getters, rootState) => rootState.dictionaries.state.handler.activeMainMenuButton,
  // Актуальный размер экрана в пикселях
  getCurrentNumberWindowWidth: (state, getters, rootState) => JSON.parse(JSON.stringify(rootState.dictionaries.state.handler.currentNumberWindowWidth)),
  // Актуальный размер адаптива
  getCurrentWindowWidth: (state, getters, rootState) => JSON.parse(JSON.stringify(rootState.dictionaries.state.handler.currentWindowWidth.flag)),
  // Актуальный размер адаптива (расширенные параметры)
  getCurrentTradingWindowWidth: (state, getters, rootState) => JSON.parse(JSON.stringify(rootState.dictionaries.state.handler.currentTradingWindowWidth.flag)),
  // Актуальная высота экрана
  getCurrentWindowHeight: (state, getters, rootState) => rootState.dictionaries.state.handler.currentWindowHeight,
  // Активный "тост" (сообщение успех/ошибка/предупреждение/инфо)
  getMessageToast: (state, getters, rootState) => JSON.parse(JSON.stringify(rootState.dictionaries.state.handler.messageToast)),
  // Активная вкладка меню страницы
  getActiveMenuItem: (state, getters, rootState) => rootState.dictionaries.state.handler.activeMenuItem,
  //
  getActiveMenuLinksItem: (state, getters, rootState) => rootState.dictionaries.state.handler.activeMenuLinksItem,
  // Значения (координаты) актуальной формы
  getActiveForm: (state, getters, rootState) => JSON.parse(JSON.stringify(rootState.dictionaries.state.handler.activeForm)),
  // Наличие у страницы вертикального скролла
  getHasPageVerScroll: (state, getters, rootState) => rootState.dictionaries.state.handler.hasPageVerScroll,
  // Параметры запроса к серверу
  getParams: (state, getters, rootState, rootGetters) => {
    const activeFormPage = rootGetters['dictionaries/getters/handler/getActiveForm'].page
    const token = rootGetters['dictionaries/getters/user/getAuthorization'].token || localStorage.getItem('user_token')
    const server = rootGetters['metatrader/getters/handler/getPrimaryAccount'].server
    const login = rootGetters['metatrader/getters/handler/getPrimaryAccount'].login
    // const country = rootState.forms.state.authorization.form.registration.find(field => field.attribute === 'country').value
    return {
      params: {
        token,
        server: activeFormPage === 'metatrader' ? server : null,
        login: activeFormPage === 'metatrader' ? login : null,
        // country: activeFormPage === 'authorization' ? country : null,
        method: activeFormPage === 'finance' ? rootGetters['finance/getters/handler/getActiveMethod'] : null,
        _lang: getters.getRoutePages.locale
        // country: getters.getRouteQueries.country
        //   ? getters.getRouteQueries.country
        //   : getters.getCountry.current.flag,
        // uid: getters.getRouteQueries.uid,
        // cid: getters.getRouteQueries.cid,
      }
    }
  },
  // Статус загруженного документа
  getUploadDocumentStatus: (state, getters, rootState) => JSON.parse(JSON.stringify(rootState.dictionaries.state.handler.uploadDocumentStatus)),
  // Статус загруженного документа (phone doc)
  getUploadPhoneDocStatus: (state, getters, rootState) => JSON.parse(JSON.stringify(rootState.dictionaries.state.handler.uploadPhoneDocStatus)),
  // Статус загруженного документа (phone doc contract)
  getUploadPhoneContractDocStatus: (state, getters, rootState) => JSON.parse(JSON.stringify(rootState.dictionaries.state.handler.uploadPhoneDocContractStatus)),
  // Статус загруженного документа (card front)
  getUploadCardFrontStatus: (state, getters, rootState) => JSON.parse(JSON.stringify(rootState.dictionaries.state.handler.uploadCardFrontStatus)),
  // Статус загруженного документа (card back)
  getUploadCardBackStatus: (state, getters, rootState) => JSON.parse(JSON.stringify(rootState.dictionaries.state.handler.uploadCardBackStatus)),
  // Статус загруженного документа (risk acceptance)
  getRiskAcceptanceStatus: (state, getters, rootState) => JSON.parse(JSON.stringify(rootState.dictionaries.state.handler.riskAcceptanceStatus)),
  // Статус загруженного документа (risk acceptance)
  getPepStatus: (state, getters, rootState) => JSON.parse(JSON.stringify(rootState.dictionaries.state.handler.pepStatus)),
  // Временные зоны
  getTimeZones: (state, getters, rootState) => JSON.parse(JSON.stringify(rootState.dictionaries.state.handler.timeZones)),
  // Статусы сокет загрузчика
  getSocketUploaderStatuses: (state, getters, rootState) => JSON.parse(JSON.stringify(rootState.dictionaries.state.handler.socketUploaderStatuses)),
  // Загруженный через сокет файл
  getSocketUploaderFile: (state, getters, rootState) => JSON.parse(JSON.stringify(rootState.dictionaries.state.handler.socketUploaderFile)),
  // Поиск по кабинету
  getCabinetSearch: (state, getters, rootState) => {
    const result = JSON.parse(JSON.stringify(rootState.dictionaries.state.handler.cabinetSearch))
    return [...result.instruments, ...result.traders, ...result.referrals]
  },
  // Расстояние до низа экрана
  getScrollBottom: (state, getters, rootState) => rootState.dictionaries.state.handler.scrollBottom,
  //
  affiliateData: () => {
    const dateTo = localStorage.getItem('affiliate_to') || moment().format('YYYY-MM-DD')
    const dateFrom = localStorage.getItem('affiliate_from') || moment(dateTo).subtract(29, 'days').format('YYYY-MM-DD')
    return { dateTo, dateFrom }
  },
  //
  getCurrentPopup: (state, getters, rootState) => rootState.dictionaries.state.handler.currentPopup,
  // Список языков
  getLanguages: (state, getters, rootState) => JSON.parse(JSON.stringify(rootState.dictionaries.state.language.languagesList)),
  //
  getEmptyLayoutText: (state, getters, rootState) => JSON.parse(JSON.stringify(rootState.dictionaries.state.handler.emptyLayoutText))
}
