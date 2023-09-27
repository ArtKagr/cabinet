export const actions = {
  // Информация для страницы About
  async fetchProfileAboutPage ({ commit, dispatch, rootState, rootGetters }) {
    try {
      const { data } = await this.$axios.get('/v3/user/about', rootGetters['dictionaries/getters/handler/getParams'])

      if (data.status === 'success') {
        await commit('profile/mutations/handler/SAVE_USER_ABOUT', { rootData: rootState.profile.state.handler, data: data.about }, { root: true })
      }
    } catch (e) {
      dispatch('dictionaries/actions/auth/checkError', e, { root: true })
    }
  },
  // Получение истории торговли
  async fetchProfileTradesHistory ({ commit, dispatch, rootState, rootGetters }, page) {
    const params = { ...rootGetters['dictionaries/getters/handler/getParams'].params }
    params.page = page || 1

    try {
      const { data } = await this.$axios.post('/v3/user/get-history', {}, { params })

      if (data.status === 'success') {
        await commit('profile/mutations/handler/SAVE_USER_TRADES_HISTORY', { rootData: rootState.profile.state.handler, data }, { root: true })
      }
    } catch (e) {
      dispatch('dictionaries/actions/auth/checkError', e, { root: true })
    }
  },
  // Получение данных верификации
  async fetchProfileVerificationData ({ commit, dispatch, rootState, rootGetters }) {
    try {
      const { data } = await this.$axios.get('/v3/verification/get', rootGetters['dictionaries/getters/handler/getParams'])

      if (data.status === 'success') {
        await commit('profile/mutations/handler/SAVE_VERIFICATION_FORM', { rootData: rootState.profile.state.handler, data: data.verification }, { root: true })
      }
    } catch (e) {
      dispatch('dictionaries/actions/auth/checkError', e, { root: true })
    }
  },
  // Информация к загружаемым документам
  async uploadVerificationDocumentsInfo ({ commit, dispatch, rootState, rootGetters }, type) {
    const params = { ...rootGetters['dictionaries/getters/handler/getParams'].params }
    params.type = type

    try {
      const { data } = await this.$axios.get('/v3/verification/upload-document-info', { params })

      if (data.status === 'success') {
        await commit('profile/mutations/handler/SAVE_VERIFICATION_DOCUMENTS_INFO', { rootData: rootState.profile.state.handler, data: data.hint }, { root: true })
      }
    } catch (e) {
      dispatch('dictionaries/actions/auth/checkError', e, { root: true })
    }
  },
  // Загрузка документов
  async uploadVerificationDocuments ({ commit, dispatch, rootState, rootGetters }, payload) {
    const bodyFormData = new FormData()
    bodyFormData.append('file', payload.file)
    const params = { ...rootGetters['dictionaries/getters/handler/getParams'].params, type: payload.type, ext: payload.ext || undefined }

    try {
      const { data } = await this.$axios.post('/v3/verification/upload-document', bodyFormData, { params })

      if (data.status === 'success') {
        await dispatch('dictionaries/actions/handler/openSuccessToast', { description: data.message }, { root: true })
        switch (payload.type) {
          case 'change-phone':
            await commit('dictionaries/mutations/handler/SAVE_UPLOAD_PHONE_DOC_STATUS', { rootData: rootState.dictionaries.state.handler, data: 'success' }, { root: true })
            break
          case 'change-phone-contr':
            await commit('dictionaries/mutations/handler/SAVE_UPLOAD_PHONE_DOC_CONTRACT_STATUS', { rootData: rootState.dictionaries.state.handler, data: 'success' }, { root: true })
            break
          case 'card-front':
            await commit('dictionaries/mutations/handler/SAVE_UPLOAD_CARD_FRONT_STATUS', { rootData: rootState.dictionaries.state.handler, data: 'success' }, { root: true })
            break
          case 'card-back':
            await commit('dictionaries/mutations/handler/SAVE_UPLOAD_CARD_BACK_STATUS', { rootData: rootState.dictionaries.state.handler, data: 'success' }, { root: true })
            break
          case 'risk_acceptance':
            await commit('dictionaries/mutations/handler/SAVE_RISK_ACCEPTANCE_STATUS', { rootData: rootState.dictionaries.state.handler, data: 'success' }, { root: true })
            break
          case 'pep':
            await commit('dictionaries/mutations/handler/SAVE_PEP_STATUS', { rootData: rootState.dictionaries.state.handler, data: 'success' }, { root: true })
            break
          default:
            break
        }
      } else {
        dispatch('dictionaries/actions/handler/openSuccessToast', { description: data.message }, { root: true })
        switch (payload.type) {
          case 'change-phone':
            await commit('dictionaries/mutations/handler/SAVE_UPLOAD_PHONE_DOC_STATUS', { rootData: rootState.dictionaries.state.handler, data: 'error' }, { root: true })
            break
          case 'change-phone-contr':
            await commit('dictionaries/mutations/handler/SAVE_UPLOAD_PHONE_DOC_CONTRACT_STATUS', { rootData: rootState.dictionaries.state.handler, data: 'error' }, { root: true })
            break
          default:
            await commit('dictionaries/mutations/handler/SAVE_UPLOAD_DOCUMENT_STATUS', { rootData: rootState.dictionaries.state.handler, data: 'error' }, { root: true })
        }
      }
      await dispatch('fetchProfileVerificationData')
    } catch (e) {
      dispatch('dictionaries/actions/auth/checkError', e, { root: true })
    }
  },
  // Получение списка копировальщиков
  async fetchCopiers ({ commit, dispatch, rootState, rootGetters }) {
    dispatch('dictionaries/actions/handler/togglePreloader', true, { root: true })

    try {
      const { data } = await this.$axios.get('/v3/user/get-copiers', rootGetters['dictionaries/getters/handler/getParams'])

      if (data.status === 'success') {
        if (data.list && data.list.length) {
          await commit('profile/mutations/handler/SAVE_COPIERS_LIST', { rootData: rootState.profile.state.handler, data: data.list }, { root: true })
        } else {
          await commit('profile/mutations/handler/SAVE_COPIERS_NO_DATA', { rootData: rootState.profile.state.handler, data: data.message_no_data }, { root: true })
        }
      }
    } catch (e) {
      dispatch('dictionaries/actions/auth/checkError', e, { root: true })
    }

    dispatch('dictionaries/actions/handler/togglePreloader', false, { root: true })
  },
  // Получение истории копировальщиков
  async fetchCopiersHistory ({ commit, dispatch, rootState, rootGetters }, page) {
    dispatch('dictionaries/actions/handler/togglePreloader', true, { root: true })

    const params = { ...rootGetters['dictionaries/getters/handler/getParams'].params }
    params.page = page || 1

    try {
      const { data } = await this.$axios.get('/v3/user/get-copiers-history', { params })

      if (data.status === 'success') {
        if (data.list && data.list.length) {
          await commit('profile/mutations/handler/SAVE_COPIERS_HISTORY_LIST', { rootData: rootState.profile.state.handler, data }, { root: true })
        } else {
          await commit('profile/mutations/handler/SAVE_COPIERS_HISTORY_LIST_NO_DATA', { rootData: rootState.profile.state.handler, data: data.message_no_data }, { root: true })
        }
      } else {
        await commit('profile/mutations/handler/SAVE_COPIERS_HISTORY_LIST', { rootData: rootState.profile.state.handler, data: [] }, { root: true })
      }

      dispatch('dictionaries/actions/handler/togglePreloader', false, { root: true })
    } catch (e) {
      dispatch('dictionaries/actions/auth/checkError', e, { root: true })
    }
  },
  // Установка копирования на паузу
  async accountCopyPause ({ commit, dispatch, rootState, rootGetters }, payload) {
    dispatch('dictionaries/actions/handler/togglePreloader', true, { root: true })

    const params = { ...rootGetters['dictionaries/getters/handler/getParams'].params }
    params.account = payload.account

    try {
      const { data } = await this.$axios.get('/v3/user/copy-pause', { params })

      if (data.status === 'success') {
        await commit('profile/mutations/handler/TOGGLE_ACCOUNT_COPY_PAUSE', { rootData: rootState.profile.state.handler, data: { payload, flag: true } }, { root: true })
      }

      dispatch('dictionaries/actions/handler/togglePreloader', false, { root: true })
    } catch (e) {
      dispatch('dictionaries/actions/auth/checkError', e, { root: true })
    }
  },
  // Снятие копирования с паузы
  async accountCopyContinue ({ commit, dispatch, rootState, rootGetters }, payload) {
    dispatch('dictionaries/actions/handler/togglePreloader', true, { root: true })

    const params = { ...rootGetters['dictionaries/getters/handler/getParams'].params }
    params.account = payload.account

    try {
      const { data } = await this.$axios.get('/v3/user/copy-resume', { params })

      if (data.status === 'success') {
        await commit('profile/mutations/handler/TOGGLE_ACCOUNT_COPY_PAUSE', { rootData: rootState.profile.state.handler, data: { payload, flag: false } }, { root: true })
      }
    } catch (e) {
      dispatch('dictionaries/actions/auth/checkError', e, { root: true })
    }

    dispatch('dictionaries/actions/handler/togglePreloader', false, { root: true })
  },
  // Безопасность: статусы
  async fetchSecurityStatuses ({ commit, dispatch, rootState, rootGetters }) {
    try {
      const { data } = await this.$axios.get('/v3/user/list-status-auth', rootGetters['dictionaries/getters/handler/getParams'])

      if (data.status === 'success') {
        await commit('profile/mutations/handler/SAVE_SECURITY_STATUSES', { rootData: rootState.profile.state.handler, data }, { root: true })
      }
    } catch (e) {
      dispatch('dictionaries/actions/auth/checkError', e, { root: true })
    }
  },
  // Безопасность: данные google аутентификации
  async fetchGoogleAuth ({ commit, dispatch, rootState, rootGetters }) {
    try {
      const { data } = await this.$axios.get('/v3/user/auth-google', rootGetters['dictionaries/getters/handler/getParams'])

      if (data.status === 'success') {
        await commit('profile/mutations/handler/SAVE_GOOGLE_AUTH', { rootData: rootState.profile.state.handler, data }, { root: true })
      }
    } catch (e) {
      dispatch('dictionaries/actions/auth/checkError', e, { root: true })
    }
  },
  // Безопасность: включить/выключить google аутентификацию
  async toggleGoogleAuth ({ commit, dispatch, rootState, rootGetters }, code) {
    dispatch('dictionaries/actions/handler/togglePreloader', true, { root: true })

    const isGoogleNeedConfirmation = !rootGetters['profile/getters/handler/getSecurityStatusList'].isAuthGoogle

    try {
      const { data } = await this.$axios.post('/v3/user/auth-google', { code, isGoogleNeedConfirmation }, rootGetters['dictionaries/getters/handler/getParams'])

      if (data.status === 'success') {
        await dispatch('fetchSecurityStatuses')
        await dispatch('dictionaries/actions/handler/openSuccessToast', { description: data.message || 'success' }, { root: true })
      } else {
        await dispatch('dictionaries/actions/handler/openErrorToast', { description: data.errors.code[0] }, { root: true })
      }
    } catch (e) {
      dispatch('dictionaries/actions/auth/checkError', e, { root: true })
    }

    dispatch('dictionaries/actions/handler/togglePreloader', false, { root: true })
  },
  // Безопасность: SMS аутентификация
  async fetchSmsAuth ({ commit, dispatch, rootState, rootGetters }) {
    dispatch('dictionaries/actions/handler/togglePreloader', true, { root: true })

    try {
      const { data } = await this.$axios.get('/v3/user/auth-sms', rootGetters['dictionaries/getters/handler/getParams'])

      if (data.status === 'success') {
        await commit('profile/mutations/handler/SAVE_SMS_AUTH', { rootData: rootState.profile.state.handler, data: data.result }, { root: true })
      }
    } catch (e) {
      dispatch('dictionaries/actions/auth/checkError', e, { root: true })
    }

    dispatch('dictionaries/actions/handler/togglePreloader', false, { root: true })
  },
  // Безопасность: включить/выключить sms аутентификацию
  async toggleSmsAuth ({ commit, dispatch, rootState, rootGetters }, code) {
    dispatch('dictionaries/actions/handler/togglePreloader', true, { root: true })

    const isSmsNeedConfirmation = !rootGetters['profile/getters/handler/getSecurityStatusList'].isAuthSms

    try {
      const { data } = await this.$axios.post('/v3/user/auth-sms', { code, isSmsNeedConfirmation }, rootGetters['dictionaries/getters/handler/getParams'])

      if (data.status === 'success') {
        await dispatch('fetchSecurityStatuses')
        await dispatch('dictionaries/actions/handler/openSuccessToast', { description: data.result.message || 'success' }, { root: true })
      } else {
        await dispatch('dictionaries/actions/handler/openErrorToast', { description: data.errors.code[0] }, { root: true })
      }
    } catch (e) {
      dispatch('dictionaries/actions/auth/checkError', e, { root: true })
    }

    dispatch('dictionaries/actions/handler/togglePreloader', false, { root: true })
  },
  // Отправить заново sms код
  async resendSmsCode ({ commit, dispatch, rootState, rootGetters }) {
    try {
      const { data } = await this.$axios.get('/v3/user/re-send-sms', rootGetters['dictionaries/getters/handler/getParams'])

      if (data.status === 'success') {
        await commit('profile/mutations/handler/SAVE_SMS_AUTH', { rootData: rootState.profile.state.handler, data: data.result }, { root: true })
      } else {
        await dispatch('dictionaries/actions/handler/openErrorToast', { description: data.errors.code[0] }, { root: true })
      }
    } catch (e) {
      dispatch('dictionaries/actions/auth/checkError', e, { root: true })
    }
  },
  // Безопасность: email аутентификация
  async fetchEmailAuth ({ commit, dispatch, rootState, rootGetters }) {
    dispatch('dictionaries/actions/handler/togglePreloader', true, { root: true })

    try {
      const { data } = await this.$axios.get('/v3/user/auth-email', rootGetters['dictionaries/getters/handler/getParams'])

      if (data.status === 'success') {
        await commit('profile/mutations/handler/SAVE_EMAIL_AUTH', { rootData: rootState.profile.state.handler, data: data.result }, { root: true })
      }
    } catch (e) {
      dispatch('dictionaries/actions/auth/checkError', e, { root: true })
    }

    dispatch('dictionaries/actions/handler/togglePreloader', false, { root: true })
  },
  // Отправить заново email код
  async resendEmailCode ({ commit, dispatch, rootState, rootGetters }) {
    try {
      const { data } = await this.$axios.get('/v3/user/re-send-email', rootGetters['dictionaries/getters/handler/getParams'])

      if (data.status === 'success') {
        await commit('profile/mutations/handler/SAVE_EMAIL_AUTH', { rootData: rootState.profile.state.handler, data: data.result }, { root: true })
      } else {
        await dispatch('dictionaries/actions/handler/openErrorToast', { description: data.errors.code[0] }, { root: true })
      }
    } catch (e) {
      dispatch('dictionaries/actions/auth/checkError', e, { root: true })
    }
  },
  // Безопасность: включить/выключить email аутентификацию
  async toggleEmailAuth ({ commit, dispatch, rootState, rootGetters }, code) {
    dispatch('dictionaries/actions/handler/togglePreloader', true, { root: true })

    const isMailNeedConfirmation = !rootGetters['profile/getters/handler/getSecurityStatusList'].isAuthEmail

    try {
      const { data } = await this.$axios.post('/v3/user/auth-email', { code, isMailNeedConfirmation }, rootGetters['dictionaries/getters/handler/getParams'])

      if (data.status === 'success') {
        await dispatch('fetchSecurityStatuses')
        await dispatch('dictionaries/actions/handler/openSuccessToast', { description: data.result.message || 'success' }, { root: true })
      } else {
        await dispatch('dictionaries/actions/handler/openErrorToast', { description: data.errors.code[0] }, { root: true })
      }
    } catch (e) {
      dispatch('dictionaries/actions/auth/checkError', e, { root: true })
    }

    dispatch('dictionaries/actions/handler/togglePreloader', false, { root: true })
  },
  // Получение партнеров копирующих
  async fetchCopiersPartner ({ commit, dispatch, rootState, rootGetters }) {
    try {
      const { data } = await this.$axios.get('/v3/profile/copiers-partner', rootGetters['dictionaries/getters/handler/getParams'])

      if (data.status === 'success') {
        await commit('profile/mutations/handler/SAVE_COPIERS_PARTNER', { rootData: rootState.profile.state.handler, data: data.result }, { root: true })
      }
    } catch (e) {
      dispatch('dictionaries/actions/auth/checkError', e, { root: true })
    }
  },
  // Изменение процента комиссии партнера
  async editPartnerCommissionPercent ({ dispatch, rootGetters }, payload) {
    try {
      const { data } = await this.$axios.post('/v3/profile/copiers-partner', payload, rootGetters['dictionaries/getters/handler/getParams'])

      if (data.status === 'success') {
        await dispatch('fetchCopiersPartner')
      } else {
        await dispatch('dictionaries/actions/handler/openErrorToast', { description: data.errors.message || '' }, { root: true })
      }
    } catch (e) {
      dispatch('dictionaries/actions/auth/checkError', e, { root: true })
    }
  },
  // Данные Приведи друга
  async fetchBringFriend ({ commit, dispatch, rootState, rootGetters }) {
    try {
      const { data } = await this.$axios.get('/v3/bring-friend', rootGetters['dictionaries/getters/handler/getParams'])

      if (data.status === 'success') {
        await commit('profile/mutations/handler/SAVE_BRING_FRIEND_DATA', { rootData: rootState.profile.state.handler, data: data.result }, { root: true })
      } else {
        await dispatch('dictionaries/actions/handler/openErrorToast', { description: '' }, { root: true })
      }
    } catch (e) {
      dispatch('dictionaries/actions/auth/checkError', e, { root: true })
    }
  },
  // Условия Приведи друга
  async fetchBringFriendConditions ({ commit, dispatch, rootState, rootGetters }) {
    try {
      const { data } = await this.$axios.get('/v3/bring-friend/banner', rootGetters['dictionaries/getters/handler/getParams'])

      if (data.status === 'success') {
        await commit('profile/mutations/handler/SAVE_BRING_FRIEND_CONDITIONS', { rootData: rootState.profile.state.handler, data: data.result }, { root: true })
        await commit('dictionaries/mutations/handler/SAVE_POPUP_NAME', { rootData: rootState.dictionaries.state.handler, data: 'bring-friend' }, { root: true })
        await commit('dictionaries/mutations/handler/TOGGLE_POPUP', { rootData: rootState.dictionaries.state.handler, data: true }, { root: true })
      } else {
        await dispatch('dictionaries/actions/handler/openErrorToast', { description: '' }, { root: true })
      }
    } catch (e) {
      dispatch('dictionaries/actions/auth/checkError', e, { root: true })
    }
  },
  // Заявка на исламский счет
  async swapFreeEnable ({ dispatch, rootGetters }) {
    try {
      const { data } = await this.$axios.get('/v3/user/swap-free-enable', rootGetters['dictionaries/getters/handler/getParams'])

      if (data.status === 'success') {
        dispatch('fetchProfileVerificationData')
      } else {
        await dispatch('dictionaries/actions/handler/openErrorToast', { description: '' }, { root: true })
      }
    } catch (e) {
      dispatch('dictionaries/actions/auth/checkError', e, { root: true })
    }
  }
}
