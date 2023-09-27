export const state = () => ({
  isPartnerMode: false,
  partnerCampaignTableSettings: ['visits', 'registrations', 'conversion', 'deposit', 'withdrawal', 'commission'],
  partnerReferralTableSettings: ['uid', 'activity', 'registration', 'country', 'nickname', 'deposit', 'withdrawal', 'commission'],
  promoList: [],
  partnerBanners: {
    lists: {
      sizeList: [],
      categoryList: [],
      languageList: []
    },
    allBanners: {}
  },
  partnerLandings: {
    lists: {
      categoryList: [],
      languageList: []
    },
    allLanding: []
  },
  partnerVideo: {
    lists: {
      videoList: []
    },
    allVideo: []
  },
  partnerHandouts: {
    booklets: {
      lists: {
        categoryList: [],
        languageList: []
      },
      allBooklets: []
    },
    businessCards: {
      lists: {
        categoryList: [],
        languageList: []
      },
      allBusinessCards: []
    },
    brandBook: {
      lists: {
        languageList: []
      },
      allBrandBooks: []
    }
  },
  partnerAvatars: {
    lists: {
      sizeList: []
    },
    allAvatars: {}
  },
  partnerSortFlags: {
    size: 'any',
    category: 'any',
    language: 'any'
  },
  applicationData: {
    file_name: '',
    url: ''
  },
  // Данные страницы Кампании
  partnerCampaigns: {
    graph: {
      visits: [],
      commission: [],
      registrations: []
    },
    statistics: {
      visits: 0,
      registrations: 0,
      deposit: 0,
      withdrawal: 0,
      volume: 0,
      trades: 0,
      profitLoss: 0,
      cash_back: 0,
      commission: 0,
      conversion: 0,
      profit: 0,
      commission_sub: 0
    },
    allCampaigns: [
      {
        visits: 0,
        registrations: 0,
        conversion: 0,
        deposit: 0,
        withdrawal: 0,
        trades: 0,
        volume: 0,
        profitLoss: 0,
        commission: 0,
        status: false,
        campaign: null,
        id: 0,
        type: ''
      }
    ]
  },
  // Данные страницы конкретной кампании
  currentPartnerCampaign: {
    graph: {
      visits: [],
      commission: [],
      registrations: []
    },
    statistics: {
      visits: 0,
      registrations: 0,
      deposit: 0,
      withdrawal: 0,
      volume: 0,
      trades: 0,
      profitLoss: 0,
      cash_back: 0,
      commission: 0,
      conversion: 0,
      profit: 0,
      commission_sub: 0
    },
    userCampaignList: []
  },
  // Список конкурсов
  partnerContests: [],
  // Конкурс успешный партнер
  successfulPartnerContestData: {
    prizeFund: null,
    prizes: null,
    numberParticipants: null,
    contestStatus: null,
    beginningCompetition: null,
    isActiveContest: false,
    progress: 0,
    ending: null,
    isAlreadyRegistered: false
  },
  // Таблицы конкурса успешный партнер
  successfulPartnerContestTables: {
    current: [],
    previous: []
  },
  // Конкурс счастливый билет
  luckyTicketContestData: {
    status: null,
    title: null,
    pageMenu: [],
    description: {
      'popup-title': null
    },
    conditions: {},
    participants: [],
    winners: []
  },
  // Ежегодный конкурс для партнеров из Вьетнама
  annualIbVietnamContest: {
    status: null,
    title: null,
    pageMenu: [],
    participants: [],
    description: {
      title: null,
      prizes: [],
      'prizes-note-1': null,
      'prizes-note-2': null,
      'stages-title': null,
      steps: [],
      conditions: {
        title: null,
        data: null
      },
      winners: [],
      user: []
    },
    conditions: {}
  },
  // Рефералы конкретной кампании
  currentPartnerCampaignReferrals: [],
  activePartnerCampaignId: 0,
  affiliateDates: {
    dateFrom: null,
    dateTo: null
  },
  // Список промо кампаний
  promoCampaigns: {
    card: {},
    href: null,
    'campaign-list': [[]]
  },
  promoCid: null,
  partnerNetwork: {
    status: null,
    total: {
      id: 0,
      client_uid: 0,
      ref_uid: 0,
      level: 0,
      deposit: 0,
      withdrawal: 0,
      commission: 0,
      cash_back: 0,
      volume: 0,
      trades: 0,
      profitLoss: 0,
      activity: 0
    },
    list: []
  },
  partnerCommissions: {
    status: null,
    title: null,
    data: null
  },
  partnerCalculatorData: {
    'title-field-1': 'Commission',
    'value-field-1': 0,
    'title-field-2': 'Reward',
    'value-field-2': '0.00 USD'
  },
  currentReferral: {
    activity: null,
    cash_back: null,
    cheater: null,
    cid: null,
    client_status: null,
    client_uid: null,
    commission: null,
    country: null,
    deposit: null,
    email: null,
    full_name: null,
    id: null,
    partner_personal_data: null,
    phone: null,
    profitLoss: null,
    ref_uid: null,
    reg_date: null,
    trades: null,
    username: null,
    verified: null,
    volume: null,
    withdrawal: null
  },
  referralsEmptyDataTitle: 'Идет загрузка',
  affiliateCalculator: {
    commission: null,
    award: null
  },
  partnerValues: {
    available: 0,
    total_commission: 0,
    accrued_today: 0,
    hold: 0,
    is_hold_informer: false,
    is_programs: false,
    is_show_contests: true
  },
  partnerHoldInformer: [],
  successfulPartnerConditions: [],
  promoFormImageData: {
    fileName: null,
    url: null
  }
})
