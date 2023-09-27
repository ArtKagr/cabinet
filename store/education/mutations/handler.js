export const mutations = {
  // Сохранение глоссария
  SAVE_EDUCATION_GLOSSARY (state, payload) {
    const glossary = payload.data
    delete glossary.status
    payload.rootData.glossary = Object.assign(JSON.parse(JSON.stringify(payload.rootData.glossary)), glossary)
  },
  // Обновление активный пункт меню глоссария
  UPDATE_ACTIVE_EDUCATION_GLOSSARY_MENU_POINT (state, payload) {
    payload.rootData.activeGlossaryMenuPoint = payload.data
  },
  // Сохранение списка FAQ
  SAVE_EDUCATION_FAQ (state, payload) {
    const faq = payload.data
    delete faq.status
    payload.rootData.faq = Object.assign(JSON.parse(JSON.stringify(payload.rootData.faq)), faq)
  },
  // Обновление активного таба списка FAQ
  UPDATE_ACTIVE_EDUCATION_FAQ_TAB (state, payload) {
    payload.rootData.activeEducationFaqTab = payload.data
  },
  //
  SAVE_EDUCATION (state, payload) {
    payload.rootData.educationData = payload.data.map((item, index) => {
      item = item.map((element, id) => element.title ? { ...element, id: Number(`${id}${index}`) } : element)
      return item
    })
  },
  //
  SAVE_CURRENT_LESSON (state, payload) {
    payload.rootData.currentLesson = payload.data
  },
  //
  SAVE_EDUCATION_WEBINARS (state, payload) {
    payload.rootData.educationWebinars = payload.data
    payload.rootData.webinarsArchive = payload.data.archive
  },
  //
  UPDATE_EDUCATION_WEBINARS (state, payload) {
    payload.rootData.webinarsArchive = [...payload.rootData.webinarsArchive, ...payload.data]
  },
  //
  SAVE_CURRENT_WEBINAR (state, payload) {
    payload.rootData.currentWebinar = payload.data
  },
  //
  SAVE_WEBINAR_REGISTRATION_DATA (state, payload) {
    payload.rootData.webinarRegistration = payload.data
  }
}
