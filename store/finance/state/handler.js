export const state = () => ({
  // Список способов пополнения
  depositList: [],
  // Сгруппированный список способов пополнения
  groupedDepositList: [],
  // Избранные способы пополнения
  favoriteDepositMethods: [],
  // Список способов вывода
  withdrawalList: [],
  // Сгруппированный список способов вывода
  groupedWithdrawalList: [],
  // Избранные способы вывода
  favoriteWithdrawalMethods: [],
  // Активный метод
  activeMethod: null,
  //
  // Активный способ пополнения/вывода
  activeCard: {
    id: null,
    method: null,
    name: null,
    icon: null,
    enable: true
  },
  // История переводов
  financeHistory: [],
  //
  financeHistoryPagination: { page: 1, page_count: 1, page_size: 1, total_count: 1 },
  // Активная транзакция
  activeTransaction: {},
  // Результат обработки формы пополнения
  depositRequest: {
    data: {},
    info: {},
    type: null
  },
  // Активный таб способов пополнения
  activeDepositsTab: 'card',
  // Активный таб способов вывода
  activeWithdrawalTab: 'card',
  // Страница "Финансы / кошелек"
  financeWallets: {
    title: 'Add new',
    payment_system_list: [],
    my_wallets: {
      title: 'My wallets',
      list: []
    }
  },
  financeHistoryCount: 0,
  withdrawalInfo: {
    commission: null,
    icon: null,
    messages: null,
    min_amount: null,
    name: null
  },
  depositInfo: {
    type: null
  },
  depositInfoResponse: [],
  depositDataResponse: {},
  depositLocalData: {},
  withdrawalResponse: {},
  withdrawalConfirmResendSec: 0,
  withdrawalConfirmMessage: null,
  withdrawalLocalData: {},
  depositInfoData: {
    min_amount: null,
    commission: null,
    amount: null,
    promo_code_url: null
  },
  withdrawalInfoData: {
    min_amount: null,
    amount: null,
    transfer: null
  }
})
