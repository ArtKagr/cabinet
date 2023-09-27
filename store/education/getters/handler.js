export const getters = {
  // Глоссарий
  getGlossary: (state, getters, rootState) => JSON.parse(JSON.stringify(rootState.education.state.handler.glossary)),
  // Активный пункт меню глоссария
  getActiveGlossaryMenuPoint: (state, getters, rootState) => JSON.parse(JSON.stringify(rootState.education.state.handler.activeGlossaryMenuPoint)),
  // Список FAQ
  getFaq: (state, getters, rootState) => JSON.parse(JSON.stringify(rootState.education.state.handler.faq)),
  // Активный таб FAQ
  getActiveEducationFaqTab: (state, getters, rootState) => JSON.parse(JSON.stringify(rootState.education.state.handler.activeEducationFaqTab)),
  //
  getEducationData: (state, getters, rootState) => JSON.parse(JSON.stringify(rootState.education.state.handler.educationData)),
  //
  getCurrentLesson: (state, getters, rootState) => JSON.parse(JSON.stringify(rootState.education.state.handler.currentLesson)),
  //
  getEducationWebinars: (state, getters, rootState) => JSON.parse(JSON.stringify(rootState.education.state.handler.educationWebinars)),
  //
  getCurrentWebinar: (state, getters, rootState) => JSON.parse(JSON.stringify(rootState.education.state.handler.currentWebinar)),
  //
  getWebinarsArchive: (state, getters, rootState) => JSON.parse(JSON.stringify(rootState.education.state.handler.webinarsArchive)),
  //
  getWebinarRegistration: (state, getters, rootState) => JSON.parse(JSON.stringify(rootState.education.state.handler.webinarRegistration))
}
