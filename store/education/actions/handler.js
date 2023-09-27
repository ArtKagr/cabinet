export const actions = {
  // Получить глоссарий
  async fetchEducationGlossary ({ dispatch, commit, rootState, rootGetters }) {
    dispatch('dictionaries/actions/handler/togglePreloader', true, { root: true })

    try {
      const { data } = await this.$axios.get('v3/education/glossary', rootGetters['dictionaries/getters/handler/getParams'])

      if (data.status === 'success') {
        await commit('education/mutations/handler/SAVE_EDUCATION_GLOSSARY', { rootData: rootState.education.state.handler, data }, { root: true })
      }
    } catch (e) {
      dispatch('dictionaries/actions/auth/checkError', e, { root: true })
    }

    dispatch('dictionaries/actions/handler/togglePreloader', false, { root: true })
  },
  // Получить список FAQ
  async fetchEducationFaq ({ dispatch, commit, rootState, rootGetters }) {
    dispatch('dictionaries/actions/handler/togglePreloader', true, { root: true })

    try {
      const { data } = await this.$axios.get('v3/education/faq', rootGetters['dictionaries/getters/handler/getParams'])

      if (data.status === 'success') {
        await commit('education/mutations/handler/SAVE_EDUCATION_FAQ', { rootData: rootState.education.state.handler, data }, { root: true })
      }
    } catch (e) {
      dispatch('dictionaries/actions/auth/checkError', e, { root: true })
    }

    dispatch('dictionaries/actions/handler/togglePreloader', false, { root: true })
  },
  //
  async fetchEducation ({ commit, dispatch, rootState, rootGetters }) {
    try {
      const { data } = await this.$axios.get('v3/education', rootGetters['dictionaries/getters/handler/getParams'])

      if (data.status === 'success') {
        await commit('education/mutations/handler/SAVE_EDUCATION', { rootData: rootState.education.state.handler, data: data.blocks }, { root: true })
      }
    } catch (e) {
      dispatch('dictionaries/actions/auth/checkError', e, { root: true })
    }
  },
  //
  async fetchCurrentLesson ({ commit, dispatch, rootState, rootGetters }, id) {
    const { token, _lang } = rootGetters['dictionaries/getters/handler/getParams'].params

    try {
      const { data } = await this.$axios.get('v3/education/lessons', { params: { token, _lang, id } })

      if (data.status === 'success') {
        await commit('education/mutations/handler/SAVE_CURRENT_LESSON', { rootData: rootState.education.state.handler, data: data.result }, { root: true })
      }
    } catch (e) {
      dispatch('dictionaries/actions/auth/checkError', e, { root: true })
    }
  },
  //
  async fetchEducationWebinars ({ commit, dispatch, rootState, rootGetters }, { type = null, page = 1 }) {
    const { token, _lang } = rootGetters['dictionaries/getters/handler/getParams'].params

    try {
      const { data } = await this.$axios.get('v3/education/webinars', { params: { token, _lang, type, page } })

      if (data.status === 'success') {
        if (page === 1) {
          await commit('education/mutations/handler/SAVE_EDUCATION_WEBINARS', { rootData: rootState.education.state.handler, data }, { root: true })
        } else {
          await commit('education/mutations/handler/UPDATE_EDUCATION_WEBINARS', { rootData: rootState.education.state.handler, data: data.archive }, { root: true })
        }
      }
    } catch (e) {
      dispatch('dictionaries/actions/auth/checkError', e, { root: true })
    }
  },
  //
  async fetchCurrentWebinar ({ commit, dispatch, rootState, rootGetters }, id) {
    const { token, _lang } = rootGetters['dictionaries/getters/handler/getParams'].params

    try {
      const { data } = await this.$axios.get('v3/education/webinar-view', { params: { token, _lang, id } })

      if (data.status === 'success') {
        await commit('education/mutations/handler/SAVE_CURRENT_WEBINAR', { rootData: rootState.education.state.handler, data }, { root: true })
      }
    } catch (e) {
      dispatch('dictionaries/actions/auth/checkError', e, { root: true })
    }
  },
  //
  async fetchWebinarRegistration ({ commit, dispatch, rootState, rootGetters }, id) {
    const { token, _lang } = rootGetters['dictionaries/getters/handler/getParams'].params

    try {
      const { data } = await this.$axios.get('v3/education/webinar-registration', { params: { token, _lang, id } })

      if (data.status === 'success') {
        await commit('education/mutations/handler/SAVE_WEBINAR_REGISTRATION_DATA', { rootData: rootState.education.state.handler, data: { ...data, id } }, { root: true })
      }
    } catch (e) {
      dispatch('dictionaries/actions/auth/checkError', e, { root: true })
    }
  },
  async registerCurrentWebinar ({ commit, dispatch, rootState, rootGetters }, id) {
    const { token, _lang } = rootGetters['dictionaries/getters/handler/getParams'].params
    dispatch('dictionaries/actions/handler/togglePreloader', true, { root: true })

    try {
      const { data } = await this.$axios.post('v3/education/webinar-registration', {}, { params: { token, _lang, id } })

      if (data.status === 'success') {
        dispatch('dictionaries/actions/handler/openSuccessToast', { description: 'Вы успешно зарегистрированы' }, { root: true })
        dispatch('dictionaries/actions/handler/togglePreloader', false, { root: true })
        commit('dictionaries/mutations/handler/TOGGLE_POPUP', { rootData: rootState.dictionaries.state.handler, data: false }, { root: true })
      }
    } catch (e) {
      dispatch('dictionaries/actions/auth/checkError', e, { root: true })
      dispatch('dictionaries/actions/handler/togglePreloader', false, { root: true })
      commit('dictionaries/mutations/handler/TOGGLE_POPUP', { rootData: rootState.dictionaries.state.handler, data: false }, { root: true })
    }
  }
}
