export const state = () => ({
  // Текущая страница
  route: {
    path: '/',
    query: {}
  },
  // Query параметры
  routeQueries: {
    country: null,
    uid: null,
    cid: null,
    _lang: null
  },
  // Пагинация
  pagination: {
    page: null,
    page_count: null,
    page_size: null,
    total_count: null
  },
  // Выбранная страна при регистрации относится к европейской
  isEuCountry: null,
  // Активная вкладка главного меню
  activeMainMenuButton: 'trading',
  // Актуальный размер экрана в пикселях
  currentNumberWindowWidth: 0,
  // Актуальный размер адаптива
  currentWindowWidth: { flag: 'xl', size: 10000 },
  currentWindowHeight: 10000,
  // Актуальный размер адаптива (расширенные параметры)
  currentTradingWindowWidth: { flag: 'xl', size: 10000 },
  // Базовые размеры экрана
  sizes: [
    { flag: 'sm', size: 767 },
    { flag: 'md', size: 1223 },
    { flag: 'lg', size: 1823 },
    { flag: 'xl', size: 10000 }
  ],
  // Базовые размеры экрана с дополнительными размерами
  tradingSizes: [
    { flag: 'sm', size: 767 },
    { flag: 'md-sm', size: 1000 },
    { flag: 'md', size: 1223 },
    { flag: 'lg-md', size: 1600 },
    { flag: 'lg', size: 1823 },
    { flag: 'xl', size: 10000 }
  ],
  // Активный тост
  messageToast: {
    title: null,
    description: null,
    variant: null,
    shown: false
  },
  // Активная вкладка меню страницы
  activeMenuItem: null,
  //
  activeMenuLinksItem: null,
  // Значения (координаты) актуальной формы
  activeForm: {
    url: null,
    title: null,
    page: null,
    subPage: null,
    form: null,
    subForm: null,
    field: null,
    type: null
  },
  // Наличие у страницы вертикального скролла
  hasPageVerScroll: false,
  // Активный попап
  activePopup: null,
  // Необходимые для верификации документы
  needDocs: [],
  // Статус загруженного документа
  uploadDocumentStatus: null,
  // Статус загруженного документа (phone doc)
  uploadPhoneDocStatus: null,
  // Статус загруженного документа (phone doc contract)
  uploadPhoneDocContractStatus: null,
  // Статус загруженного документа (card front)
  uploadCardFrontStatus: null,
  // Статус загруженного документа (card back)
  uploadCardBackStatus: null,
  // Статус загруженного документа (risk acceptance)
  riskAcceptanceStatus: null,
  // Статус pep
  pepStatus: null,
  // Временные зоны
  timeZones: [
    { description: '-12:00', flag: '-43200' },
    { description: '-11:00', flag: '-39600' },
    { description: '-10:00', flag: '-36000' },
    { description: '-09:00', flag: '-32400' },
    { description: '-08:00', flag: '-28800' },
    { description: '-07:00', flag: '-25200' },
    { description: '-06:00', flag: '-21600' },
    { description: '-05:00', flag: '-18000' },
    { description: '-04:00', flag: '-14400' },
    { description: '-03:00', flag: '-10800' },
    { description: '-02:00', flag: '-7200' },
    { description: '-01:00', flag: '-3600' },
    { description: '±00:00', flag: '0' },
    { description: '+01:00', flag: '3600' },
    { description: '+02:00', flag: '7200' },
    { description: '+03:00', flag: '10800' },
    { description: '+03:30', flag: '12600' },
    { description: '+04:00', flag: '14400' },
    { description: '+04:30', flag: '16200' },
    { description: '+05:00', flag: '18000' },
    { description: '+05:30', flag: '19800' },
    { description: '+06:00', flag: '21600' },
    { description: '+06:30', flag: '23400' },
    { description: '+07:00', flag: '25200' },
    { description: '+08:00', flag: '28800' },
    { description: '+09:00', flag: '32400' },
    { description: '+10:00', flag: '36000' },
    { description: '+10:30', flag: '37800' },
    { description: '+11:00', flag: '39600' },
    { description: '+12:00', flag: '43200' },
    { description: '+13:00', flag: '46800' },
    { description: '+14:00', flag: '50400' }
  ],
  // Статусы сокет загрузчика
  socketUploaderStatuses: {
    start: false,
    finish: false,
    size: null,
    sent: null
  },
  // Загруженный через сокет файл
  socketUploaderFile: {
    name: null,
    path: null,
    preview: null,
    size: null,
    url: null
  },
  cabinetSearch: {
    instruments: [],
    traders: [],
    referrals: []
  },
  scrollBottom: null,
  isPreloaderShown: false,
  isModalShown: false,
  isPopupShown: false,
  currentPopup: null,
  isSearchPopupShown: false,
  isChartShown: false,
  isTradeOpenShown: false,
  isTradeCloseShown: false,
  emptyLayoutText: {
    copyright: '',
    description: '',
    email: '',
    provider: ''
  }
})
