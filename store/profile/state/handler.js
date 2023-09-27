export const state = () => ({
  profileIndicatorsActiveMenuItem: 'profit',
  traderBars: [
    { month: null, profit: null, investors: null, risk: null },
    { month: null, profit: null, investors: null, risk: null },
    { month: null, profit: null, investors: null, risk: null },
    { month: null, profit: null, investors: null, risk: null },
    { month: null, profit: null, investors: null, risk: null },
    { month: null, profit: null, investors: null, risk: null },
    { month: null, profit: null, investors: null, risk: null },
    { month: null, profit: null, investors: null, risk: null },
    { month: null, profit: null, investors: null, risk: null },
    { month: null, profit: null, investors: null, risk: null },
    { month: null, profit: null, investors: null, risk: null },
    { month: null, profit: null, investors: null, risk: null }
    // { month: '2020-11', profit: 0.08, investors: 109, risk: 1 },
    // { month: '2020-12', profit: 0.22, investors: 109, risk: 2 },
    // { month: '2021-01', profit: 0.94, investors: 111, risk: 2 },
    // { month: '2021-02', profit: 0.16, investors: 110, risk: 3 },
    // { month: '2021-03', profit: -0.02, investors: 109, risk: 4 },
    // { month: '2021-04', profit: -0.74, investors: 109, risk: 5 },
    // { month: '2021-05', profit: -0.17, investors: 44, risk: 6 },
    // { month: '2021-06', profit: 0.12, investors: 110, risk: 7 },
    // { month: '2021-07', profit: 0.25, investors: 113, risk: 8 },
    // { month: '2021-08', profit: -4.35, investors: 116, risk: 9 },
    // { month: '2021-09', profit: 0.02, investors: 117, risk: 10 },
    // { month: '2021-10', profit: 0.16, investors: 118, risk: 9 }
  ],
  traderData: {
    about: null,
    can_be_trader: null,
    days: null,
    profit: null,
    profit_sharing: null,
    public_link: null,
    show_name: null
  },
  traderTrades: {
    popularity: [],
    type: {
      list: null,
      total: null
    }
  },
  verificationData: {
    address_docs: null,
    address_status: false,
    cards: [],
    change_email_docs: null,
    change_phone_contract_docs: null,
    change_phone_docs: null,
    email_status: true,
    name_docs: null,
    name_status: false,
    phone_status: false,
    questionnaire_accept: false,
    questionnaire_filled: false,
    risk_acceptance_docs: null
  },
  tradesHistory: [],
  tradesHistoryPage: 1,
  copiersList: [],
  copiersNoData: [],
  copiersHistoryList: [],
  copiersHistoryNoData: [],
  currentCopier: {},
  securityStatusList: {
    isAuthEmail: false,
    isAuthGoogle: false,
    isAuthSms: false,
    status: null
  },
  googleAuth: {
    qr: null,
    setup_key: null,
    status: null
  },
  smsAuth: {
    message: null,
    timer: 0,
    trigger: null
  },
  emailAuth: {
    message: null,
    timer: 0,
    trigger: null
  },
  copiersPartner: {
    currency: null,
    partners: [
      // {
      //   fullName: null,
      //   email: null,
      //   regDate: null,
      //   regDateFormat: null,
      //   client_uid: null,
      //   country: null,
      //   commissionPercent: null,
      //   commission: null,
      //   commissionFormat: null,
      //   investorsCount: null,
      //   investors: [
      //     {
      //       account: null,
      //       user_id: null,
      //       is_trader: null,
      //       name: null,
      //       avatar_url: null,
      //       date: null,
      //       duration: null,
      //       copy_type: null,
      //       profit_sharing: null,
      //       pause: false,
      //       floating_acc: null,
      //       amount_acc: null,
      //       profit_acc: null,
      //       commission_acc: null,
      //       ref_uid: null
      //     }
      //   ]
      // }
    ]
  },
  currentCopierPartner: {
    account: null,
    user_id: null,
    is_trader: null,
    name: null,
    avatar_url: null,
    date: null,
    duration: null,
    copy_type: null,
    profit_sharing: null,
    pause: false,
    floating_acc: null,
    amount_acc: null,
    profit_acc: null,
    commission_acc: null,
    ref_uid: null,
    currency: null
  },
  activeBankCard: {
    id: null,
    number: null,
    status: null,
    doc: null,
    doc_front: null,
    doc_back: null
  },
  questionnaireEu: {
    maxStep: 9,
    step: 1
  },
  bringFriend: {
    statistics: {
      activations: 0,
      amountHold: 0,
      amountReceived: 0,
      copy_link: null,
      conditions_link: null
    },
    bring_friend: []
  },
  bringFriendConditions: {
    header: {},
    body: {},
    footer: {}
  },
  questionnaireEuSteps: {
    max_step: 0,
    step: 0
  },
  verificationDocInfo: [],
  needProfileTrader: {
    need_balance: false,
    need_trader_questionnaire: false,
    need_username: false
  }
})
