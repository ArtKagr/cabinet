import moment from 'moment'

// status (newValue) {
//   if (newValue === 'fetch-referrals') {
//     this.referralsEmptyDataTitle = this.$t('Идет загрузка')
//   } else if (newValue === 'fetch-referrals-success-empty') {
//     this.referralsEmptyDataTitle = this.$t('Ничего не найдено')
//   }
// }

export const actions = {
  // Переключение кабинета в режим партнера
  async switchPartner ({ commit, dispatch, rootState, rootGetters }) {
    try {
      const { data } = await this.$axios.get('v3/switch/partner', rootGetters['dictionaries/getters/handler/getParams'])

      if (data.status === 'success') {
        await commit('partners/mutations/handler/TOGGLE_PARTNER_MODE', {
          rootData: { partners: rootState.partners.state.handler, user: rootState.dictionaries.state.user },
          data: 2
        }, { root: true })
      } else {
        await dispatch('dictionaries/actions/handler/openErrorToast', { description: data.errors.message || data.code }, { root: true })
      }
    } catch (e) {
      dispatch('dictionaries/actions/auth/checkError', e, { root: true })
    }
  },
  // Получение списка промо
  async fetchPromoList ({ commit, dispatch, rootState, rootGetters }) {
    try {
      const { data } = await this.$axios.get('v3/affiliate-promo', rootGetters['dictionaries/getters/handler/getParams'])

      if (data.status === 'success') {
        await commit('partners/mutations/handler/SAVE_PROMO_LIST', { rootData: rootState.partners.state.handler, data: data.promo }, { root: true })
      }
    } catch (e) {
      dispatch('dictionaries/actions/auth/checkError', e, { root: true })
    }
  },
  //  Получение промо баннеров
  async fetchPartnerBanners ({ commit, dispatch, rootState, rootGetters }) {
    try {
      const { data } = await this.$axios.get('v3/affiliate-promo/banners', rootGetters['dictionaries/getters/handler/getParams'])

      if (data.status === 'success') {
        await commit('partners/mutations/handler/SAVE_PARTNER_BANNERS', { rootData: rootState.partners.state.handler, data: data.banners }, { root: true })
      }
    } catch (e) {
      dispatch('dictionaries/actions/auth/checkError', e, { root: true })
    }
  },
  // Получение промо лендингов
  async fetchPartnerLandings ({ commit, dispatch, rootState, rootGetters }) {
    try {
      const { data } = await this.$axios.get('v3/affiliate-promo/landings', rootGetters['dictionaries/getters/handler/getParams'])

      if (data.status === 'success') {
        await commit('partners/mutations/handler/SAVE_PARTNER_LANDINGS', { rootData: rootState.partners.state.handler, data: data.landings }, { root: true })
      }
    } catch (e) {
      dispatch('dictionaries/actions/auth/checkError', e, { root: true })
    }
  },
  // Получение промо видео
  async fetchPartnerVideo ({ commit, dispatch, rootState, rootGetters }) {
    try {
      const { data } = await this.$axios.get('v3/affiliate-promo/videos', rootGetters['dictionaries/getters/handler/getParams'])

      if (data.status === 'success') {
        await commit('partners/mutations/handler/SAVE_PARTNER_VIDEO', { rootData: rootState.partners.state.handler, data: data.videos }, { root: true })
      }
    } catch (e) {
      dispatch('dictionaries/actions/auth/checkError', e, { root: true })
    }
  },
  // Получение промо раздаточных материалов
  async fetchPartnerHandouts ({ commit, dispatch, rootState, rootGetters }) {
    try {
      const { data } = await this.$axios.get('v3/affiliate-promo/handouts', rootGetters['dictionaries/getters/handler/getParams'])

      if (data.status === 'success') {
        await commit('partners/mutations/handler/SAVE_PARTNER_HANDOUTS', { rootData: rootState.partners.state.handler, data: data.handouts }, { root: true })
      }
    } catch (e) {
      dispatch('dictionaries/actions/auth/checkError', e, { root: true })
    }
  },
  // Получение промо аватарок
  async fetchPartnerAvatars ({ commit, dispatch, rootState, rootGetters }) {
    try {
      const { data } = await this.$axios.get('v3/affiliate-promo/avatars', rootGetters['dictionaries/getters/handler/getParams'])

      if (data.status === 'success') {
        await commit('partners/mutations/handler/SAVE_PARTNER_AVATARS', { rootData: rootState.partners.state.handler, data: data.avatars }, { root: true })
      }
    } catch (e) {
      dispatch('dictionaries/actions/auth/checkError', e, { root: true })
    }
  },
  // async fetchHandoutsForm ({ commit, dispatch, rootGetters, rootState }, payload) {
  //   await commit('partners/mutations/handler/SAVE_PARTNER_APPLICATION_DATA', { rootData: rootState.partners.state.handler, data: { file_name: data.file_name, url: data.url } }, { root: true })
  // },
  // Получение списка кампаний для Промо
  async fetchPromoCampaignsList ({ commit, dispatch, rootState, rootGetters }, id) {
    const token = rootGetters['dictionaries/getters/handler/getParams'].params.token

    try {
      const { data } = await this.$axios.get('v3/affiliate-promo/campaign', { params: { token, id } })

      if (data.status === 'success') {
        await commit('partners/mutations/handler/SAVE_PROMO_CAMPAIGNS', { rootData: rootState.partners.state.handler, data: data.company }, { root: true })
      }
    } catch (e) {
      dispatch('dictionaries/actions/auth/checkError', e, { root: true })
    }
  },
  // Данные страницы Кампании
  async fetchPartnerCampaigns ({ commit, dispatch, rootState, rootGetters }, payload) {
    const token = rootGetters['dictionaries/getters/handler/getParams'].params.token

    try {
      const { data } = await this.$axios.get('v3/affiliate', { params: { token, dateFrom: payload.dateFrom, dateTo: payload.dateTo } })

      if (data.status === 'success') {
        await commit('partners/mutations/handler/SAVE_PARTNER_CAMPAIGNS', { rootData: rootState.partners.state.handler, data: data.company }, { root: true })
      }
    } catch (e) {
      dispatch('dictionaries/actions/auth/checkError', e, { root: true })
    }
  },
  // Данные конкретной кампании
  async fetchCurrentPartnerCampaign ({ commit, dispatch, rootState, rootGetters }, payload) {
    const token = rootGetters['dictionaries/getters/handler/getParams'].params.token

    try {
      const { data } = await this.$axios.get('v3/affiliate/view', { params: { token, id: payload.id, dateFrom: payload.dateFrom, dateTo: payload.dateTo } })

      if (data.status === 'success') {
        await commit('partners/mutations/handler/SAVE_CURRENT_PARTNER_CAMPAIGN', { rootData: rootState.partners.state.handler, data: data.company }, { root: true })
      }
    } catch (e) {
      dispatch('dictionaries/actions/auth/checkError', e, { root: true })
    }
  },
  // Получение рефералов кампании
  async fetchCurrentPartnerCampaignReferrals ({ commit, dispatch, rootState, rootGetters }, payload) {
    const token = rootGetters['dictionaries/getters/handler/getParams'].params.token
    try {
      const { data } = await this.$axios.get('v3/affiliate/view-referrals', { params: { token, ...payload } })
      if (data.status === 'success') {
        await commit('partners/mutations/handler/SAVE_CURRENT_PARTNER_CAMPAIGN_REFERRALS', { rootData: rootState.partners.state.handler, data: data.company }, { root: true })

        if (data.company.referrals.length === 0) {
          await commit('partners/mutations/handler/SAVE_REFERRALS_EMPTY_DATA_TITLE', {
            rootData: rootState.partners.state.handler,
            data: 'Ничего не найдено'
          }, { root: true })
        }
      }
    } catch (e) {
      dispatch('dictionaries/actions/auth/checkError', e, { root: true })
    }
  },
  // Получение всех рефералов
  async fetchPartnerNetwork ({ commit, dispatch, rootState, rootGetters }, payload) {
    const params = {
      token: rootGetters['dictionaries/getters/handler/getParams'].params.token,
      activity: payload.activity,
      dateForm: moment(payload.dateFrom).format('DD.MM.YYYY'),
      dateTo: moment(payload.dateTo).format('DD.MM.YYYY')
    }

    try {
      const { data } = await this.$axios.get('v3/affiliate/network', { params })

      if (data.status === 'success') {
        await commit('partners/mutations/handler/SAVE_PARTNER_NETWORK', { rootData: rootState.partners.state.handler, data }, { root: true })

        if (data.list.length === 0) {
          await commit('partners/mutations/handler/SAVE_REFERRALS_EMPTY_DATA_TITLE', {
            rootData: rootState.partners.state.handler,
            data: 'Ничего не найдено'
          }, { root: true })
        }
      }
    } catch (e) {
      dispatch('dictionaries/actions/auth/checkError', e, { root: true })
    }
  },
  // Получение списка комиссий
  async fetchPartnerCommissions ({ commit, dispatch, rootState, rootGetters }, payload) {
    dispatch('dictionaries/actions/handler/togglePreloader', true, { root: true })

    const params = payload
      ? {
          token: rootGetters['dictionaries/getters/handler/getParams'].params.token,
          id: payload.id,
          activity: payload.activity,
          dateForm: moment(payload.dateFrom).format('DD.MM.YYYY'),
          dateTo: moment(payload.dateTo).format('DD.MM.YYYY')
        }
      : rootGetters['dictionaries/getters/handler/getParams'].params

    try {
      const { data } = await this.$axios.get('v3/affiliate/export-commissions', { params })

      if (data.status === 'success') {
        await commit('partners/mutations/handler/SAVE_PARTNER_COMMISSIONS', { rootData: rootState.partners.state.handler, data }, { root: true })
      }
    } catch (e) {
      dispatch('dictionaries/actions/auth/checkError', e, { root: true })
    }

    dispatch('dictionaries/actions/handler/togglePreloader', false, { root: true })
  },
  // async editCurrentPartnerCampaign ({ commit, dispatch, rootGetters, rootState }, payload) {
  //   await commit('partners/mutations/handler/SAVE_ACTIVE_PARTNER_CAMPAIGN_ID', { rootData: rootState.partners.state.handler, data: payload.id }, { root: true })
  // },
  // Получение списка конкурсов
  async fetchPartnerContests ({ commit, dispatch, rootState, rootGetters }) {
    dispatch('dictionaries/actions/handler/togglePreloader', true, { root: true })

    try {
      const { data } = await this.$axios.get('v3/affiliate-contests', rootGetters['dictionaries/getters/handler/getParams'])

      if (data.status === 'success') {
        await commit('partners/mutations/handler/SAVE_PARTNER_CONTESTS', { rootData: rootState.partners.state.handler, data: data.result }, { root: true })
      }
    } catch (e) {
      dispatch('dictionaries/actions/auth/checkError', e, { root: true })
    }

    dispatch('dictionaries/actions/handler/togglePreloader', false, { root: true })
  },
  // Получение конкурса успешный партнер
  async fetchSuccessfulPartnerContest ({ commit, dispatch, rootState, rootGetters }) {
    dispatch('dictionaries/actions/handler/togglePreloader', true, { root: true })

    try {
      const { data } = await this.$axios.get('v3/affiliate-contests/partner', rootGetters['dictionaries/getters/handler/getParams'])

      if (data.status === 'success') {
        await commit('partners/mutations/handler/SAVE_SUCCESSFUL_PARTNER_CONTEST', { rootData: rootState.partners.state.handler, data: data.result }, { root: true })
      }
    } catch (e) {
      dispatch('dictionaries/actions/auth/checkError', e, { root: true })
    }

    dispatch('dictionaries/actions/handler/togglePreloader', false, { root: true })
  },
  // Получение таблицы участников конкурса успешный партнер
  async fetchSuccessfulPartnerContestTable ({ commit, dispatch, rootState, rootGetters }) {
    dispatch('dictionaries/actions/handler/togglePreloader', true, { root: true })

    try {
      const { data } = await this.$axios.get('v3/affiliate-contests/partner-tables', rootGetters['dictionaries/getters/handler/getParams'])

      if (data.status === 'success') {
        await commit('partners/mutations/handler/SAVE_SUCCESSFUL_PARTNER_TABLES', { rootData: rootState.partners.state.handler, data: data.result }, { root: true })
      }
    } catch (e) {
      dispatch('dictionaries/actions/auth/checkError', e, { root: true })
    }

    dispatch('dictionaries/actions/handler/togglePreloader', false, { root: true })
  },
  // Принять участие в конкурсе успешный партнер
  async successfulPartnerParticipate ({ commit, dispatch, rootState, rootGetters }) {
    try {
      const { data } = await this.$axios.post('v3/affiliate-contests/participate', {}, rootGetters['dictionaries/getters/handler/getParams'])

      if (data.status === 'success') {
        dispatch('fetchSuccessfulPartnerContest')
      }
    } catch (e) {
      dispatch('dictionaries/actions/auth/checkError', e, { root: true })
    }
  },
  // Получение конкурса счастливый билет
  async fetchLuckyTicketContest ({ commit, dispatch, rootState, rootGetters }) {
    dispatch('dictionaries/actions/handler/togglePreloader', true, { root: true })

    try {
      const { data } = await this.$axios.get('v3/affiliate-contests/lucky-ticket', rootGetters['dictionaries/getters/handler/getParams'])

      if (data.status === 'success') {
        await commit('partners/mutations/handler/SAVE_LUCKY_TICKET_CONTEST', { rootData: rootState.partners.state.handler, data }, { root: true })
      }
    } catch (e) {
      dispatch('dictionaries/actions/auth/checkError', e, { root: true })
    }

    dispatch('dictionaries/actions/handler/togglePreloader', false, { root: true })
  },
  // Получение ежегодного конкурса для Вьетнама
  async fetchAnnualIbVietnamContest ({ commit, dispatch, rootState, rootGetters }) {
    dispatch('dictionaries/actions/handler/togglePreloader', true, { root: true })

    try {
      const { data } = await this.$axios.get('v3/affiliate-contests/annual-ib-vietnam', rootGetters['dictionaries/getters/handler/getParams'])

      if (data.status === 'success') {
        await commit('partners/mutations/handler/SAVE_ANNUAL_IB_VIETNAM_CONTEST', { rootData: rootState.partners.state.handler, data }, { root: true })
      }
    } catch (e) {
      dispatch('dictionaries/actions/auth/checkError', e, { root: true })
    }

    dispatch('dictionaries/actions/handler/togglePreloader', false, { root: true })
  },
  // Обновление данных калькулятора
  async updatePartnerCalculator ({ commit, dispatch, rootState, rootGetters }, payload) {
    try {
      const { data } = await this.$axios.post('v3/affiliate-calculator', payload, rootGetters['dictionaries/getters/handler/getParams'])

      if (data.status === 'success') {
        await commit('partners/mutations/handler/SAVE_PARTNER_CALCULATOR_DATA', {
          rootData: rootState.partners.state.handler,
          data: { 'value-field-1': data.result.commission, 'value-field-2': data.result.award }
        }, { root: true })
      }
    } catch (e) {
      dispatch('dictionaries/actions/auth/checkError', e, { root: true })
    }
  },
  //
  async fetchPartnerValues ({ commit, dispatch, rootState, rootGetters }) {
    try {
      const { data } = await this.$axios.get('v3/affiliate/portfolio', rootGetters['dictionaries/getters/handler/getParams'])

      if (data.status === 'success') {
        await commit('partners/mutations/handler/SAVE_PARTNER_VALUES', {
          rootData: rootState.partners.state.handler,
          data: data.result
        }, { root: true })
      }
    } catch (e) {
      dispatch('dictionaries/actions/auth/checkError', e, { root: true })
    }
  },
  // Получение условий вывода комиссии со статусом HOLD
  async fetchPartnerHoldInformer ({ commit, dispatch, rootState, rootGetters }) {
    try {
      const { data } = await this.$axios.get('v3/affiliate/hold-information', rootGetters['dictionaries/getters/handler/getParams'])

      if (data.status === 'success') {
        await commit('partners/mutations/handler/SAVE_PARTNER_HOLD_INFORMER', {
          rootData: rootState.partners.state.handler,
          data: data.result
        }, { root: true })
        await commit('dictionaries/mutations/handler/SAVE_POPUP_NAME', {
          rootData: rootState.dictionaries.state.handler,
          data: 'partners-hold-informer'
        }, { root: true })
        await commit('dictionaries/mutations/handler/TOGGLE_POPUP', {
          rootData: rootState.dictionaries.state.handler,
          data: true
        }, { root: true })
      }
    } catch (e) {
      dispatch('dictionaries/actions/auth/checkError', e, { root: true })
    }
  },
  //
  async fetchSuccessfulPartnerConditions ({ commit, dispatch, rootState, rootGetters }) {
    try {
      const { data } = await this.$axios.get('v3/affiliate-contests/partner-information', rootGetters['dictionaries/getters/handler/getParams'])

      if (data.status === 'success') {
        await commit('partners/mutations/handler/SAVE_SUCCESSFUL_PARTNER_CONDITIONS', {
          rootData: rootState.partners.state.handler,
          data: data.result
        }, { root: true })
        await commit('dictionaries/mutations/handler/SAVE_POPUP_NAME', {
          rootData: rootState.dictionaries.state.handler,
          data: 'successful-partner-conditions'
        }, { root: true })
        await commit('dictionaries/mutations/handler/TOGGLE_POPUP', {
          rootData: rootState.dictionaries.state.handler,
          data: true
        }, { root: true })
      }
    } catch (e) {
      dispatch('dictionaries/actions/auth/checkError', e, { root: true })
    }
  }
}
