export const getters = {
  // Меню способов пополнения
  getDepositLinks: (state, getters, rootState) => {
    return rootState.finance.state.handler.groupedDepositList.map((method) => {
      return { title: method.name, route: null, flag: method.type }
    })
  },
  // Меню способов вывода
  getWithdrawalLinks: (state, getters, rootState) => {
    return rootState.finance.state.handler.groupedWithdrawalList.map((method) => {
      return { title: method.name, route: null, flag: method.type }
    })
  },
  // Список способов пополнения
  getDepositList: (state, getters, rootState) => JSON.parse(JSON.stringify(rootState.finance.state.handler.depositList)),
  // Сгруппированный список способов пополнения
  getGroupedDepositList: (state, getters, rootState) => JSON.parse(JSON.stringify(rootState.finance.state.handler.groupedDepositList)),
  // Избранные способы пополнения
  getFavoriteDepositMethods: (state, getters, rootState) => JSON.parse(JSON.stringify(rootState.finance.state.handler.favoriteDepositMethods)),
  // Список способов вывода
  getWithdrawalList: (state, getters, rootState) => JSON.parse(JSON.stringify(rootState.finance.state.handler.withdrawalList)),
  // Сгруппированный список способов вывода
  getGroupedWithdrawalList: (state, getters, rootState) => JSON.parse(JSON.stringify(rootState.finance.state.handler.groupedWithdrawalList)),
  // Избранные способы вывода
  getFavoriteWithdrawalMethods: (state, getters, rootState) => JSON.parse(JSON.stringify(rootState.finance.state.handler.favoriteWithdrawalMethods)),
  // Активный метод
  getActiveMethod: (state, getters, rootState) => rootState.finance.state.handler.activeMethod,
  // Активная карта пополнения/вывода
  getActiveCard: (state, getters, rootState) => JSON.parse(JSON.stringify(rootState.finance.state.handler.activeCard)),
  // История переводов
  getFinanceHistory: (state, getters, rootState) => rootState.finance.state.handler.financeHistory,
  //
  getFinanceHistoryPagination: (state, getters, rootState) => rootState.finance.state.handler.financeHistoryPagination,
  // Активная транзакция
  getActiveTransaction: (state, getters, rootState) => rootState.finance.state.handler.activeTransaction,
  // Результат обработки формы пополнения
  getDepositRequest: (state, getters, rootState) => JSON.parse(JSON.stringify(rootState.finance.state.handler.depositRequest)),
  // Активный таб способов пополнения
  getActiveDepositsTab: (state, getters, rootState) => rootState.finance.state.handler.activeDepositsTab,
  // Активный таб способов вывода
  getActiveWithdrawalTab: (state, getters, rootState) => rootState.finance.state.handler.activeWithdrawalTab,
  // Страница "Финансы / кошелек"
  getFinanceWallets: (state, getters, rootState) => JSON.parse(JSON.stringify(rootState.finance.state.handler.financeWallets)),
  //
  getFinanceHistoryCount: (state, getters, rootState) => rootState.finance.state.handler.financeHistoryCount,
  //
  getWithdrawalInfo: (state, getters, rootState) => rootState.finance.state.handler.withdrawalInfo,
  //
  getDepositInfo: (state, getters, rootState) => rootState.finance.state.handler.depositInfo,
  //
  getDepositInfoResponse: (state, getters, rootState) => rootState.finance.state.handler.depositInfoResponse,
  //
  getDepositDataResponse: (state, getters, rootState) => rootState.finance.state.handler.depositDataResponse,
  //
  getWithdrawalResponse: (state, getters, rootState) => rootState.finance.state.handler.withdrawalResponse,
  //
  getWithdrawalConfirmResendSec: (state, getters, rootState) => rootState.finance.state.handler.withdrawalConfirmResendSec,
  //
  getWithdrawalConfirmMessage: (state, getters, rootState) => rootState.finance.state.handler.withdrawalConfirmMessage,
  //
  getDepositLocalData: (state, getters, rootState) => JSON.parse(JSON.stringify(rootState.finance.state.handler.depositLocalData)),
  //
  getWithdrawalLocalData: (state, getters, rootState) => JSON.parse(JSON.stringify(rootState.finance.state.handler.withdrawalLocalData)),
  //
  getDepositInfoData: (state, getters, rootState) => JSON.parse(JSON.stringify(rootState.finance.state.handler.depositInfoData)),
  //
  getWithdrawalInfoData: (state, getters, rootState) => JSON.parse(JSON.stringify(rootState.finance.state.handler.withdrawalInfoData))
}
