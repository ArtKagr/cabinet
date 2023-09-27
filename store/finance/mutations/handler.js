export const mutations = {
  // Сохранение списка способов пополнения
  SAVE_DEPOSIT_LIST (state, payload) {
    payload.rootData.depositList = payload.data
  },
  // Сохранение списка способов вывода
  SAVE_WITHDRAWAL_LIST (state, payload) {
    payload.rootData.withdrawalList = payload.data
  },
  // Сохранение избранных способов пополнения
  SAVE_FAVORITE_DEPOSIT_METHODS (state, payload) {
    payload.rootData.favoriteDepositMethods = payload.data
  },
  // Сохранение сгруппированного списка способов пополнения
  SAVE_GROUPED_DEPOSIT_LIST (state, payload) {
    payload.rootData.groupedDepositList = payload.data
  },
  // Сохранение избранных способов вывода
  SAVE_FAVORITE_WITHDRAWAL_METHODS (state, payload) {
    payload.rootData.favoriteWithdrawalMethods = payload.data
  },
  // Сохранение сгруппированного списка способов вывода
  SAVE_GROUPED_WITHDRAWAL_LIST (state, payload) {
    payload.rootData.groupedWithdrawalList = payload.data
  },
  // Сохранение активного метода пополнения/вывода
  SAVE_ACTIVE_METHOD (state, payload) {
    payload.rootData.activeMethod = payload.data
  },
  //
  SAVE_ACTIVE_CARD (state, payload) {
    payload.rootData.activeCard = payload.data
  },
  // Сохранение активной карты пополнения/вывода
  SAVE_ACTIVE_DEPOSIT_WITHDRAWAL_CARD (state, payload) {
    payload.rootData.activeCard = Object.assign(payload.rootData.activeCard, payload.data)
  },
  // Сохранение истории переводов
  SAVE_FINANCE_HISTORY (state, payload) {
    if (payload.data.page === 1) {
      payload.rootData.financeHistory = payload.data.history
      payload.rootData.financeHistoryPagination = payload.data.pagination
    } else {
      payload.rootData.financeHistory = [...payload.rootData.financeHistory, ...payload.data.history]
      payload.rootData.financeHistoryPagination = payload.data.pagination
    }
  },
  // Сохранение активной транзакции (при клике на отмену или повтор)
  SAVE_ACTIVE_TRANSACTION (state, payload) {
    payload.rootData.activeTransaction = payload.data
  },
  // Сохранение результата обработки формы пополнения
  SAVE_DEPOSIT_REQUEST (state, payload) {
    payload.rootData.depositRequest = payload.data
  },
  // Сохранение активного таба всех способов пополнения
  SAVE_ACTIVE_DEPOSITS_TAB (state, payload) {
    payload.rootData.activeDepositsTab = payload.data
  },
  // Сохранение активного таба всех способов вывода
  SAVE_ACTIVE_WITHDRAWAL_TAB (state, payload) {
    payload.rootData.activeWithdrawalTab = payload.data
  },
  // Сохранение данных страницы "Финансы / кошелек"
  SAVE_FINANCE_WALLETS (state, payload) {
    payload.rootData.financeWallets = payload.data
  },
  //
  SAVE_FINANCE_HISTORY_COUNT (state, payload) {
    payload.rootData.financeHistoryCount = Number(payload.data)
  },
  //
  SAVE_WITHDRAWAL_INFO (state, payload) {
    payload.rootData.withdrawalInfo = payload.data
  },
  SAVE_DEPOSIT_INFO (state, payload) {
    payload.rootData.depositInfo = payload.data
  },
  SAVE_DEPOSIT_INFO_RESPONSE (state, payload) {
    payload.rootData.depositInfoResponse = payload.data
  },
  SAVE_DEPOSIT_DATA_RESPONSE (state, payload) {
    payload.rootData.depositDataResponse = payload.data
  },
  SAVE_WITHDRAWAL_RESPONSE (state, payload) {
    payload.rootData.withdrawalResponse = payload.data
  },
  SAVE_WITHDRAWAL_CONFIRM_PAYLOAD (state, payload) {
    payload.rootData.withdrawalConfirmResendSec = payload.data.resend_sec
    payload.rootData.withdrawalConfirmMessage = payload.data.message
  },
  SAVE_DEPOSIT_LOCAL_DATA (state, payload) {
    payload.rootData.depositLocalData = payload.data
  },
  SAVE_WITHDRAWAL_LOCAL_DATA (state, payload) {
    payload.rootData.withdrawalLocalData = payload.data
  },
  SAVE_DEPOSIT_INFO_DATA (state, payload) {
    payload.rootData.depositInfoData = payload.data
  },
  SAVE_WITHDRAWAL_INFO_DATA (state, payload) {
    payload.rootData.withdrawalInfoData = payload.data
  }
}
