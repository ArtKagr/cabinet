export const mutations = {
  // Сохранение верификационных данных
  SAVE_VERIFICATION_FORM (state, payload) {
    payload.rootData.verificationData = payload.data
  },
  // Активная вкладка меню страницы Profile
  SET_PROFILE_INDICATORS_ACTIVE_MENU_ITEM (state, payload) {
    payload.rootData.profileIndicatorsActiveMenuItem = payload.data
  },
  // Информация для страницы About
  SAVE_USER_ABOUT (state, payload) {
    payload.rootData.traderBars = payload.data.bars
    payload.rootData.traderTrades = payload.data.trades
    payload.rootData.traderData = payload.data.data
  },
  // История торговли
  SAVE_USER_TRADES_HISTORY (state, { rootData, data: { history = [], page = 1 } }) {
    rootData.tradesHistoryPage = page

    if (page === 1) {
      rootData.tradesHistory = history
    } else {
      rootData.tradesHistory = [...rootData.tradesHistory, ...history]
    }
  },
  // Сохранение списка копировальщиков
  SAVE_COPIERS_LIST (state, payload) {
    payload.rootData.copiersList = payload.data
  },
  // Сохранение текста при отсутствии копировальщиков
  SAVE_COPIERS_NO_DATA (state, payload) {
    payload.rootData.copiersNoData = payload.data
  },
  // Сохранение списка истории копировальщиков
  SAVE_COPIERS_HISTORY_LIST (state, payload) {
    if (payload.data.page === 1) {
      payload.rootData.copiersHistoryList = payload.data.list
    } else if (payload.data.page) {
      payload.rootData.copiersHistoryList = [...payload.rootData.copiersHistoryList, ...payload.data.list]
    } else {
      payload.rootData.copiersHistoryList = payload.data
    }
  },
  // Сохранение текста при отсутствии истории копировальщиков
  SAVE_COPIERS_HISTORY_LIST_NO_DATA (state, payload) {
    payload.rootData.copiersHistoryNoData = payload.data
  },
  // Сохранение активного копировальщика (показ в попапе)
  SAVE_CURRENT_COPIER (state, payload) {
    payload.rootData.currentCopier = payload.data
  },
  // Установка/снятие с паузы копирования
  TOGGLE_ACCOUNT_COPY_PAUSE (state, payload) {
    if (payload.data.payload.source === 'copiers-partner') {
      payload.rootData.copiersPartner.partners = payload.rootData.copiersPartner.partners.map((partner) => {
        if (Number(partner.client_uid) === Number(payload.data.payload.refUid)) {
          partner.investors = partner.investors.map((investor) => {
            if (investor.account === payload.data.payload.account) {
              investor.pause = payload.data.flag
            }
            return investor
          })
        }
        return partner
      })
    } else {
      payload.rootData.copiersList = payload.rootData.copiersList.map((item) => {
        if (item.account === payload.data.payload.account) {
          item.pause = payload.data.flag
        }
        return item
      })
    }
  },
  // Сохранение статусов аутентификации
  SAVE_SECURITY_STATUSES (state, payload) {
    payload.rootData.securityStatusList = Object.assign(payload.rootData.securityStatusList, payload.data)
  },
  // Сохранение данных google auth
  SAVE_GOOGLE_AUTH (state, payload) {
    payload.rootData.googleAuth = Object.assign(payload.rootData.googleAuth, payload.data)
  },
  // Сохранение данных sms auth
  SAVE_SMS_AUTH (state, payload) {
    payload.rootData.smsAuth = Object.assign(payload.rootData.smsAuth, payload.data)
  },
  // Сохранение данных email auth
  SAVE_EMAIL_AUTH (state, payload) {
    payload.rootData.emailAuth = Object.assign(payload.rootData.emailAuth, payload.data)
  },
  // Сохранение партнеров копирующих
  SAVE_COPIERS_PARTNER (state, payload) {
    payload.rootData.copiersPartner = Object.assign(payload.rootData.copiersPartner, payload.data)
    payload.rootData.copiersPartner.partners = payload.rootData.copiersPartner.partners.map((partner) => {
      partner.is_visible = false
      return partner
    })
  },
  // Показать/скрыть партнеров копирующих
  TOGGLE_CURRENT_COPIERS_PARTNER (state, payload) {
    payload.rootData.copiersPartner.partners = payload.rootData.copiersPartner.partners.map((partner) => {
      if (partner.client_uid === payload.data) {
        partner.is_visible = !partner.is_visible
      }
      return partner
    })
  },
  // Сохранение открытого партнера копирующего
  SAVE_CURRENT_COPIER_PARTNER (state, payload) {
    payload.rootData.currentCopierPartner = payload.data
  },
  // Сохранение открытой для подтверждения карты
  SAVE_ACTIVE_BANK_CARD (state, payload) {
    payload.rootData.activeBankCard = Object.assign(payload.rootData.activeBankCard, payload.data)
  },
  // Сохранение данных "Приведи друга"
  SAVE_BRING_FRIEND_DATA (state, payload) {
    payload.rootData.bringFriend = payload.data
  },
  // Сохранение условий "Приведи друга"
  SAVE_BRING_FRIEND_CONDITIONS (state, payload) {
    payload.rootData.bringFriendConditions = payload.data
  },
  //
  SAVE_QUESTIONNAIRE_EU_STEPS (state, payload) {
    payload.rootData.questionnaireEuSteps = { step: Number(payload.data.step), max_step: Number(payload.data.max_step) }
  },
  // Информация при загрузке документов верификации
  SAVE_VERIFICATION_DOCUMENTS_INFO (state, payload) {
    payload.rootData.verificationDocInfo = payload.data
  },
  //
  SAVE_NEED_PROFILE_TRADER (state, payload) {
    payload.rootData.needProfileTrader = payload.data
  }
}
